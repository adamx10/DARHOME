const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définition du modèle Listing (Annonce immobilière)
const Listing = sequelize.define('Listing', {
  // Titre principal de l'annonce
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Description détaillée du bien immobilier
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Type de bien immobilier parmi les choix définis
  typeBien: {
    type: DataTypes.ENUM('maison', 'appartement', 'studio', 'villa'),
    allowNull: false
  },
  // Ville où se situe le bien
  ville: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Quartier ou zone géographique dans la ville
  quartier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Prix du bien immobilier (en float pour gérer les décimales)
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // Statut de validation de l'annonce par l'administrateur
  statut: {
    type: DataTypes.ENUM('en_attente', 'validee', 'refusee'),
    defaultValue: 'en_attente'
  },
  // Disponibilité du bien (true = disponible, false = déjà loué ou vendu)
  disponibilite: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  // Ajoute automatiquement les champs createdAt et updatedAt
  timestamps: true
});

// Exportation du modèle pour l'utiliser ailleurs dans le projet
module.exports = Listing;

