from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from collections import defaultdict
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

def find_similar_images(database_path, mobbin_names):
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    # Fetch matching mobbin images
    cursor.execute(
        "SELECT * FROM image_mobbin WHERE nom IN ({})".format(",".join(["?" for _ in mobbin_names])),
        mobbin_names
    )
    mobbin_images = cursor.fetchall()

    if len(mobbin_images) < 3:
        return [], "Insufficient mobbin images found for the provided names."

    # Fetch all GB images
    cursor.execute("SELECT * FROM image_gb")
    gb_images = cursor.fetchall()

    def calculate_similarity(mobbin_image, gb_image):
        score = 0
        if mobbin_image[5] != "white":
            if mobbin_image[5] == gb_image[5]:
                score += 3
        if mobbin_image[6] == gb_image[6]:
            score += 2
        if mobbin_image[4] == gb_image[4]:
            if mobbin_image[4] == "side":
                score += 3
                if mobbin_image[2] == gb_image[2]:
                    score += 1
            else:
                score += 1
                if mobbin_image[2] == gb_image[2]:
                    score += 2
        return score

    overall_scores = defaultdict(int)
    for mobbin_image in mobbin_images:
        for gb_image in gb_images:
            similarity = calculate_similarity(mobbin_image, gb_image)
            overall_scores[gb_image] += similarity

    sorted_gb_images = sorted(overall_scores.items(), key=lambda x: x[1], reverse=True)
    top_3_gb_images = sorted_gb_images[:1]

    conn.close()

    return [f"GB_save/{gb_image[0][1]}" for gb_image in top_3_gb_images], None

@app.route('/find_similar', methods=['POST'])
def find_similar_endpoint():
    data = request.json
    mobbin_names = data.get('mobbin_names', [])

    if not (3 <= len(mobbin_names) <= 5):
        return jsonify({"error": "You must provide between 3 and 5 mobbin image names."}), 400

    database_path = r"C:\\Users\\ulwar\\Desktop\\hac\\Hackathon_GB\\Ia\\gb_bdd.db"
    gb_images, error = find_similar_images(database_path, mobbin_names)

    if error:
        return jsonify({"error": error}), 400

    return jsonify({"gb_images": gb_images})

@app.route('/get-paths', methods=['POST'])
def get_paths():
    data = request.get_json(force=True)
    paths = data.get('paths', [])
    return jsonify({'paths': paths}), 200

@app.route('/Image', methods=['POST'])
def receive_paths():
    try:
        data = request.get_json(force=True)
        if not data or 'paths' not in data:
            return jsonify({"error": "Invalid input, 'paths' key is required"}), 400
        return jsonify({"data": data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
