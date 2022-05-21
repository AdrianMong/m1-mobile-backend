const mongoose = require("mongoose");

const avancementSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    lecon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecon",
        required: true
    },
    profil: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profil",
        required: true
    },
    score: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: props => `Score invalide: ${props.value}`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("avancement", avancementSchema);