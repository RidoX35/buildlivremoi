const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productController');

// Route pour créer un nouveau produit
router.post('/products/:id', productCtrl.createProduct);

// Route pour récupérer tous les produits
router.get('/products/companie/:id', productCtrl.getAllProduct);

// Route pour récupérer un produit par ID
router.get('/products/product/:id', productCtrl.getProductById);

// Route pour mettre à jour un produit
router.put('/products/:id', productCtrl.updateProduct);

// Route pour supprimer un produit
router.delete('/products/:id', productCtrl.deleteProduct);

// ----------------------------------------------------------------------------------------

module.exports = router;