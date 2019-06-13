import QrScanner from "../js/qr-scanner.min.js";
  QrScanner.WORKER_PATH = '../js/qr-scanner-worker.min.js';

  const video = document.getElementById('qr-video');
  const Scanres = document.querySelector('#result');
  const fileSelector = document.getElementById('file-selector');

  function setResult(label, result) {
      console.log(result);
      label.textContent = result;
      label.style.color = 'teal';
      clearTimeout(label.highlightTimeout);
      label.highlightTimeout = setTimeout(() => label.style.color = 'inherit', 100);
  }


  
  fileSelector.addEventListener('change', event => {
        const file = fileSelector.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file)
            .then(result => setResult(Scanres, result))
            .catch(e => setResult(Scanres, e || 'No QR code found.'));
    });