const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configura multer para guardar los archivos subidos en la carpeta 'mock' con su nombre original
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../mock/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // req.file contiene información sobre el archivo subido
  console.log(req.file);

  res.send('Archivo subido y guardado en la carpeta "mock".');
});

app.listen(5001, () => {
  console.log('Servidor corriendo en http://localhost:5001');
});
