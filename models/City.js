const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définition du modèle City (Ville)
const City = sequelize.define('City', {
  // Nom de la ville
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Ajoute automatiquement les champs createdAt et updatedAt
  timestamps: true
});

// Exportation du modèle pour l'utiliser ailleurs dans le projet
module.exports = City;

