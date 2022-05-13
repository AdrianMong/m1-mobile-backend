const mongoose = require("mongoose");

const chapitreSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    matiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "matiere",
        required: true
    },
    titre: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
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

module.exports = mongoose.model("chapitre", chapitreSchema);