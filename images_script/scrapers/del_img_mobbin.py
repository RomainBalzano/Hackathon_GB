import os
import requests

# Chemin absolu vers le fichier contenant les URLs
FILE_PATH = r"C:\Users\nicol\OneDrive\Bureau\M1 COURS\SEMESTRE 1\Hackaton\project\scrapers\mobbin_urls.txt"

# Dossier où les images seront téléchargées
OUTPUT_DIR = r"C:\Users\nicol\OneDrive\Bureau\M1 COURS\SEMESTRE 1\Hackaton\project\images\mobbin\medical"
os.makedirs(OUTPUT_DIR, exist_ok=True)  # Crée le dossier si nécessaire

def read_urls(file_path):
    """Lit les URLs du fichier texte."""
    try:
        print(f"Chemin recherché : {os.path.abspath(file_path)}")
        with open(file_path, "r") as file:
            urls = [line.strip() for line in file if line.strip()]
        print(f"{len(urls)} URLs trouvées dans le fichier.")
        return urls
    except FileNotFoundError:
        print(f"Fichier non trouvé : {file_path}")
        return []

def download_image(url, output_dir):
    """Télécharge une image depuis une URL et l'enregistre dans le dossier spécifié."""
    try:
        filename = os.path.basename(url.split("?")[0])  # Extraire le nom du fichier
        filepath = os.path.join(output_dir, filename)
        
        if os.path.exists(filepath):
            print(f"Image déjà téléchargée : {filename}")
            return

        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(filepath, "wb") as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
            print(f"Téléchargé : {filename}")
        else:
            print(f"Erreur HTTP {response.status_code} pour : {url}")
    except Exception as e:
        print(f"Erreur lors du téléchargement de l'image {url} : {e}")

def download_images_from_file(file_path, output_dir):
    """Télécharge toutes les images listées dans un fichier texte."""
    urls = read_urls(file_path)
    if not urls:
        print("Aucune URL à traiter.")
        return

    print(f"Téléchargement des images dans : {output_dir}")
    for url in urls:
        download_image(url, output_dir)
    print("Téléchargement terminé.")

if __name__ == "__main__":
    download_images_from_file(FILE_PATH, OUTPUT_DIR)
