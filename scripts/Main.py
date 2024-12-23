import sys

from .DotToDot import makeDotToDot, makeMaxSizeDot

MAX_DOTS_IN_IMAGE = 800

def make_dots(filepath, maxDots = MAX_DOTS_IN_IMAGE):

    makeMaxSizeDot(fullFilePath, MAX_DOTS_IN_IMAGE)

from PIL import Image

def process_image(input_path, output_path):
    image = Image.open(input_path)
    # Exemple : retourner l'image horizontalement
    processed_image = image.transpose(Image.FLIP_LEFT_RIGHT)
    processed_image.save(output_path)