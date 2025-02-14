const Joi = require('joi');

// Validation des données pour un magasin
const storeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),  // Le nom du magasin est obligatoire et doit être une chaîne
    type: Joi.string().required(),  // Le type est obligatoire et doit être une chaîne
    location: Joi.object({
      address: Joi.string(),
      city: Joi.string(),
      postalCode: Joi.string(),
      country: Joi.string()
    }).required(),  // L'emplacement doit être un objet avec les propriétés nécessaires
    openingHours: Joi.object({
      monday: Joi.string(),
      tuesday: Joi.string(),
      wednesday: Joi.string(),
      thursday: Joi.string(),
      friday: Joi.string(),
      saturday: Joi.string(),
      sunday: Joi.string()
    }).required(),  // Les heures d'ouverture doivent être un objet avec chaque jour de la semaine
    contact: Joi.object({
      phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),  // Le numéro de téléphone (facultatif) doit correspondre à un format de 10 chiffres
      email: Joi.string().email().optional()  // L'email doit être une chaîne de caractères valide (facultatif)
    }).optional(),  // L'objet contact est optionnel
    website: Joi.string().uri().optional(),  // Le site web est facultatif et doit être une URL valide
    products: Joi.array().items(Joi.string()).optional(),  // Liste de produits, chacun étant une chaîne de caractères
    rating: Joi.number().min(0).max(5).optional(),  // La note doit être un nombre entre 0 et 5 (facultatif)
    tags: Joi.array().items(Joi.string()).optional(),  // Liste de tags (facultatif)
  });

  return schema.validate(data);  // Valider les données selon le schéma
};

module.exports = { storeValidation };
