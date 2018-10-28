'use strict';

const express  = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const PORT = 3000;

class Loader {

    async bootstrap() {

        await this.initDatabase();

        this.initHttp();
    }

    async initDatabase() {

        try {
            await mongoose.connect('mongodb://h:my_password@127.0.0.1/h?authSource=admin', {useNewUrlParser: true});
        } catch (e) {
            console.log(e);
        }

        console.log(`MongoDB connected`);
    }

    initHttp() {

        const app = express();


        app.get('/', async (req, res, next) => {

            const a = d + 0;

            res.send('hello world');
        });

        app.use((err, req, res, next) => {

            console.error(err.stack);

            res.status(500).send('Something broke!');
        });

        app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
    }
}

const loader = new Loader();

loader.bootstrap();
