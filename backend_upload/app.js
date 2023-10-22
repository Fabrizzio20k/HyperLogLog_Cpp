const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require('cors');

// Configura multer para guardar los archivos subidos en la carpeta 'mock' con su nombre original

app.use(cors());

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
  const data = {
    "file": req.file,
    "body": req.body,
    "message": "Archivo subido exitosamente",
    "status": "success"
  };

  res.send(data);
});

app.listen(5001, () => {
  console.log('Servidor corriendo en http://localhost:5001');
});
