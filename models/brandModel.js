const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A brand must have a name!'],
        unique: true,
        trim: true
    }
});

module.exports = mongoose.model("Brand", BrandSchema);
