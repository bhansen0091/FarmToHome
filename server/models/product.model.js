const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    measurement: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const Product = new mongoose.model("Product", ProductSchema);

module.exports.Product = Product;
module.exports.ProductSchema = ProductSchema;