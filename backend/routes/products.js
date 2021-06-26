const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', async (req, res) => {
    const products = await Product.find({});

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});

router.post('/', async (req, res) => {

});

module.exports = router;