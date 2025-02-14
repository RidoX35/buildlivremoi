const itemProduct = require('../models/Product');


// Créer un nouvel utilisateur
const createProduct = async (req, res) => {
    try {
      req.body.companieId = req.params.id;
      const newProduct = new itemProduct(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
  };
  
  // Récupérer tous les utilisateurs
  const getAllProduct = async (req, res) => {
    try {
      const products = await itemProduct.find({companieId: req.params.id});
    
      // Vérifier si des produits ont été trouvés
      if (products.length === 0) {
        return res.status(404).json({ message: "Aucun produit trouvé pour cette companieID." });
      }

      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Récupérer un utilisateur par ID
  const getProductById = async (req, res) => {
    try {
      const products = await itemProduct.findById(req.params.id);
      if (!products) {
        return res.status(404).json({ message: "Aucun produits trouvé" });
      }
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Mettre à jour un utilisateur
  const updateProduct = async (req, res) => {
    try {
      const products = await itemProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!products) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(products);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Supprimer un utilisateur
  const deleteProduct = async (req, res) => {
    try {
      const products = await itemProduct.findByIdAndDelete(req.params.id);
      if (!products) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  
  // ----------------------------------------------------------------------------------------
  
  
  module.exports = { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct };
  