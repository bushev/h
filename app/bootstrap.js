'use strict';

const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');

require('express-async-errors');

const userModel = require('./models/user');

const userController = require('./controllers/user');

const PORT = 3000;

class Loader {

    async bootstrap() {

        await this.initDatabase();

        this.initHttp();
    }

    async initDatabase() {

        try {
            await mongoose.connect('mongodb://127.0.0.1/h', {useNewUrlParser: true});
        } catch (e) {
            console.log(e);
        }

        console.log(`MongoDB connected`);

        // Add super manager account
        await this.addSuperManager();
    }

    initHttp() {

        const app = express();

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        app.post('/signin', (request, response, next) => userController(request, response, next, 'signin'));

        app.use((err, req, res, next) => {

            console.error(err.stack);

            res.status(500).send({
                error: err.message // TODO: Dev env only
            });
        });

        app.listen(PORT, () => console.log(`H app listening on port ${PORT}!`));
    }

    async addSuperManager() {

        const superManagerData = {
            name: 'Super Manager',
            email: 'super-manager@h.com',
            password: 'SUPER_PASSWORD',
            type: 'manager'
        };

        if (await userModel.count({email: superManagerData.email}) === 0) {

            await userModel.insert(superManagerData);
        }
    }
}

const loader = new Loader();

loader.bootstrap();
