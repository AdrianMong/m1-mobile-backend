const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    lecon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecon",
        required: true
    },
    titre: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    contenu: {
        type: String,
        trim: true,
    },
    video: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
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

module.exports = mongoose.model("section", sectionSchema);