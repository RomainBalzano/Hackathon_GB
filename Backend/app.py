from flask import Flask, request, jsonify
from api.routes import api_bp  # Blueprint des routes API
from flask_cors import CORS
#from flask_mysqldb import MySQL
import os

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello():
    return "Bonjour, Flask !"


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


# Configuration (Clés API, chemins, etc.)
app.config.from_object("config")

# Enregistrer le blueprint
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)
