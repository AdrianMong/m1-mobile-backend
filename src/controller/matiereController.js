const Matiere = require("../models/matiere")
const { default: mongoose } = require("mongoose");

module.exports.create = (req,res) => {
    try{
        const matiere = new Matiere({
            titre:req.body.titre,
            description:req.body.description,  
            icone:req.body.icone,
            couleur:req.body.couleur
        });
        matiere.save().then(result => {
            res.status(201).json({
                status: "success",
                message:"la matiere a bien été enregistré",
                data: result
            });
        }).catch (error => {
            res.status(200).json({status:"error",error: error.message});
        });
    } catch (error) {
        res.status(200).json({ status: "error", error: error.message });
    }
}
    
module.exports.findById = async (req,res) => {
    try {
        const data = await Matiere.findById(req.params.id);
        if(!data) throw new Error("Ressources introuvable");
        res.status(200).json({
            status: "success",
            data
        });
    } catch (error) {
        res.status(200).json({ status : "error" , error: error.message}); 
    }
}

module.exports.update = async(req,res) => {
    try {
        const matiere = await Matiere.findById(req.params.id);
        if (!matiere) throw new Error("Ressource introuvable");

        matiere.titre = req.body.titre;
        matiere.description = req.body.description;
        matiere.icone = req.body.icone;
        matiere.couleur = req.body.couleur;
        matiere.createAt = req.body.createAt;

        matiere.save().then(result => {
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
        const matiere = await Matiere.findById(req.params.id);
        if (!matiere) throw new Error("Ressource introuvable");
        matiere.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(result => {
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