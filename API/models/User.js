const mongoose = require('mongoose');


const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
  },
  prenom: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
    trim: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères'],
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères'],
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Veuillez entrer un email valide'],
  },
  phone: {
    type: String,
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Veuillez entrer un numéro de téléphone valide'],
  },
  motDePasse: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
  },
  pseudo: {
    type: String,
    minlength: [3, 'Le pseudo doit contenir au moins 3 caractères'],
    maxlength: [20, 'Le pseudo ne peut pas dépasser 20 caractères'],
  },
  dateDeNaissance: {
    type: Date,
  },
  avatar: {
    type: String,
    default: 'https://avatars.githubusercontent.com/u/194265487?v=4',
  },
  role: {
    type: String,
    enum: ['utilisateur', 'entreprise', 'livreur', 'admin'],
    default: 'utilisateur',
  },
  adresse: {
    rue: { type: String, trim: true },
    ville: { type: String, trim: true },
    codePostal: { type: String, trim: true },
    pays: { type: String, trim: true },
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  dateDerniereConnexion: {
    type: Date,
    default: Date.now,
  },
  companieId: {
    type: String,
    default: '99',
  }
  
});


// utilisateurSchema.pre('update', function(next) {
//   if (this._update.$set) {
//     this._update.$set.dateDerniereConnexion = Date.now();
//   }
//   next();
// });

const itemUser = mongoose.model('User', utilisateurSchema);

module.exports = itemUser;