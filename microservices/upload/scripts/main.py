import base64
import json
import firebase_admin
import vertexai
from vertexai.vision_models import Image, MultiModalEmbeddingModel
import firebase_admin
from firebase_admin import credentials, firestore
from concurrent.futures import ThreadPoolExecutor, as_completed
import numpy as np
from PIL import Image as PILImage
import matplotlib.pyplot as plt
import os

class ImageSimilarityFinder:
    def __init__(self, firebase_key_path, firestore_collection, model_name="multimodalembedding"):
        self.firebase_key_path = firebase_key_path
        self.firestore_collection = firestore_collection
        self.model = MultiModalEmbeddingModel.from_pretrained(model_name)
        vertexai.init(project="identifeye-a62dc", location="us-central1")
        self.db = self._initialize_firebase()

    def _initialize_firebase(self):
        """Initialize Firebase app and return Firestore client."""
        if not firebase_admin._apps:
            cred = credentials.Certificate(self.firebase_key_path)
            firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        return firestore.client()

    def load_image_embedding(self, image_path):
        """Load image and compute its embedding."""
        input_image = Image.load_from_file(image_path)
        return self.model.get_embeddings(image=input_image, dimension=128).image_embedding

    def fetch_embeddings_from_firestore(self):
        """Fetch all embeddings from Firestore."""
        docs = self.db.collection(self.firestore_collection).stream()
        stored_embeddings = {}
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(self._fetch_embedding, doc) for doc in docs]
            for future in as_completed(futures):
                doc_id, embedding = future.result()
                if embedding is not None:
                    stored_embeddings[doc_id] = embedding
        return stored_embeddings

    def _fetch_embedding(self, doc):
        """Fetch a single embedding from a Firestore document."""
        try:
            data = doc.to_dict()
            return doc.id, data['embedding']
        except Exception:
            return doc.id, None

    def compute_similarities(self, input_embedding, stored_embeddings):
        """Compute similarities between input embedding and stored embeddings."""
        similarities = {}
        with ThreadPoolExecutor(max_workers=30) as executor:
            futures = [
                executor.submit(self._compute_similarity, name, emb, input_embedding)
                for name, emb in stored_embeddings.items()
            ]
            for future in as_completed(futures):
                name, distance = future.result()
                if distance is not None:
                    similarities[name] = distance
        return sorted(similarities.items(), key=lambda x: x[1])

    def _compute_similarity(self, image_name, stored_embedding, input_embedding):
        """Compute Euclidean distance between two embeddings."""
        try:
            return image_name, np.linalg.norm(np.array(input_embedding) - np.array(stored_embedding))
        except Exception:
            return image_name, None

    def find_matching_images(self, folder, image_id):
        """Find all images with a matching ID in the folder."""
        return [f for f in os.listdir(folder) if f.startswith(f"{image_id}_")]

    def encode_image_to_base64(self, image_path):
        """Encode an image to a base64 string."""
        with open(image_path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode('utf-8')

    def prepare_images_json(self, folder, images):
        """Prepare a JSON-friendly structure with base64-encoded images."""
        result = []
        for image_name in images:
            img_path = os.path.join(folder, image_name)
            img_data = self.encode_image_to_base64(img_path)
            result.append({
                "name": image_name,
                "data": img_data
            })
        return json.dumps(result)

    def find_and_prepare_similar_images(self, input_image_path, folder):
        """Find similar images and prepare them for the front-end."""
        input_embedding = self.load_image_embedding(input_image_path)
        stored_embeddings = self.fetch_embeddings_from_firestore()
        sorted_similarities = self.compute_similarities(input_embedding, stored_embeddings)

        if not sorted_similarities:
            return json.dumps([])

        image_name, _ = sorted_similarities[0]
        psku = image_name.split("_")[0]
        matching_images = self.find_matching_images(folder, psku)

        if matching_images:
            return self.prepare_images_json(folder, matching_images)

        return json.dumps([])
    
# finder = ImageSimilarityFinder(
#         firebase_key_path='../secret/serviceAccountKey.json',
#         firestore_collection='embeddings'
#     )

# matching_images = finder.find_and_prepare_similar_images(
#         input_image_path=str("./prueba.jpeg"),
#         folder='../secret/imagenes'
#     )