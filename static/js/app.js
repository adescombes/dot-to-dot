document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage');
    const imagePreview = document.getElementById('imagePreview');
    const processButton = document.getElementById('processButton');
  
    if (file) {
      // Vérifiez que le fichier est une image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          previewImage.src = e.target.result; // Charger l'image dans <img>
          previewImage.style.display = 'block'; // Afficher l'image
          processButton.style.display = 'block'; // Afficher le bouton
          imagePreview.querySelector('p').style.display = 'none'; // Cacher le texte "No image selected"
        };
  
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file.');
      }
    }
  });
  
  // Action sur le bouton pour lancer le script Python
  document.getElementById('processButton').addEventListener('click', () => {
    fetch('/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Process the image' }), // Vous pouvez envoyer plus de données ici
    })
      .then((response) => response.json())
      .then((data) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<img src="${data.output_url}" alt="Processed Image" style="max-width: 100%;">`;
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  