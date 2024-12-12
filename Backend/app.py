from flask import Flask, request, jsonify
from api.routes import api_bp  # Blueprint des routes API
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return "Bonjour, Flask !"


@app.route('/get-paths', methods=['POST'])
def get_paths():
    data = request.get_json(force=True)
    paths = data.get('paths', [])
    return jsonify({'paths': paths}), 200


# Configuration (Clés API, chemins, etc.)
app.config.from_object("config")

# Enregistrer le blueprint
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)
