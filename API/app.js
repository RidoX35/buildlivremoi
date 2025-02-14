const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

const config = require('./config/config');

const app = express();

// Middleware pour CORS et JSON
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Ajouter les routes de l'API
app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', productRoutes);

// Démarrer le serveur
const port = 3001;
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
