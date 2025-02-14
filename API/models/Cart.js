const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence à la table 'User'
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit', // Référence à la table 'Produit'
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La quantité doit être au moins de 1']
    },
  });

const itemCart = mongoose.model('Cart', cartSchema);

module.exports = itemCart;