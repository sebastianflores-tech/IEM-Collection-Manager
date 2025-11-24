const mongoose = require("mongoose");

const IemSchema = new mongoose.Schema({
    brand: String,
    model: String,
    soundSignature: String,
    rating: Number
});

module.exports = mongoose.model("Iem", IemSchema);
