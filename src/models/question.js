const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    lecon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecon",
        required: true
    },
    question: {
        type: String,
        trim: true,
        required: true,
    },
    choix: [{
        type: String,
        trim: true,
        required: true,
        minLenght: 2,
        maxLenght: 4,
    }],
    reponse: [{
        type: Number,
        validate: {
            validator: function (value) {
                return value > 0 && value <= this.choix.length;
            },
            message: props => `Réponse invalide: ${props.value}`
        }
    }],
    cultureGenerale: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("question", questionSchema);