const { Cart } = require("../../models/cart.model");

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve())
            .catch(err => reject(err))
    })
}

module.exports = {
    index: (req, res) => {
        Cart.find()
            .then(data => res.json(data))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    create: (req, res) => {

    },
    // addItemToCart: (req, res) => {
    //     // console.log(req.user.id);
    //     // res.json({message: 'cart'})
    //     Cart.findOne({ user: req.user._id })
    //         .exec((error, cart) => {
    //             if (error) {
    //                 res.status(404).json({ error })
    //             }
    //             if (cart) {
    //                 // If cart exists then update the quantity
    //                 console.log(req.body);

    //             } else {
    //                 // If cart does not exsit then create a new cart object
    //                 const cart = new Cart({
    //                     user: req.user._id,
    //                     cartItems: req.body.cartItems
    //                 });
    //                 Cart.create(cart)
    //                     .then(data => res.status(200).json(data))
    //                     .catch(err => res.status(400).json(err))
    //             }
    //         })

    // },
    addItemToCart: (req, res) => {
        // console.log(req.user.id);
        // res.json({message: 'cart'})
        Cart.findOne({ user: req.user._id })
            .exec((error, cart) => {
                if (error) {
                    res.status(404).json({ error })
                }
                if (cart) {
                    // If cart exists then update the quantity
                    let promiseArray = [];
                    // console.log(req.body);
                    req.body.cartItems.forEach((cartItem) => {
                        const product = cartItem.product;
                        const item = cart.cartItems.find(c => c.product == product);
                        let condition, update;
                        if (item) {
                            // If the product already exists in the cartItems array, update the quantity to the new value
                            condition = { "user": req.user._id, "cartItems.product": product }
                            update = {
                                "$set": {
                                    "cartItems.$": cartItem
                                }
                            };
                        } else {
                            // If the product does not exist in the cartItems array, add the new product to the array
                            condition = { user: req.user._id }
                            update = {
                                "$push": {
                                    "cartItems": cartItem
                                }
                            }
                        }
                        // Execute the update with the needed condition
                        promiseArray.push(runUpdate(condition, update))

                    });
                    Promise.all(promiseArray)
                        .then(response => res.status(201).json({ response }))
                        .catch(error => res.status(400).json({ error }))

                } else {
                    // If cart does not exsit then create a new cart object
                    const cart = new Cart({
                        user: req.user._id,
                        cartItems: req.body.cartItems
                    });
                    Cart.create(cart)
                        .then(data => res.status(200).json(data))
                        .catch(err => res.status(400).json(err))
                }
            })

    },
    // addItemToCart: (req, res) => {
    //     // console.log(req.user.id);
    //     // res.json({message: 'cart'})
    //     Cart.findOne({ user: req.user.id })
    //         .exec((error, cart) => {
    //             if (error) {
    //                 res.status(404).json({ error })
    //             }
    //             if (cart) {
    //                 // If cart exists then update the quantity
    //                 const product = req.body.cartItems.product;
    //                 const item = cart.cartItems.find(c => c.product == product);
    //                 let condition, update;
    //                 if (item) {
    //                     // If the product already exists in the cartItems array, update the quantity to the new value
    //                     condition = { "user": req.user.id, "cartItems.product": product }
    //                     update = {
    //                         "$set": {
    //                             "cartItems.$": {
    //                                 ...req.body.cartItems,
    //                                 quantity: item.quantity + req.body.cartItems.quantity
    //                             }
    //                         }
    //                     };
    //                 } else {
    //                     // If the product does not exist in the cartItems array, add the new product to the array
    //                     condition = { user: req.user.id }
    //                     update = {
    //                         "$push": {
    //                             "cartItems": req.body.cartItems
    //                         }
    //                     }
    //                 }
    //                 // Execute the update with the needed condition
    //                 Cart.findOneAndUpdate(condition, update)
    //                     .exec((error, _cart) => {
    //                         if (error) {
    //                             return res.status(400).json({ error });
    //                         }
    //                         if (_cart) {
    //                             return res.status(201).json({ cart: _cart });
    //                         }
    //                     })
    //             } else {
    //                 // If cart does not exsit then create a new cart object
    //                 const cart = new Cart({
    //                     user: req.user.id,
    //                     cartItems: req.body.cartItems
    //                 });
    //                 Cart.create(cart)
    //                     .then(data => res.status(200).json(data))
    //                     .catch(err => res.status(400).json(err))
    //             }
    //         })

    // },
    getCartItems: (req, res) => {
        Cart.findOne({ user: req.user._id })
            .populate('cartItems.product', '_id category name description price measurement productImage inStock')
            .exec((error, cart) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (cart) {
                    // console.log(cart.cartItems);
                    let cartItems = [];
                    cart.cartItems.forEach((item, idx) => {
                        cartItems.push(item)
                    })
                    res.status(200).json( cartItems )
                }
            })
    },
    show: (req, res) => {
        Cart.find({ _id: req.params.id })
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    update: (req, res) => {
        Cart.updateOne({ _id: req.params.id }, req.body, { runValidators: true, new: true })
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    destroy: (req, res) => {
        Cart.deleteOne({ _id: req.params.id })
            .then(data => res.redirect(303, '/api/cart'))
            .catch(err => res.status(404).json({ errors: err.errors }))
    }
}