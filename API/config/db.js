const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://keyranpankeu:vT8zoBdKm3LPohqq@livremoi.2pvzv.mongodb.net/LivreMoi?retryWrites=true&w=majority&appName=LivreMoi", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connecté à MongoDB');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB', err);
    process.exit(1);  // Arrêter l'application en cas d'erreur
  }
};

module.exports = connectDB;
