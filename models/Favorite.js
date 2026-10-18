const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définition du modèle Favorite (Structure vide pour l'instant, servira de table de liaison / favoris)
const Favorite = sequelize.define('Favorite', {
  // Table de jointure vide pour le moment (les clés étrangères seront ajoutées avec les associations)
}, {
  // Ajoute automatiquement les champs createdAt et updatedAt
  timestamps: true
});

// Exportation du modèle pour l'utiliser ailleurs dans le projet
module.exports = Favorite;

