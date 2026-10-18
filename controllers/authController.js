const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Contrôleur gérant l'authentification des utilisateurs (Inscription et Connexion)
class AuthController {

  // Méthode pour inscrire un nouvel utilisateur
  async register(req, res) {
    try {
      // 1. Récupérer les données envoyées par le client dans le corps de la requête
      const { nom, email, password, telephone, role } = req.body;

      // 2. Vérifier si un utilisateur existe déjà avec la même adresse email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          message: "Un utilisateur avec cette adresse email existe déjà."
        });
      }

      // 3. Hacher (sécuriser) le mot de passe avec bcrypt avant de l'enregistrer
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 4. Créer le nouvel utilisateur dans la base de données
      const newUser = await User.create({
        nom,
        email,
        password: hashedPassword,
        telephone,
        role: role || 'client' // Rôle par défaut si non spécifié
      });

      // 5. Répondre avec un code 201 (Créé) et renvoyer les données publiques de l'utilisateur
      return res.status(201).json({
        message: "Inscription réussie avec succès !",
        user: {
          id: newUser.id,
          nom: newUser.nom,
          email: newUser.email,
          telephone: newUser.telephone,
          role: newUser.role
        }
      });

    } catch (error) {
      // Gestion des erreurs serveur
      return res.status(500).json({
        message: "Erreur lors de l'inscription.",
        error: error.message
      });
    }
  }

  // Méthode pour connecter un utilisateur existant
  async login(req, res) {
    try {
      // 1. Récupérer l'email et le mot de passe saisis par l'utilisateur
      const { email, password } = req.body;

      // 2. Chercher si l'utilisateur existe dans la base de données
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          message: "Adresse email non trouvée."
        });
      }

      // 3. Comparer le mot de passe fourni avec le mot de passe haché stocké en base
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Mot de passe incorrect."
        });
      }

      // 4. Générer un jeton JWT valide pendant 24 heures pour identifier l'utilisateur
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'cle_secrete_par_defaut',
        { expiresIn: '24h' }
      );

      // 5. Répondre avec succès en renvoyant le token et les informations de l'utilisateur
      return res.status(200).json({
        message: "Connexion réussie !",
        token,
        user: {
          id: user.id,
          nom: user.nom,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      // Gestion des erreurs serveur
      return res.status(500).json({
        message: "Erreur lors de la connexion.",
        error: error.message
      });
    }
  }

}

// Exportation d'une instance unique de la classe AuthController
module.exports = new AuthController();

