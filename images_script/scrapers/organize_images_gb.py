import os
import shutil

# Chemin du dossier contenant les images
source_dir = r"C:\Users\nicol\OneDrive\Bureau\M1 COURS\SEMESTRE 1\Hackaton\project\images\goodbarber\webp"
# Chemin du dossier cible où les sous-dossiers seront créés
target_dir = r"C:\Users\nicol\OneDrive\Bureau\M1 COURS\SEMESTRE 1\Hackaton\project\images\goodbarber"

# Créer le dossier cible s'il n'existe pas
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

def organize_images():
    # Parcourir tous les fichiers dans le dossier source
    for filename in os.listdir(source_dir):
        # Vérifier si c'est un fichier
        if os.path.isfile(os.path.join(source_dir, filename)):
            # Extraire la catégorie du début du nom du fichier (avant le premier '_')
            category = filename.split('_')[0]

            # Créer un sous-dossier pour la catégorie s'il n'existe pas
            category_dir = os.path.join(target_dir, category)
            if not os.path.exists(category_dir):
                os.makedirs(category_dir)

            # Déplacer le fichier dans le sous-dossier approprié
            source_path = os.path.join(source_dir, filename)
            target_path = os.path.join(category_dir, filename)
            shutil.move(source_path, target_path)
            print(f"Déplacé : {filename} -> {category}")

if __name__ == "__main__":
    organize_images()
    print("Organisation terminée.")
