const mongoose = require("mongoose");

const leconSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    chapitre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chapitre",
        required: true
    },
    titre: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    nbreQuestion: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return 0 < value;
            },
            message: props => `Nombre de question invalide: ${props.value}`
        }
    },
    ordre: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return 0 < value;
            },
            message: props => `Ordre invalide: ${props.value}`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("lecon", leconSchema);