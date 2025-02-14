const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La quantité doit être au moins 1'],
    },
  }],
  total: {
    type: Number,
    required: true,
    min: [0, 'Le total ne peut pas être négatif'],
  },
  statut: {
    type: String,
    enum: ['en cours', 'livré', 'annulé'],
    default: 'en cours',
  },
  dateCommande: {
    type: Date,
    default: Date.now,
  },
  adresseLivraison: {
    rue: { type: String, trim: true },
    ville: { type: String, trim: true },
    codePostal: { type: String, trim: true },
    pays: { type: String, trim: true },
  },
  livreurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
