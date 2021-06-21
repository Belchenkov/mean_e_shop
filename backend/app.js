const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const app = express();

// env
const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || 'http://localhost';
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const API = process.env.API_URL;

// routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes middlewares
app.use(`${API}/products`, productsRoutes);
app.use(`${API}/categories`, categoriesRoutes);
app.use(`${API}/users`, usersRoutes);
app.use(`${API}/orders`, ordersRoutes);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME
}).then(() => {
    console.log('DB Connection is ready...')

    app.listen(PORT, () => {
        console.log(`Server is running ${HOST}:${PORT}`);
    });
}).catch(err => {
    console.log(err);
});

