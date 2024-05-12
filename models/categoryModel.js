const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A category must have a name!'],
        unique: true,
        trim: true
    },
    parentCategory: {
        type: String,
        productId: String,
        default: null
    },
});

module.exports = mongoose.model("Category", CategorySchema);
