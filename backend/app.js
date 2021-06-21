const express = require('express');
const morgan = require('morgan');

require('dotenv/config');
const app = express();

// env
const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || 'http://localhost';
const api = process.env.API_URL || '';

// middlewares
app.use(express.json());
app.use(morgan('tiny'));

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: "hair dresser",
        image: 'url'
    }
    res.send(product);
});

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;

    res.send(newProduct);
});

app.listen(PORT, () => {
    console.log(`Server is running ${HOST}:${PORT}`);
});