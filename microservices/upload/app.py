import os
from flask import Flask, request, jsonify
from scripts.main import ImageSimilarityFinder

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create the uploads folder if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # Save the file to the uploads folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    finder = ImageSimilarityFinder(
        firebase_key_path='./secret/serviceAccountKey.json',
        firestore_collection='embeddings'
    )

    matching_images = finder.find_and_prepare_similar_images(
        input_image_path=str(file_path),
        folder='./secret/imagenes'
    )

    return jsonify(matching_images)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))