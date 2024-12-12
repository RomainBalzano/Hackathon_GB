from flask import Blueprint, request, jsonify
from .services import (get_goodbarber_templates, 
                       get_mobbin_screenshots, 
                       generate_recommendations)

api_bp = Blueprint('api', __name__)

@api_bp.route('/mobbin_library', methods=['GET'])
def mobbin_library():
    return jsonify(get_mobbin_screenshots())

@api_bp.route('/goodbarber_library', methods=['GET'])
def goodbarber_library():
    return jsonify(get_goodbarber_templates())

@api_bp.route('/user_selection', methods=['POST'])
def user_selection():
    data = request.json
    selected_ids = data.get('selected_ids', [])
    # Stocker en session ou base. Pour le POC, on peut juste calculer direct
    # par ex, renvoyer les recos de suite
    recommendations = generate_recommendations(selected_ids)
    return jsonify(recommendations)
