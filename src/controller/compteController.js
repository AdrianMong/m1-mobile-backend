const Compte = require("../models/compte");
const Authentication = require("../utils/authentication");
const Tools = require("../utils/tools");

module.exports.signup = async (req, res) => {
    try {
        const compte = new Compte({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: await Tools.hash(req.body.password)
        });
        compte.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "Votre compte a bien été créé, veuillez à présent vous connecter",
                data: result.email
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const compte = await Compte.findOne({ email: req.body.email });
        if (!compte) throw new Error("Veuillez vérifier votre adresse email");
        if (!await Authentication.comparePassword(req.body.password, compte.password)) throw new Error("Veuillez vérifier votre mot de passe");
        res.status(200).json({
            status: "success",
            token: Authentication.generateToken(compte),
            compte
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}