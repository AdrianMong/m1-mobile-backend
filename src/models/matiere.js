const mongoose = require("mongoose");

const matiereSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    titre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
    },
    icone: {
        type: String,
        trim: true,
    },
    couleur: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("matiere", matiereSchema);