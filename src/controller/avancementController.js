const Avancement = require("../models/avancement");
const { default: mongoose } = require("mongoose");

module.exports.create = (req, res) => {
    try {
        const avancement = new Avancement({
            lecon: mongoose.Types.ObjectId(req.body.lecon),
            profil: mongoose.Types.ObjectId(req.body.profil0),
            score: Number.parseInt(req.body.score)
        }); 
        avancement.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "L'avancement a bien été enregistré",
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
        const data = await Avancement.findById(req.params.id);
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
        const avancement = await Avancement.findById(req.params.id);
        if (!avancement) throw new Error("Ressource introuvable");

        avancement.lecon = mongoose.Types.ObjectId(req.body.lecon);
        avancement.profil = mongoose.Types.ObjectId(req.body.profil);
        avancement.score = Number.parseInt(req.body.score);

        avancement.save().then(result => {
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
        const avancement = await Avancement.findById(req.params.id);
        if (!avancement) throw new Error("Ressource introuvable");
        avancement.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
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