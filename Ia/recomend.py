import sqlite3
import random
from collections import defaultdict

def find_similar_images(database_path):
    # Connexion à la base de données
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    # Charger toutes les images de image_mobbin
    cursor.execute("SELECT * FROM image_mobbin")
    mobbin_images = cursor.fetchall()

    # Sélectionner aléatoirement 5 images de mobbin
    mobbin_sample = random.sample(mobbin_images, 5)

    # Charger toutes les images de image_gb
    cursor.execute("SELECT * FROM image_gb")
    gb_images = cursor.fetchall()

    # Fonction pour calculer la similarité
    def calculate_similarity(mobbin_image, gb_image):
        score = 0

        # Importance de la couleur de l'arrière-plan
        if mobbin_image[5] != "white":
            if mobbin_image[5] == gb_image[5]:
                score += 3  # Bonus pour arrière-plan identique

        # Importance de la couleur de la barre
        if mobbin_image[6] == gb_image[6]:
            score += 2  # Bonus pour couleur de barre identique

        # Importance du type de barre
        if mobbin_image[4] == gb_image[4]:
            if mobbin_image[4] == "side":
                score += 3  # Plus de poids pour les barres latérales
            else:
                score += 1  # Moins de poids pour les barres en bas

        return score

    # Agréger les similarités pour toutes les images de mobbin
    overall_scores = defaultdict(int)
    for mobbin_image in mobbin_sample:
        for gb_image in gb_images:
            similarity = calculate_similarity(mobbin_image, gb_image)
            overall_scores[gb_image] += similarity

    # Trier les images GB par score total
    sorted_gb_images = sorted(overall_scores.items(), key=lambda x: x[1], reverse=True)

    # Prendre les 3 meilleures images
    top_3_gb_images = sorted_gb_images[:3]

    # Fermer la connexion
    conn.close()

    # Retourner les 5 images Mobbin sélectionnées et les 3 meilleures images GB
    return mobbin_sample, top_3_gb_images

# Charger et exécuter
mobbin_sample, results = find_similar_images(r"C:\Users\Ulwar\Desktop\Hackathon_GB\Ia\gb_bdd.db")

# Afficher les Mobbin images sélectionnées
print("Selected Mobbin Images:")
for mobbin_image in mobbin_sample:
    print(mobbin_image)

# Afficher les résultats
print("\nTop 3 GB Images:")
for gb_image, score in results:
    print(f"GB Image: {gb_image}, Total Score: {score}")
