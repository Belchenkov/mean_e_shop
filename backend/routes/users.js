const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find()
        .select('-passwordHash');

    if (!users) {
        res.status(500).json({
            success: false,
            message: 'Cannot get list of users!'
        });
    }
    res.status(200).json({
        success: true,
        users
    });
});

router.get(`/:id`, async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Product id!'
        });
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

    const userExist = await User.find({ email });

    if (userExist.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'The user already exists!'
        });
    }

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

router.put('/:id', async (req, res) => {
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
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid User id!');
    }

    try {
        const userExist = await User.findById(id);
        const newPassword = !!password ? bcrypt.hashSync(password, 10) : userExist?.passwordHash;

        const user = await User.findByIdAndUpdate(
            id,
            {
            name,
            email,
            passwordHash: newPassword,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country
        }, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'The user cannot be updated!'
            });
        }

        res.status(201).json({
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

module.exports = router;
