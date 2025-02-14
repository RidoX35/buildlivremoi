const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');


const companieCtrl = require('../controllers/companieController');


// ----------------------------------------------------------------------------------------

// Route pour créer un item
router.post('/companies', auth, companieCtrl.createStore);

// Route pour récupérer tous les items
router.get('/companies', companieCtrl.getAllStore);

// Route pour récupérer un item par son ID
router.get('/companies/:id', companieCtrl.getStoreById);

// Route pour mettre à jour un item
router.put('/companies/:id', auth, companieCtrl.updateStore);

// Route pour supprimer un item
router.delete('/companies/:id', auth, companieCtrl.deleteStore);

// ----------------------------------------------------------------------------------------

// Route pour récupérer un item par son name
router.get('/companies/name/:name', companieCtrl.getStoreByName); // Nouvelle route

module.exports = router;
