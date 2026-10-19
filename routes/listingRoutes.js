    const express = require('express');
    const router = express.Router();
    const ListingController = require('../controllers/listingController');
    const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
    const upload = require('../middlewares/uploadMiddleware');

    // Instanciation de la classe ListingController
    const listingController = new ListingController();

    // Middleware d'authentification pour vérifier le token et le rôle (propriétaire ou admin)
    const authMiddleware = [verifyToken, checkRole(['proprietaire', 'admin'])];

    // 1. Route pour récupérer toutes les annonces immobilières
    // Méthode : GET /api/listings
    // Accessible publiquement par tout le monde
    router.get('/', (req, res) => listingController.getAllListings(req, res));

    // 2. Route pour récupérer une seule annonce par son identifiant (ID)
    // Méthode : GET /api/listings/:id
    // Accessible publiquement par tout le monde
    router.get('/:id', (req, res) => listingController.getListingById(req, res));

    // 3. Route pour créer une nouvelle annonce immobilière avec upload d'images (jusqu'à 5 photos)
    // Méthode : POST /api/listings
    router.post(
      '/',
      authMiddleware,
      upload.array('photos', 5),
      (req, res) => listingController.createListing(req, res)
    );

    // Exportation du routeur pour l'utiliser dans server.js
    module.exports = router;
