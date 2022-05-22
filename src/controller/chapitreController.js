const Chapitre = require("../models/chapitre");
const { default: mongoose } = require("mongoose");

module.exports.create = (req, res) => {
    try {
        const chapitre = new Chapitre({
            matiere: mongoose.Types.ObjectId(req.body.matiere),
            titre: req.body.titre,
            description: req.body.description,
            ordre: Number.parseInt(req.body.ordre),
        });
        chapitre.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "La chapitre a bien été enregistré",
                data: result
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.findById = async (req, res) => {
    try {
        const data = await Chapitre.findById(req.params.id);
        if (!data) throw new Error("Ressource introuvable");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.update = async(req,res) => {
    try {
        const chapitre = await Chapitre.findById(req.params.id);
        if (!chapitre) throw new Error("Ressource introuvable");

        chapitre.matiere = mongoose.Types.ObjectId(req.body.matiere);
        chapitre.titre = req.body.titre;
        chapitre.ordre = Number.parseInt(req.body.ordre);

        chapitre.save().then(result => {
            res.status(200).json({
                status: "success",
                message: "Les modifications ont bien été enregistrées",
                data: result
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        })
    }
    catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.delete = async (req, res) => {
    try {
        const chapitre = await Chapitre.findById(req.params.id);
        if (!chapitre) throw new Error("Ressource introuvable");
        chapitre.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
            res.status(200).json({
                status: "success",
                message: "Les données ont bien été effacées",
                data: result
            });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}