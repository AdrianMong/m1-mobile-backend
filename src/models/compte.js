const mongoose = require("mongoose");

const compteSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    prenom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 60,
        match: /^[a-z0-9._-]{1,30}@[a-zA-Z0-9.\-_]{1,20}\.[a-z]{1,10}$/
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("compte", compteSchema);