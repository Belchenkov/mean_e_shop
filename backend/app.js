const express = require('express');

const app = express();

const PORT = 3005;
const HOST = 'http://localhost';

app.get('/', (req, res) => {
    res.send('MERN E-Shop');
})

app.listen(PORT, () => {
    console.log(`Server is running ${HOST}:${PORT}`);
});