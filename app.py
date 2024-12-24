from flask import Flask, render_template, request, send_from_directory, jsonify
import os
from scripts.DotToDot import makeDotToDot, makeMaxSizeDot

app = Flask(__name__)#, template_folder= '.')

MAX_DOTS_IN_IMAGE = 800

UPLOAD_FOLDER = 'static/uploads'
PROCESSED_FOLDER = 'static/processed'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if not file.content_type.startswith('image/'):
        return jsonify({'error': 'Invalid file type'}), 400

    input_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(input_path)

    output_folder = app.config['PROCESSED_FOLDER']
    jpg_path = os.path.join(output_folder, 'dots.jpg')
    # pdf_path = os.path.join(output_folder, 'dots.pdf')

    makeMaxSizeDot(input_path, MAX_DOTS_IN_IMAGE, output_folder)
    print(f"Files in Processed Folder: {os.listdir(app.config['PROCESSED_FOLDER'])}")

    return jsonify({'output_url': f'/{jpg_path}'})

if __name__ == '__main__':
    app.run(debug=True)
