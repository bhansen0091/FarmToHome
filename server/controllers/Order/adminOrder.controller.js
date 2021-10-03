const { Order } = require('../../models/order.model');

module.exports = {
    // updateOrder: (req, res) => {
    //     console.log(req.body);
    //     Order.updateOne(
    //         { user: req.body.userId, "orderStatus.type": req.body.type },
    //         {
    //             $set: {
    //                 "orderStatus.$": [{ date: new Date(), isCompleted: true }]
    //             }
    //         },
    //         { new: true }
    //     ).exec((error, order) => {
    //         if (error) {
    //             return res.status(400).json({ error });
    //         }
    //         if (order) {
    //             res.status(201).json({ order });
    //         }
    //     })
    // },
    update: (req, res) => {
        console.log(req.body);
        Order.findOneAndUpdate(
            { _id: req.body.orderId, "orderStatus.type": req.body.type },
            {
                $set: {
                    "orderStatus.$": [
                        {
                            type: req.body.type,
                            date: new Date(),
                            isCompleted: true
                        }
                    ]
                }
            },
            { new: true }
        )
            .then(data => res.status(200).json(data))
            .catch(error => res.status(400).json({ error }))
    },
    getCustomerOrders: async (req, res) => {
        const orders = await Order.find({})
            .populate('user', "_id firstName lastName email contactNumber")
            .populate('addressId')
            .populate("items.productId", "_id name measurement inStock")
            .exec();
        res.status(200).json({ orders });
    }
}