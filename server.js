const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database'); // Jbna l'fichier dyal l'config

const app = express();

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('DARHOME API khdama mzyan!');
});

const PORT = process.env.PORT || 3000;

// Hna kantestiw wach l'connexion m3a PostgreSQL dazt mzyan 9bel maykhdem l'serveur
sequelize.authenticate()
  .then(() => {
    console.log('Connexion avec postgrsql est succes! ');
    app.listen(PORT, () => {
        console.log(`Serveur khdam f port ${PORT} `);
    });
  })
  .catch(err => {
    console.error('problem de connection avec la base de donnee', err);
  });