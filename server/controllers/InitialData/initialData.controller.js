const { Category } = require('../../models/category.model');
const { Product } = require('../../models/product.model');


function getCategoryList(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for (const cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            parentId: cate.parentId,
            children: getCategoryList(categories, cate._id)
        });
    }
    return categoryList;
}

module.exports = {
    getInitialData: async (req, res) => {
        const categories = await Category.find({}).exec();
        const products = await Product.find()
            .select('_id name price measurement description inStock productImage category')
            .populate({path: 'category', select: '_id name'})
            .exec();
        res.status(200).json({
            categories: getCategoryList(categories),
            products
        })
    }
}