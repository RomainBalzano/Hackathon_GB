import base64
from openai import OpenAI

# Lecture de la clé API à partir d'un fichier
def load_api_key(file_path):
    """
    Charge une clé API depuis un fichier texte.
    
    :param file_path: Chemin du fichier contenant la clé API
    :return: La clé API sous forme de chaîne
    """
    try:
        with open(file_path, "r") as file:
            api_key = file.read().strip()  
            return api_key
    except FileNotFoundError:
        print(f"Erreur : Le fichier '{file_path}' est introuvable.")
        return None
    except Exception as e:
        print(f"Une erreur est survenue : {e}")
        return None




# Fonction pour encoder une image en Base64
def image_to_base64(image_path):
    """
    Convertit une image en chaîne Base64.
    
    :param image_path: Chemin de l'image (format absolu ou relatif)
    :return: Chaîne encodée en Base64
    """
    try:
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode("utf-8")
    except FileNotFoundError:
        print(f"Erreur : Le fichier '{image_path}' est introuvable.")
        return None
    except Exception as e:
        print(f"Une erreur est survenue : {e}")
        return None

# Chemin vers l'image
image_path = r"C:\Users\Ulwar\Desktop\Hackathon_GB\images_script\images\mobbin_save\Brilliant Android 138.png"

# Encodage de l'image en Base64
base64_image = image_to_base64(image_path)

if base64_image:
    # Préparation de l'URL au format data URI
    image_data_url = f"data:image/webp;base64,{base64_image}"

    # Préparer le prompt
    prompt = (
        "You are an agent specialized in tagging images of app design components, user interface elements, or design layouts with relevant keywords. Your task is to focus exclusively on the types of keywords explicitly listed in the examples provided after e.g. in this prompt. You will be provided with an image and the title of the design element or component depicted in the image, and your goal is to extract only the relevant keywords as specified."
    )

    #file_path = r"C:\Users\ulwar\Desktop\hac\Hackathon_GB\Ia\apikey.txt"
    file_path = r"C:\Users\Ulwar\Desktop\Hackathon_GB\Ia\apikey.txt"
    api_key = load_api_key(file_path)

    if api_key:
        # Initialiser le client OpenAI avec la clé API
        client = OpenAI(api_key=api_key)
        print("Client OpenAI initialisé avec succès.")
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": image_data_url}},
                ],
            }
        ],
        max_tokens=300,
    )

    # Gérer la réponse
    if "error" in response:
        print(response["error"])
    else:
        print(response.choices[0])
       # Afficher les informations sur les tokens utilisés
        print(f"Tokens utilisés pour l'entrée : {response.usage.prompt_tokens}")
        print(f"Tokens utilisés pour la réponse : {response.usage.completion_tokens}")
        print(f"Tokens totaux utilisés : {response.usage.total_tokens}")

else:
    print("Impossible de convertir l'image en Base64.")
