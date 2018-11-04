'use strict';

const BaseModel = require('./base');
const mongoose  = require('mongoose');

class UserModel extends BaseModel {

    constructor() {
        super();

        this.name = 'user';

        this.schemaObject = {
            name: {type: String, required: true},
            email: {type: mongoose.SchemaTypes.Email, required: true, unique: true, index: true},
            type: {type: String, required: true, index: true, enum: ['manager', 'resident']}
        };

        this.responseFields = ['id', 'name', 'email', 'type'];
    }

    setupSchema() {
        super.setupSchema();

        // Add { password: String } to the schema
        this.schema.plugin(require('mongoose-bcrypt'));
    }

    async getUserForLogIn(options) {

        const {email, password} = options;

        const user = await this.findOne({email});

        if (!user) return {reason: 'E-mail not found'};

        const valid = await user.verifyPassword(password);

        if (valid) {

            return user;

        } else {

            console.log(`User password is invalid`);

            return {reason: 'Incorrect password'};
        }
    }
}

const instance = new UserModel();

instance.bootstrap();

module.exports = instance;