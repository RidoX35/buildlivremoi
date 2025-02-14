const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Le nom doit contenir au moins 3 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'La description doit contenir au moins 10 caractères'],
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Le prix ne peut pas être négatif']
  },
  companieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  quantite: {
    type: Number,
    min: [0, 'La quantité ne peut pas être négative'],
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Seafood",
      "Fast Food",
      "Chinese Food",
      "Noodles",
      "Pizza",
      "Pasta",
      "Subs",
      "Bread",
      "Pastries",
      "Coffee",
      "Books",
      "Stationery",
      "Magazines",
      "Organic Foods",
      "Vegetables",
      "Fruits",
    ],
  },
  images: {
    type: [String], // Tableau d'URLs d'images
    default: ['https://avatars.githubusercontent.com/u/194265487?v=4']  // URL de du produit par défaut
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  },
});

// Mise à jour automatique du champ `dateMiseAJour` à chaque modification
// productSchema.pre('save', function (next) {
//   this.updateAt = Date.now();
//   next();
// });

const itemProduct = mongoose.model('Product', produitSchema);

module.exports = itemProduct;