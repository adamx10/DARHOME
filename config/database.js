const { Sequelize } = require('sequelize');
require('dotenv').config();

// Hna kancreyiw l'connexion m3a PostgreSQL b Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // 7ydena l'logging bach mayb9ach y3mer lik l'terminal b les requêtes SQL
  }
);

// Kan'exportiw had l'connexion bach nkhdmo biha f les models
module.exports = sequelize;