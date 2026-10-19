const jwt = require('jsonwebtoken');
require('dotenv').config(); // Charger les variables d'environnement (.env)

// 1. Middleware pour vérifier la validité du token JWT
const verifyToken = (req, res, next) => {
  // Récupérer le header "Authorization" envoyé par le client
  const authHeader = req.headers['authorization'];

  // Vérifier si le header existe
  if (!authHeader) {
    return res.status(401).json({
      message: "Accès refusé. Aucun token d'authentification fourni."
    });
  }

  // Extraire le token (prend en compte le format classique "Bearer <token>" ou le token brut)
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  // Vérifier le token avec la clé secrète
  jwt.verify(token, process.env.JWT_SECRET || 'cle_secrete_par_defaut', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Token invalide ou expiré."
      });
    }

    // Attacher les informations décodées de l'utilisateur (id, role, etc.) à req.user
    req.user = decoded;

    // Passer au middleware ou contrôleur suivant
    next();
  });
};

// 2. Middleware pour vérifier si le rôle de l'utilisateur fait partie des rôles autorisés
const checkRole = (rolesArray) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur est connecté et si son rôle est dans la liste autorisée
    const userRole = req.user ? req.user.role : null;
    const isAuthorized = userRole && rolesArray.some(role => 
      role === userRole || 
      role.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === userRole.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    if (!isAuthorized) {
      return res.status(403).json({
        message: "Accès interdit : vous n'avez pas les autorisations nécessaires pour effectuer cette action."
      });
    }

    // Le rôle est autorisé, on passe à l'étape suivante
    next();
  };
};

// Exportation des deux middlewares pour les utiliser dans les routes
module.exports = {
  verifyToken,
  checkRole
};

