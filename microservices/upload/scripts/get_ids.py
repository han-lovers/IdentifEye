import openai
import base64
import json
import requests
import tempfile
import vertexai
import os
import firebase_admin
from firebase_admin import credentials, firestore
from concurrent.futures import ThreadPoolExecutor, as_completed
from vertexai.vision_models import Image as VertexImage, MultiModalEmbeddingModel
import numpy as np

class ImageAnalyzer:
    def __init__(self, api_key, google_api, search_engine, input_image_path):
        self.input_image_path = input_image_path
        self.api_key = api_key
        self.google_api=google_api
        self.search_engine =search_engine
        self.firebase_credentials_path = '../secret/serviceAccountKey.json'
        self.client = openai.OpenAI(api_key=self.api_key)
        self.stored_embeddings = {}
        vertexai.init(project="identifeye-a62dc", location="us-central1")

        # Initialize Firebase
        if not firebase_admin._apps:
            cred = credentials.Certificate(self.firebase_credentials_path)
            firebase_admin.initialize_app(cred)

        self.db = firestore.client()

    def get_fashion_advice(self):
        messages = [
            {"role": "system", "content": "You are a helpful AI assistant that is dedicated to giving Fashion or Device Advice to the user."},
            {
                "role": "user",
                "content": "Give me recommendations on how to combine the given product in the Image URL from a catalog in an e-commerce app. Provide a product that would combine with it. Give me only one option to choose and write it as a prompt in google search. Only write in the prompt the product that you are searching for. Only Give the prompt"
            },
            {
                "role": "user",
                "content": f"![image]({self.input_image_path})"
            }
        ]

        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7
        )

        answer = response.choices[0].message.content.strip()
        return answer

    def search_image(self, search_query):
        url = 'https://www.googleapis.com/customsearch/v1'
        params = {
            'q': search_query,
            'key': self.google_api,
            'cx': self.search_engine,
            'searchType': 'image',
        }
        response = requests.get(url, params=params)
        results = response.json()

        if 'items' in results and len(results['items']) > 0:
            return results['items'][0]['link']
        else:
            return None

    def download_image(self, image_url):
        response = requests.get(image_url)
        if response.status_code == 200:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp_file:
                tmp_file.write(response.content)
                return tmp_file.name
        else:
            return None

    def get_image_embedding(self, image_path):

        input_image = VertexImage.load_from_file(image_path)
        model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding")
        
        input_embedding = model.get_embeddings(image=input_image, dimension=128).image_embedding
        return input_embedding

    def fetch_embeddings(self):
        docs = list(self.db.collection('embeddings').stream())
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(self.fetch_embedding, doc) for doc in docs]
            for future in as_completed(futures):
                doc_id, embedding = future.result()
                if embedding is not None:
                    self.stored_embeddings[doc_id] = embedding

    def fetch_embedding(self, doc):
        try:
            data = doc.to_dict()
            return doc.id, data['embedding']
        except Exception as e:
            return doc.id, None

    def calculate_similarities(self, input_embedding):
        similarities = {}
        for image_name, stored_embedding in self.stored_embeddings.items():
            distance = self.euclidean_distance(input_embedding, stored_embedding)
            similarities[image_name] = distance
        return sorted(similarities.items(), key=lambda x: x[1])

    @staticmethod
    def euclidean_distance(embedding1, embedding2):
        return np.linalg.norm(np.array(embedding1) - np.array(embedding2))

    def find_images_with_id(self, folder, image_id):
        return [
            filename for filename in os.listdir(folder)
            if filename.startswith(f"{image_id}_")
        ]

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

    def analyze(self, folder):
        search_query = self.get_fashion_advice()
        first_image_url = self.search_image(search_query)
        if first_image_url:
            temp_image_path = self.download_image(first_image_url)
            if temp_image_path:
                input_embedding = self.get_image_embedding(temp_image_path)
                self.fetch_embeddings()
                sorted_similarities = self.calculate_similarities(input_embedding)
                

                # Example usage
                #folder = "../secret/imagenes"  # Replace with your folder path
                image_name, _ = sorted_similarities[0]
                image_id = image_name.split("_")[0]

                matching_images = self.find_images_with_id(folder, image_id)

                if matching_images:
                    return self.prepare_images_json(folder, matching_images)


# input_image_path="./scripts/dummy.jpg"

# # Example usage:
# analyzer = ImageAnalyzer(input_image_path)
# print(analyzer.analyze())