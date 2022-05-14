const mongoose = require("mongoose");

const profilSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    compte: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "compte",
        required: true
    },
    nom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    dateNaissance: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                let today = new Date();
                return today > value;
            },
            message: props => `Date de naissance invalide, ${props.value}`
        }
    },
    sexe: {
        type: Boolean,
        default: true,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("profil", profilSchema);