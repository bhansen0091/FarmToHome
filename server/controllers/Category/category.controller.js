const { Category } = require('../../models/category.model');

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
    index: (req, res) => {
        Category.find()
            .exec((error, categories) => {
                if (error) {
                    res.status(404).json({ errors: error });
                }
                if (categories) {
                    const categoryList = getCategoryList(categories);
                    res.status(200).json({ categoryList });
                }
            })
    },
    create: (req, res) => {
        Category.findOne({ name: req.body.name })
            .exec((error, category) => {
                if (error) {
                    res.status(404).json({ errors: error });
                }
                if (category) {
                    return (res.status(400).json({
                        error: "Category already exsists."
                    }))
                } else {
                    // console.log(req.params);
                    // console.log(req.body);
                    const categoryObj = {
                        name: req.body.name
                    }

                    if (req.body.parentId) {
                        categoryObj.parentId = req.body.parentId;
                    }

                    Category.create(categoryObj)
                        .then(data => res.status(200).json(data))
                        .catch(err => {
                            if (err.name === 'MongoError' && err.code === 11000) {
                                // Duplicate entry
                                return res.status(422).json({ errorMessage: 'Category already exist!' });
                            }
                            res.status(404).json(err)
                        })
                }
            })
    },
    show: (req, res) => {
        Category.find({name: req.params.name})
            .then(data => res.json(data))
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    showById: (req, res) => {
        Category.find({_id: req.params.id})
            .then(data => {
                // const newData = data;
                // console.log(newData);
                // const { parentId, ...rest} = newData
                // newData = rest
                // console.log(newData);
                res.json(data)})
            .catch(err => res.status(404).json({ errors: err.errors }))
    },
    // getByCategoryName: (req, res) => {
    //     Category.find({ name: req.params.category })
    //         .exec((error, categories) => {
    //             if (error) {
    //                 res.status(404).json({ errors: error });
    //             }
    //             if (categories) {
    //                 const categoryList = getCategoryList(categories);
    //                 res.status(200).json({ categoryList });
    //             }
    //         })
    // },
    update: (req, res) => {
        Category.updateOne(
            { _id: req.params.id },
            req.body, { runValidators: true, new: true })
            .then(data => res.json({ results: data }))
            .catch(err => res.status(404).json({ errors: err }))
    },
    updateMultiple: async (req, res) => {

        // res.status(200).json({body: req.body});

        const { _id, name, parentId } = req.body;
        const updatedCategories = [];
        if (name instanceof Array) {

            for (var i = 0; i < name.length; i++) {
                const category = {
                    name: name[i],
                }
                if (parentId[i] !== "") {
                    category.parentId = parentId[i];
                } 

                const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { runValidators: true, new: true });
                updatedCategories.push(updatedCategory);
            }
            return res.status(201).json({ updatedCategories: updatedCategories })
        } else {
            const category = {
                name
            }
            if (parentId !== "") {
                category.parentId = parentId;
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
            return res.status(201).json({ updatedCategory: updatedCategory });
        }


    },
    deleteMultiple: async (req, res) => {
        const { ids } = req.body.payload;
        const deletedCats = [];
        for (var i = 0; i < ids.length; i++) {
            const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id})
            deletedCats.push(deleteCategory);
        }

        if (deletedCats.length == ids.length) {
            res.status(201).json({message: 'Categories Removed'});
        } else {
            res.status(400).json({message: 'Failed to remove.'})
        }
        // res.status(200).json({body: req.body})
    },
    destroy: (req, res) => {
        Category.deleteOne({ _id: req.params.id })
            .then(data => res.redirect(303, '/api/categories'))
            .catch(err => res.status(404).json({ errors: err }))
    }
}

// const categoryList = createCategories(categories);
// res.status(200).json({ categoryList });