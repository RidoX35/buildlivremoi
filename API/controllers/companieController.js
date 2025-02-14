const itemCompanie = require('../models/Companie');

// Créer un nouvel item
const createStore = async (req, res) => {
  try {
    req.body.userId = req.auth.userId;
    const newItem = new itemCompanie(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les items
const getAllStore = async (req, res) => {
  try {
    const items = await itemCompanie.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer un item par ID
const getStoreById = async (req, res) => {
  try {
    const item = await itemCompanie.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item non trouvé" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour un item
const updateStore = async (req, res) => {
  try {
    const item = await itemCompanie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: "Item non trouvé" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un item
const deleteStore = async (req, res) => {
  try {
    const item = await itemCompanie.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item non trouvé" });
    }
    res.status(200).json({ message: "Item supprimé" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// ----------------------------------------------------------------------------------------

// Récupérer un store par son name
const getStoreByName = async (req, res) => {
  try {
      const store = await itemCompanie.findOne({ nom: req.params.name });
      if (!store) {
          return res.status(404).json({ message: 'Store non trouvé' });
      }
      res.status(200).json(store);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = { createStore, getAllStore, getStoreById, updateStore, deleteStore, getStoreByName };
