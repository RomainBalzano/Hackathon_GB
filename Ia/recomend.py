import sqlite3
import random
from collections import defaultdict

def find_similar_images(database_path):
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

   
    cursor.execute("SELECT * FROM image_mobbin")
    mobbin_images = cursor.fetchall()

   
    mobbin_sample = random.sample(mobbin_images, 5)

 
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
    for mobbin_image in mobbin_sample:
        for gb_image in gb_images:
            similarity = calculate_similarity(mobbin_image, gb_image)
            overall_scores[gb_image] += similarity

   
    sorted_gb_images = sorted(overall_scores.items(), key=lambda x: x[1], reverse=True)

    
    top_3_gb_images = sorted_gb_images[:3]

   
    conn.close()

    return mobbin_sample, top_3_gb_images

mobbin_sample, results = find_similar_images(r"C:\Users\ulwar\Desktop\hac\Hackathon_GB\Ia\gb_bdd.db")

print("Selected Mobbin Images:")
for mobbin_image in mobbin_sample:
    print(mobbin_image)


print("\nTop 3 GB Images:")
for gb_image, score in results:
    print(f"GB Image: {gb_image}, Total Score: {score}")
