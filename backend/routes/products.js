const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.categories) {
        filter = {
            category: req.query.categories.split(',')
        };
    }

    const products = await Product
        .find(filter)
        .populate('category');

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid Product id!');
    }

    const product = await Product.findById(id)
        .populate('category');

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

    if (!mongoose.isValidObjectId(category)) {
        return res.status(400).send('Invalid Category id!');
    }

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

router.put(`/:id`, async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid Product id!');
    }

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
        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).send('Invalid Category id!');
        }

        const checkCategory = await Category.findById(category);
        if (!checkCategory) {
            return res.status(404).send('Invalid category!');
        }

        const product = await Product.findByIdAndUpdate(
            id,
            {
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
            }, { new: true });

        if(!product) {
            res.status(404).json({
                success: false,
                message: 'The product cannot by updated!'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error(error.name + ': ' + error.message);
        return res.status(400).json({
            success: false,
            error
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid Product id!');
    }

    try {
        const product = await Product.findByIdAndRemove(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'The product is not found!'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'The product is deleted!'
        });
    } catch (error) {
        console.error(error.name + ': ' + error.message);
        return res.status(400).json({
            success: false,
            error
        });
    }
});

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments(count => count);

    if (!productCount) {
        return res.status(400).send('Cannot return count products!');
    }

    res.status(200).json({
        success: true,
        productCount
    });
});

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count || 0;

    const products = await Product
        .find({ isFeatured: true })
        .limit(+count);

    if (!products) {
        return res.status(400).send('Cannot return featured products!');
    }

    res.status(200).json({
        success: true,
        products
    });
});

module.exports = router;