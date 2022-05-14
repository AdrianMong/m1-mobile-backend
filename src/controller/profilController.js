const Profil = require("../models/profil");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { default: mongoose } = require("mongoose");

module.exports.create = async (req, res) => {
    try {
        const data = jwt.verify(req.headers.authorization.split(" ")[1], PRIVATE_KEY).data;
        const profil = new Profil({
            compte: mongoose.Types.ObjectId(data._id),
            nom: req.body.nom,
            dateNaissance: new Date(req.body.dateNaissance),
            sexe: req.body.sexe == 1
        });
        profil.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "Le profil a bien été enregistré",
                data: result
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.update = async (req, res) => {
    try {
        const profil = await Profil.findById(req.params.id);
        if (!profil) throw new Error("Ressource introuvable");
        profil.nom = req.body.nom;
        profil.dateNaissance = new Date(req.body.dateNaissance);
        profil.sexe = req.body.sexe == 1;
        profil.save().then(result => {
            res.status(200).json({
                status: "success",
                message: "Les modifications ont bien été enregistrés",
                data: result
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.delete = async (req, res) => {
    try {
        const profil = await Profil.findById(req.params.id);
        if (!profil) throw new Error("Ressource introuvable");
        profil.status = false;
        profil.save().then(_result => {
            res.status(200).json({
                status: "success",
                message: "Le profil a bien été supprimé",
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.findAll = async (req, res) => {
    try {
        const compte = jwt.verify(req.headers.authorization.split(" ")[1], PRIVATE_KEY).data;
        const data = await Profil.find({ compte: compte._id, status: true });
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.findOne = async (req, res) => {
    try {
        const compte = jwt.verify(req.headers.authorization.split(" ")[1], PRIVATE_KEY).data;
        const data = await Profil.findOne({ compte: compte._id, _id: req.params.id, status: true });
        if (!data) throw new Error("Ressource introuvable");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}