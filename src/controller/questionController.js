const Question = require("../models/question");
const { default: mongoose } = require("mongoose");

module.exports.create = (req, res) => {
    try {
        const question = new Question({
            lecon: mongoose.Types.ObjectId(req.body.lecon),
            question: req.body.question,
            choix: req.body.choix,
            reponse: Number.parseInt(req.body.reponse),
            cultureGenerale: req.body.cultureGenerale == 1
        });
        question.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "La question a bien été enregistré",
                data: result
            });
        }).catch(error => {
            res.status(200).json({ status: "error", error: error.message });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.findByLecon = async (req, res) => {
    try {
        const data = await Question.find({ lecon: mongoose.Types.ObjectId(req.params.lecon) });
        if(data.length == 0) throw new Error("Aucune question existante pour cette leçon");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.findById = async (req, res) => {
    try {
        const data = await Question.findById(req.params.id);
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
        const question = await Question.findById(req.params.id);
        if (!question) throw new Error("Ressource introuvable");

        question.lecon = mongoose.Types.ObjectId(req.body.lecon);
        question.question = req.body.question;
        question.choix = req.body.choix;
        question.reponse = req.body.reponse;
        question.cultureGenerale = req.body.cultureGenerale;

        question.save().then(result => {
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
        const question = await Question.findById(req.params.id);
        if (!question) throw new Error("Ressource introuvable");
        Question.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
            res.status(200).json({
                message: "Les données ont bien été effacées",
                data: result
            });
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}