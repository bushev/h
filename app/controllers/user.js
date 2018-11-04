'use strict';

const jwt = require('jsonwebtoken');

const BaseController = require('./base');
const userModel      = require('../models/user');

class UserController extends BaseController {

    async signin() {

        const user = await userModel.getUserForLogIn(this.request.body);

        if (user.id) {

            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, 'JWT_SECRET_TOKEN_HERE');

            this.response.json({
                token
            });

        } else {

            this.response.status(400).json({
                error: user.reason
            });
        }
    }
}

module.exports = (request, response, next, action) => {
    new UserController(request, response, next)[action]();
};
