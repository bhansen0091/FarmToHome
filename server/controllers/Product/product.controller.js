const { Product } = require("../../models/product.model");
const { Category } = require("../../models/category.model");


module.exports = {
    index: (req, res) => {
        Product.find()
            .then(data => res.status(200).json({ products: data }))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    getWithCatInfo: async (req, res) => {
        const products = await Product.find()
            .select('_id name price measurement description inStock productImage category')
            .populate({ path: 'category', select: '_id name' })
            .exec();
        res.status(200).json({ products: products })
    },
    create: (req, res) => {

        const productObj = {
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            measurement: req.body.measurement,
            inStock: req.body.inStock
        }

        if (req.file) {
            // console.log('req.file ', req.file);
            productObj.productImage = req.file.filename;
        }

        Product.create(productObj)
            .then(data => res.json(data))
            .catch(err => res.json({ errors: err.errors }));
    },
    getByCategoryName: (req, res) => {
        const { name } = req.params;
        // console.log(req.params);
        Category.findOne({ name: name })
            .select('_id')
            .exec((error, category) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                if (category) {
                    Product.find({ category: category._id })
                        .exec((error, products) => {
                            if (error) {
                                return res.status(400).json({ error });
                            }
                            if (products.length > 0) {
                                res.status(200).json({ products });
                            }
                        })
                }
            })
    },
    show: (req, res) => {
        Product.findById(req.params.id)
            .then(data => res.json(data))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    update: (req, res) => {
        console.log('req.body update', req.body)
        Product.updateOne({ _id: req.params.id }, req.body, { runValidators: true, new: true })
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    destroy: (req, res) => {
        // console.log('req.body', req.body);
        const { productId } = req.body.payload;
        if (productId) {
            Product.deleteOne({ _id: productId })
            .exec((error, result) => {
                if (error) return res.status(400).json({ error });
                if (result) {
                    res.status(202).json({ result });
                }
            });
        } else {
            res.status(400).json({ error: "Params required" });
        }
    }
}


    // Product.deleteOne({ _id: req.params.id })
    //     .then(data => res.redirect(303, '/api/products'))
    //     .catch(err => res.status(404).json({ errors: err.errors }))
