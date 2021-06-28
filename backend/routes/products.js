const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', async (req, res) => {
    const products = await Product.find({});

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.post('/', async (req, res) => {
    const {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReview,
        isFeatured
    } = req.body;

    try {
        const checkCategory = await Category.findById(category);

        if (!checkCategory) {
            return res.status(404).send('Invalid category!');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }

    const product = new Product({
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReview,
        isFeatured
    });

    try {
        const newProduct = await product.save();

        if (!product) {
            return res.status(500).send('The product cannot be created!');
        }

        res.status(201).json({
            newProduct,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error,
            success: false
        });
    }


});

module.exports = router;