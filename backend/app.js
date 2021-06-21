const express = require('express');

require('dotenv/config');
const app = express();

// env
const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || 'http://localhost';
const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
    res.send('MERN E-Shop');
})

app.listen(PORT, () => {
    console.log(`Server is running ${HOST}:${PORT}`);
});