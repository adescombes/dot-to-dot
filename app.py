from flask import Flask, render_template, request, send_from_directory, jsonify
import os
from scripts.Main import * 
from scripts.DotToDot import makeDotToDot, makeMaxSizeDot
from process_image import process_image

app = Flask(__name__)#, template_folder= '.')

MAX_DOTS_IN_IMAGE = 800

# Dossiers pour les images
UPLOAD_FOLDER = 'static/uploads'
PROCESSED_FOLDER = 'processed'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

# Assurez-vous que les dossiers existent
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    # Exécuter le traitement d'image ici
    input_path = 'static/uploads/temp_img.jpg'  # Chemin d'entrée
    output_path = 'static/processed/dots.jpg'  # Chemin de sortie
    process_image(input_path, output_path)
    return jsonify({'message': 'Image processed successfully!', 'output_url': f'/{output_path}'})

if __name__ == '__main__':
    app.run(debug=True)


    