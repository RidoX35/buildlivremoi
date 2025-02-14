const mongoose = require('mongoose');

const companieSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Le nom de l'entreprise est obligatoire"],
    trim: true,
    minlength: [2, "Le nom de l'entreprise doit contenir au moins 2 caractères"],
    maxlength: [100, "Le nom de l'entreprise ne peut pas dépasser 100 caractères"],
  },
  adresse: {
    rue: String,
    ville: String,
    codePostal: String,
    pays: String,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: [String],
    default: ['https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'],
  },
  description: {
    type: String,
    trim: true,
  },
  produits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: [0, "La note ne peut pas être inférieure à 0"],
    max: [5, "La note ne peut pas dépasser 5"],
  },
  tags: [{
    type: String,
    trim: true,
  }],
});

// Middleware pour récupérer automatiquement l'adresse de l'utilisateur associé
companieSchema.pre('save', async function (next) {
  if (this.userId) {
    const User = mongoose.model('User');
    const user = await User.findById(this.userId);
    if (user && user.adresse) {
      this.adresse = user.adresse; // Récupère l'adresse depuis le modèle User
    }
  }
  next();
});

const itemcompanie = mongoose.model('companies', companieSchema);

module.exports = itemcompanie;
