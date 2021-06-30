const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find({});

    if (!users) {
        res.status(500).json({ success: false });
    }
    res.send(users);
});

router.post('/', async (req, res) => {
    const {
        name,
        email,
        passwordHash,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    } = req.body;

    try {
        const user = new User({
            name,
            email,
            passwordHash,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        });

        const newUser = await user.save();

        if (!newUser) {
            return res.status(404).send('The user cannot be created!');
        }

        res.status(201).json({
            success: true,
            newUser
        });
    } catch (error) {
        console.error(error.name + ': ' + error.message);
        return res.status(400).json({
            success: false,
            error
        });
    }
});

module.exports = router;
