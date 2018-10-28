'use strict';

const express = require('express');
require('express-async-errors');
const app = express();

const PORT = 3000;

app.get('/', async (req, res, next) => {

    const a = d + 0;

    res.send('hello world');
});

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));