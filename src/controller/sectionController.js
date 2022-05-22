const Section = require("../models/section");
const SectionService = require("../services/sectionService");

module.exports.create = async (req, res) => {
    try {
        const section = new Section({
            lecon: req.params.lecon,
            titre: req.body.titre,
            contenu: req.body.contenu,
            video: req.body.video,
            image: req.body.image,
            cultureGenerale: req.body.cultureGenerale == 1,
            ordre: (await Section.count({ lecon: req.params.lecon })) + 1
        });
        section.save().then(result => {
            res.status(201).json({
                status: "success",
                message: "La section a bien été enregistré",
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
        const data = Section.findById(req.params.id);
        if (!data) throw new Error("Ressource introuvable");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}

module.exports.findByLecon = async (req, res) => {
    try {
        const data = await Section.find({ lecon: req.params.lecon }).sort({ ordre: 1 });
        if (data.length == 0) throw new Error("Aucun contenu existant pour cette leçon");
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
        const section = await Section.findById(req.params.id);
        if (!section) throw new Error("Ressource introuvable");

        if (req.body.ordre != section.ordre) await SectionService.updateOrder(section.lecon, section.ordre, req.body.ordre);

        section.lecon = req.body.lecon;
        section.titre = req.body.titre;
        section.contenu = req.body.contenu;
        section.video = req.body.video;
        section.image = req.body.image;
        section.ordre = req.body.ordre;

        section.save().then(result => {
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
        const section = await Section.findById(req.params.id);
        if (!section) throw new Error("Ressource introuvable");
        Section.deleteOne({ _id: req.params.id }).then(result => {
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