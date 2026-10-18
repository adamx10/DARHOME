const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Instanciation de la classe AuthController
const authController = new AuthController();

// 1. Route pour l'inscription d'un nouvel utilisateur
// Méthode : POST /register
// Appel de la méthode register avec une fonction fléchée pour conserver le contexte 'this'
router.post('/register', (req, res) => authController.register(req, res));

// 2. Route pour la connexion d'un utilisateur existant
// Méthode : POST /login
// Appel de la méthode login avec une fonction fléchée pour conserver le contexte 'this'
router.post('/login', (req, res) => authController.login(req, res));

// Exportation du routeur pour l'utiliser dans server.js
module.exports = router;

