const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
            },
            quantity: {
                type: Number,
                default: 1,
            }
            // ,
            // price: {
            //     type: Number,
            //     required: true
            // }
        }
    ]
}, { timestamps: true })

const Cart = new mongoose.model("Cart", CartSchema);

module.exports.Cart = Cart;
module.exports.CartSchema = CartSchema;