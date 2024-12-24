// Gérer la sélection du fichier
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage');
    const processButton = document.getElementById('processButton');
    const imagePreview = document.getElementById('imagePreview');
  
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          previewImage.src = e.target.result; // Charger l'image dans <img>
          previewImage.style.display = 'block'; // Afficher l'image
          processButton.style.display = 'block'; // Afficher le bouton
          imagePreview.querySelector('p').style.display = 'none'; // Cacher le texte "No image selected"
        };
  
        reader.readAsDataURL(file); // Lire le fichier
      } else {
        alert('Please upload a valid image file.');
      }
    }
  });
  
  // Action sur le bouton pour traiter l'image
  document.getElementById('processButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select an image first!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('/process', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

              // Simuler la progression pour l'affichage
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          progressBar.style.width = `${progress}%`;
        } else {
          clearInterval(interval);
        }
      }, 300); // Mise à jour toutes les 300ms


        return response.json();
      })
      .then((data) => {
        if (data.output_url) {
          const resultDiv = document.getElementById('result');
          const timestamp = new Date().getTime(); // Pour éviter le cache
          resultDiv.innerHTML = `
          <img src="${data.output_url}?t=${timestamp}" alt="Processed Image" style="max-width: 100%; margin-bottom: 10px;">
          <div class="download-container" style="margin-top: 10px;">
            <select id="formatSelect" style="padding: 5px; font-size: 16px;">
              <option value="jpg">JPG</option>
              <option value="pdf">PDF</option>
            </select>
            <button id="downloadButton" class="custom-button">Download</button>
          </div>
        `;

    // Ajouter un événement au bouton Download
    document.getElementById('downloadButton').addEventListener('click', () => {
        const selectedFormat = document.getElementById('formatSelect').value;
        const downloadUrl = data.output_url.replace(/\.\w+$/, `.${selectedFormat}`); // Remplace l'extension
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `dots.${selectedFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

        } else {
          alert('Processing failed. No output URL received.');
        }
      })

      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while processing the image.');
      });
  });
  