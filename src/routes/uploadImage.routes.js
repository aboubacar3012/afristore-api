const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify');
const express = require("express");
const router = express.Router();

// Configuration de Multer pour gérer les téléchargements d'images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// Endpoint pour gérer l'upload d'image
router.post('/', upload.single('file'), (req, res) => {
  if(!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // si c'est pas une image on renvoie une erreur
  if (!req.file.mimetype.startsWith('image')) {
    return res.status(400).json({ error: 'Please upload an image file' });
  }
  const file = req.file.buffer; // Données de l'image
  const restaurantSlug = req.query.store; // Remplacez par le slug de votre restaurant
  const timestamp = Date.now().toString(); // Timestamp actuel

  // @ts-ignore
  const folderName = slugify(restaurantSlug) // Création du nom du dossier
  const fileName = `image_${timestamp}`; // Nom du fichier

  // Envoi de l'image à Cloudinary
  cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folderName, public_id: fileName }, (error, result) => {
    if (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Upload failed' });
    } else {
      if(!result) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      console.log('Uploaded to Cloudinary:', result.url);
      res.status(200).json({ imageUrl: result.url });
    }
  }).end(file);
});


module.exports = router;