// 1. Importation des modèles existants
const User = require('./User');
const Listing = require('./Listing');
const Photo = require('./Photo');
const Favorite = require('./Favorite');

// 2. Fonction qui configure l'ensemble des relations entre les modèles
const setupAssociations = () => {

  // --- Relation User & Listing (1:N) ---
  // Un utilisateur (propriétaire) peut publier plusieurs annonces immobilières
  User.hasMany(Listing, {
    foreignKey: 'userId',
    onDelete: 'CASCADE' // Si un utilisateur est supprimé, ses annonces le sont aussi
  });
  // Chaque annonce appartient à un seul utilisateur
  Listing.belongsTo(User, {
    foreignKey: 'userId'
  });

  // --- Relation Listing & Photo (1:N) ---
  // Une annonce immobilière peut contenir plusieurs photos
  Listing.hasMany(Photo, {
    foreignKey: 'listingId',
    onDelete: 'CASCADE' // Si une annonce est supprimée, ses photos le sont aussi
  });
  // Chaque photo est rattachée à une seule annonce
  Photo.belongsTo(Listing, {
    foreignKey: 'listingId'
  });

  // --- Relation User & Favorite (N:M) ---
  // Un utilisateur peut enregistrer plusieurs annonces dans ses favoris (via la table Favorite)
  User.belongsToMany(Listing, {
    through: Favorite,
    foreignKey: 'userId'
  });
  // Une annonce peut être mise en favoris par plusieurs utilisateurs (via la table Favorite)
  Listing.belongsToMany(User, {
    through: Favorite,
    foreignKey: 'listingId'
  });

};

// Permet l'import soit par destructuration { setupAssociations }, soit direct setupAssociations
setupAssociations.setupAssociations = setupAssociations;

// 3. Exportation de la fonction setupAssociations
module.exports = setupAssociations;

