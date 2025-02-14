const itemUser = require('../models/User');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Créer un nouvel utilisateur
const createUser = async (req, res) => {
    console.log('Inscription');
    bcrypt.hash(req.body.motDePasse, 10)
        .then(hash => {
            req.body.motDePasse = hash;
            const user = new itemUser(req.body );
            user.save()
            .then(() => {
              const token = jwt.sign(
                  { userId: user._id, email: user.email, role: user.role },
                  config.JWT_SECRET,
                  { expiresIn: '30d' }
              );

              res.status(201).json({
                  message: 'Utilisateur créé !',
                  userId: user._id,
                  token: token
              });
          })
          .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

  
  // Récupérer tous les utilisateurs
  const getAllUser = async (req, res) => {
    try {
      const users = await itemUser.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Récupérer un utilisateur par ID
  const getUserById = async (req, res) => {
    try {
      const user = await itemUser.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Mettre à jour un utilisateur
  const updateUser = async (req, res) => {
    try {
      const user = await itemUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Supprimer un utilisateur
  const deleteUser = async (req, res) => {
    try {
      const user = await itemUser.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

  const loginUser = async (req, res) => {
    console.log("Connection");
    itemUser.findOne({ email: req.body.email })
        .then(user => {
            console.log( "#SIN 1: " + JSON.stringify(req.body));
            if (!user) {
                return res.status(401).json(
                    { message: 'Paire login/mot de passe incorrecte' });
            }
            // console.log( "#SIN 2" + user.motDePasse + " <> " + req.body.password);
            bcrypt.compare(req.body.password, user.motDePasse)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json(
                            { message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                          { userId: user._id, nom: user.email, role: user.role },
                          config.JWT_SECRET,
                          { expiresIn: '30d' },
                      ),                      
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
  
  // ----------------------------------------------------------------------------------------

  module.exports = { createUser, getAllUser, getUserById, updateUser, deleteUser, loginUser };
