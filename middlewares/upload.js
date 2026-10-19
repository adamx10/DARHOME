const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Créer le dossier 'uploads' s'il n'existe pas encore
// C'est ici qu'on va sauvegarder toutes les images des annonces
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 2. Configurer l'endroit où on sauvegarde les images et leur nom
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dire à multer de placer les images dans le dossier 'uploads'
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    // Donner un nom unique à l'image pour éviter d'écraser une autre image
    // Exemple de résultat : 1697721234-image.png
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// 3. Filtre de sécurité : n'accepter que les fichiers images
const fileFilter = (req, file, cb) => {
  // Liste des formats d'images autorisés
  const allowedTypes = /jpeg|jpg|png|webp/;
  
  // Vérifier si le fichier a la bonne extension (.jpg, .png...)
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true); // Accepter le fichier
  } else {
    cb(new Error("Seules les images (jpeg, jpg, png, webp) sont autorisées !")); // Refuser le fichier
  }
};

// 4. Créer l'outil d'upload prêt à l'emploi
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de taille : 5 Mégaoctets (5 MB) maximum par image
});

// Exporter l'outil pour l'utiliser dans nos routes
module.exports = upload;