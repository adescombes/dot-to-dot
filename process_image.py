from PIL import Image

def process_image(input_path, output_path = 'static/processed/dots.jpg'):
    image = Image.open(input_path)
    # Exemple : retourner l'image horizontalement
    processed_image = image.transpose(Image.FLIP_LEFT_RIGHT)
    processed_image.save(output_path)
