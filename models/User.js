const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définition du modèle User (Utilisateur)
const User = sequelize.define('User', {
  // Nom complet de l'utilisateur
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Adresse email (doit être unique pour chaque compte)
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Mot de passe sécurisé (sera stocké sous forme hachée)
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Numéro de téléphone de contact
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Rôle de l'utilisateur dans l'application ('admin', 'proprietaire', ou 'client')
  role: {
    type: DataTypes.ENUM('admin', 'proprietaire', 'client'),
    defaultValue: 'client'
  }
}, {
  // Ajoute automatiquement les champs createdAt et updatedAt
  timestamps: true
});

// Exportation du modèle pour l'utiliser ailleurs dans le projet
module.exports = User;