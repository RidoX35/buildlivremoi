const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try {

        const token = req
            .headers
            .authorization
            .split(' ')[1];

        const decodedToken = jwt.verify(token, config.JWT_SECRET, );

        req.auth = {
            userId: decodedToken.userId,
            nom: decodedToken.nom
        };

        // console.log("Token valide");
        next();
    } catch (error) {
        // console.log("Token invalide");
        res
            .status(401)
            .json({error, Authentification: "Votre accès est refusé. Veuillez vérifier vos identifiants et réessayer."});
    }
};