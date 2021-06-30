const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find()
        .select('-passwordHash');

    if (!users) {
        res.status(500).json({ success: false });
    }
    res.status(200).json({
        success: true,
        users
    });
});

router.get(`/:id`, async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid Product id!');
    }

    try {
        const user = await User.findById(id)
            .select('-passwordHash');

        if(!user) {
            res.status(404).json({
                success: false,
                message: 'The user is not found!'
            })
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error.name + ': ' + error.message);
        return res.status(400).json({
            success: false,
            error
        });
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        isAdmin,
        street,
        apartment,
        zip,
        city,
        country
    } = req.body;

    try {
        const passwordHash = bcrypt.hashSync(password, 10);
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
