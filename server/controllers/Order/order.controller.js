const { Order } = require('../../models/order.model');
const { Cart } = require('../../models/cart.model');
const { Address, UserAddress } = require('../../models/address.model');

module.exports = {
    addOrder: (req, res) => {
        Cart.deleteOne({ user: req.user._id })
            .exec((error, result) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                if (result) {
                    req.body.user = req.user._id;
                    req.body.orderStatus = [
                        {
                            type: "ordered",
                            date: new Date(),
                            isCompleted: true,
                        },
                        {
                            type: "packed",
                            isCompleted: false,
                        },
                        {
                            type: "shipped",
                            isCompleted: false,
                        },
                        {
                            type: "delivered",
                            isCompleted: false,
                        },
                    ];
                    // console.log(req.body);
                    Order.create(req.body)
                        .then(data => res.status(201).json(data))
                        .catch(error => res.status(400).json(error))
                }
            })
    },
    getOrder: (req, res) => {
        Order.findOne({ _id: req.body.orderId })
            .populate("items.productId", "_id name productImage createdAt")
            .lean()
            .exec((error, order) => {
                if (error) return res.status(400).json({ error });
                if (order) {
                    // console.log('order', order);
                    UserAddress.findOne({ user: req.user._id, })
                        .exec((error, address) => {
                            if (error) return res.status(400).json({ error });
                            // console.log('user address', address);

                            order.address = address.address.find(
                                (adr) => adr._id.toString() == order.addressId.toString()
                            );
                            // console.log('order2', order);

                            res.status(200).json({ order });
                        });
                }
            });
    },
    getOrders: (req, res) => {
        Order.find({ user: req.user._id })
            .select("_id addressId totalAmount paymentStatus orderStatus items createdAt")
            .populate("items.productId", "_id name measurement description inStock productImage")
            .then(orders => {
                res.status(200).json({ orders })
            })
            .catch(error => res.status(400).json({ error }))
        // Order.find({ user: req.user._id })
        //     .select("_id addressId totalAmount paymentStatus orderStatus items")
        //     .populate("items.productId", "_id name productImage")
        //     .exec((error, orders) => {
        //         if (error) {
        //             return res.status(400).json({ error });
        //         }
        //         if (orders) {
        //             res.status(200).json({ orders });
        //         }
        //     })
    }
}