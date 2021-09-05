const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: String
    }
}, {timestamps:true})

const Category = new mongoose.model("Category", CategorySchema);

module.exports.Category = Category;
module.exports.CategorySchema = CategorySchema;