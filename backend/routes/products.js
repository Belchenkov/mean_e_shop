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

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).send('The product is not found!');
    }

    res.status(200).json({
        success: true,
        product
    });
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

    const checkCategory = await Category.findById(category);

    if (!checkCategory) {
        return res.status(404).send('Invalid category!');
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