const express = require('express');
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/userController');

const router = express.Router();

// Route pour créer un nouvel utilisateur
router.post('/users', userCtrl.createUser);

// Route pour se connecter à un utilisateur
router.post('/users/login', userCtrl.loginUser);

// Route pour récupérer tous les utilisateurs
router.get('/users', auth, userCtrl.getAllUser);

// Route pour récupérer un utilisateur par ID
router.get('/users/:id', auth, userCtrl.getUserById);

// Route pour mettre à jour un utilisateur
router.put('/users/:id', auth, userCtrl.updateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:id', auth, userCtrl.deleteUser);

// -----------------------------------------------------------------------------

module.exports = router;