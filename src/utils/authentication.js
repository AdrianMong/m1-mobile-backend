const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const Compte = require("./../models/compte");

module.exports.comparePassword = (plainPwd, encryptedPwd) => {
    return bcrypt.compare(plainPwd, encryptedPwd)
}

module.exports.generateToken = (data, duration) => {
    data.createdAt = new Date();
    const options = {
        expiresIn: duration ?? process.env.TOKEN_DURATION
    };
    return jwt.sign({ data }, PRIVATE_KEY, options);
}

module.exports.checkToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error("Accès non autorisé");
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, PRIVATE_KEY);
        if (!data) throw new Error("Token invalide");
        Compte.findById(data.data._id).then(result => {
            if (!result) throw new Error("Compte non valide");
            next();
        }).catch(error => {
            res.status(403).json({
                message: error.message
            });
        })
    } catch (error) {
        res.status(403).json({
            message: error.message
        });
    }
}