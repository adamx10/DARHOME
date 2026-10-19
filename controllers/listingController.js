const Listing = require('../models/Listing');

// Contrôleur gérant les opérations sur les annonces immobilières (CRUD)
class ListingController {

  // Méthode pour récupérer toutes les annonces immobilières
  async getAllListings(req, res) {
    try {
      // 1. Récupérer l'ensemble des annonces stockées dans la base de données
      const listings = await Listing.findAll();

      // 2. Renvoyer la liste des annonces au format JSON avec un code 200 (Succès)
      return res.status(200).json(listings);

    } catch (error) {
      // Gestion des erreurs serveur
      return res.status(500).json({
        message: "Erreur lors de la récupération des annonces.",
        error: error.message
      });
    }
  }

  // Méthode pour récupérer une seule annonce grâce à son identifiant (ID)
  async getListingById(req, res) {
    try {
      // 1. Extraire l'identifiant (ID) passé dans les paramètres de l'URL (ex: /listings/:id)
      const { id } = req.params;

      // 2. Chercher l'annonce correspondante par sa clé primaire (ID)
      const listing = await Listing.findByPk(id);

      // 3. Vérifier si l'annonce existe dans la base de données
      if (!listing) {
        return res.status(404).json({
          message: "Annonce introuvable."
        });
      }

      // 4. Renvoyer l'annonce trouvée avec un code 200 (Succès)
      return res.status(200).json(listing);

    } catch (error) {
      // Gestion des erreurs serveur
      return res.status(500).json({
        message: "Erreur lors de la récupération de l'annonce.",
        error: error.message
      });
    }
  }

  // Méthode pour créer une nouvelle annonce immobilière
  async createListing(req, res) {
    try {
      // 1. Extraire les informations du bien envoyées dans le corps de la requête
      const {
        titre,
        description,
        typeBien,
        ville,
        quartier,
        prix,
        statut,
        disponibilite
      } = req.body;

      // 2. Insérer la nouvelle annonce dans la base de données
      const newListing = await Listing.create({
        titre,
        description,
        typeBien,
        ville,
        quartier,
        prix,
        statut: statut || 'en_attente', // Statut par défaut si non précisé
        disponibilite: disponibilite !== undefined ? disponibilite : true // Disponible par défaut
      });

      // 3. Renvoyer l'annonce créée avec un code 201 (Créé)
      return res.status(201).json({
        message: "Annonce créée avec succès !",
        listing: newListing
      });

    } catch (error) {
      // Gestion des erreurs serveur
      return res.status(500).json({
        message: "Erreur lors de la création de l'annonce.",
        error: error.message
      });
    }
  }

}

// Exportation de la classe ListingController
module.exports = ListingController;

