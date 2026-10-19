const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Connexion m3a la base de données (Sequelize)
const sequelize = require('./config/database');

// 2. Importation des modèles pour que Sequelize les prenne en compte
require('./models/User');
require('./models/Listing');
require('./models/Photo');
require('./models/City');
require('./models/Favorite');

// 3. Importation des routes
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

// 4. Importation de Scalar pour la documentation
const { apiReference } = require('@scalar/express-api-reference');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// 5. Utilisation des routes (HADCHI LI KAN NA9ES)
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);

// 6. Configuration de Scalar
app.use(
  '/reference',
  apiReference({
    spec: {
      content: {
        openapi: '3.1.0',
        info: {
          title: 'DARHOME API',
          version: '1.0.0',
        },
        paths: {
          '/api/auth/register': {
            post: {
              summary: 'Créer un nouveau compte',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        nom: { type: 'string', example: 'Karim' },
                        email: { type: 'string', example: 'karim@email.com' },
                        password: { type: 'string', example: 'password123' },
                        telephone: { type: 'string', example: '0600000000' },
                        role: { type: 'string', example: 'client' }
                      }
                    }
                  }
                }
              },
              responses: { '201': { description: 'Compte créé' }, '500': { description: 'Erreur Serveur' } }
            }
          },
          '/api/auth/login': {
            post: {
              summary: 'Se connecter',
              responses: { '200': { description: 'Connexion réussie avec Token' } }
            }
          },
          '/api/listings': {
            get: {
              summary: 'Récupérer toutes les annonces',
              responses: { '200': { description: 'Liste des annonces' } }
            },
            post: {
              summary: 'Créer une nouvelle annonce',
              responses: { '201': { description: 'Annonce créée' } }
            }
          },
          '/api/listings/{id}': {
            get: {
              summary: 'Récupérer une annonce par ID',
              parameters: [
                { name: 'id', in: 'path', required: true, description: 'ID de l\'annonce', schema: { type: 'integer' } }
              ],
              responses: { '200': { description: 'Détails de l\'annonce' } }
            }
          }
        }
      }
    }
  })
);

app.get('/', (req, res) => {
  res.send('DARHOME API khdama mzyan! Accédez à la documentation sur /reference');
});

const PORT = process.env.PORT || 3000;

// 8. Test de connexion et synchronisation de la base de données
sequelize.authenticate()
  .then(async () => {
    console.log('✅ Connexion avec PostgreSQL réussie !');
    await sequelize.sync({ alter: true }); // 'alter: true' met à jour les tables si tu changes les modèles
    console.log('✅ Tables synchronisées avec succès !');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur khdam f le port ${PORT}`);
      console.log(`📄 Documentation Scalar : http://localhost:${PORT}/reference`);
    });
  })
  .catch(err => {
    console.error('❌ Problème de connexion avec la base de données :', err.message);
  });