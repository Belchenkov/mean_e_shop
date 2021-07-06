const express = require('express');
const router = express.Router();

const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

router.get(`/`, async (req, res) =>{
    const orderList = await Order.find();

    if (!orderList) {
        res.status(500).json({
            success: false,
            message: 'Cannot get list of orders!'
        });
    }
    res.status(200).json({
        success: true,
        orderList
    });
});

router.post('/', async (req, res) => {
    const {
        orderItems,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        totalPrice,
        user
    } = req.body;
    const orderItemsIdsPromise = Promise.all(orderItems.map(async item => {
        await console.log(item, 'item');
        let newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }));

    const orderItemsIds = await orderItemsIdsPromise;

    try {
        const order = new Order({
            orderItems: orderItemsIds,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice,
            user
        });

        const newOrder = await order.save();

        if (!newOrder) {
            return res.status(404).send('The order cannot be created!');
        }

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error.name + ': ' + error.message);
        return res.status(400).json({
            success: false,
            error
        });
    }
});

module.exports =router;