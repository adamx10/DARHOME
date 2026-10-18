const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/listingController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Instanciation de la classe ListingController
const listingController = new ListingController();

// 1. Route pour récupérer toutes les annonces immobilières
// Méthode : GET /
// Accessible publiquement par tous les utilisateurs
router.get('/', (req, res) => listingController.getAllListings(req, res));

// 2. Route pour récupérer une seule annonce par son identifiant (ID)
// Méthode : GET /:id
// Accessible publiquement par tous les utilisateurs
router.get('/:id', (req, res) => listingController.getListingById(req, res));

// 3. Route pour créer une nouvelle annonce immobilière
// Méthode : POST /
// Route protégée : nécessite un token valide et le rôle 'propriétaire' ou 'admin'
router.post(
  '/',
  verifyToken,
  checkRole(['propriétaire', 'admin']),
  (req, res) => listingController.createListing(req, res)
);

// Exportation du routeur pour l'utiliser dans server.js
module.exports = router;

