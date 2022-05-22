const Lecon = require("../models/lecon");
const { default: mongoose } = require("mongoose");


module.exports.create = (req,res) => {
    try {
        const lecon = new Lecon({
            
            chapitre: mongoose.Types.ObjectId(req.body.chapitre),
            titre: req.body.titre,
            nbreQuestion: Number.parseInt(req.body.nbreQuestion),
            ordre:Number.parseInt(req.body.ordre),
            createAt: req.body.createAt
        });
        lecon.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "La lecon a bien été enregistré",
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
        const data = await Lecon.findById(req.params.id);
        if (!data) throw new Error("Ressource introuvable");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.update = async (req, res) => {
    try {
        const lecon = await Lecon.findById(req.params.id);
        if (!lecon) throw new Error("Ressource introuvable");

        lecon.id = mongoose.Types.ObjectId(req.body.lecon);
        lecon.chapitre = req.body.chapitre;
        lecon.titre = req.body.titre;
        lecon.nbreQuestion = req.body.nbreQuestion;
        lecon.ordre = req.body.ordre;
        lecon.createAt = req.body.createAt;

        lecon.save().then(result => {
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
        const lecon = await Lecon.findById(req.params.id);
        if (!lecon) throw new Error("Ressource introuvable");
        lecon.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
            res.status(200).json({
                message: "Les données ont bien été effacées",
                data: result
            });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}