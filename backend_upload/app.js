const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../mock/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const data = {
    "file": req.file,
    "body": req.body,
    "message": "Archivo subido exitosamente",
    "status": "success"
  };

  res.send(data);
});

app.get('/listFiles', (req, res) => {
  // Lee el contenido de la carpeta "../mock"
  fs.readdir('../mock', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al listar archivos', status: 'error' });
    } else {
      // Envia la lista de nombres de archivos como respuesta
      res.json({ files, message: 'Lista de archivos en la carpeta ../mock', status: 'success' });
    }
  });
});

app.listen(5001, () => {
  console.log('Servidor corriendo en http://localhost:5001');
});