const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définition du modèle Photo (Images associées aux annonces)
const Photo = sequelize.define('Photo', {
  // Lien ou chemin vers l'image
  urlImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Ordre d'affichage de l'image dans la galerie de l'annonce
  ordreAffichage: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  // Ajoute automatiquement les champs createdAt et updatedAt
  timestamps: true
});

// Exportation du modèle pour l'utiliser ailleurs dans le projet
module.exports = Photo;

