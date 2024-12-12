import base64
from openai import OpenAI

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
image_path = r"C:\Users\ulwar\Desktop\webp\booking_231_floatingtabbar_withmenu@2x.webp"

# Encodage de l'image en Base64
base64_image = image_to_base64(image_path)

if base64_image:
    # Préparation de l'URL au format data URI
    image_data_url = f"data:image/webp;base64,{base64_image}"

    # Préparer le prompt
    prompt = (
        "You are an agent specialized in tagging images of app design components, user interface elements, "
        "or design layouts with relevant keywords that could be used to search for these items on a marketplace "
        "or design platform. You will be provided with an image and the title of the design element or component "
        "depicted in the image, and your goal is to extract keywords for only the element specified. "
        "Keywords should be concise, relevant to app design, and in lowercase. "
        "Type : "
        "Design trend e.g., 'minimalist', 'modern', 'retro', 'material design'. "
        "Dominant interface colors e.g., 'blue', 'white', 'dark mode', 'pastel'. "
        "Navigation element positioning e.g., 'top bar','side bar','bottom bar', 'top navigation','side navigation''bottom navigation', 'hamburger menu', 'side drawer'.\n\n"
        "Keywords should be concise, relevant to app design, and in lowercase."
    )

    # Appel à l'API OpenAI
    client = OpenAI(api_key="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")  # Remplacez par votre clé API valide
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
        max_tokens=30,
    )

    # Gérer la réponse
    if "error" in response:
        print(response["error"])
    else:
        print(response.choices[0])
else:
    print("Impossible de convertir l'image en Base64.")
