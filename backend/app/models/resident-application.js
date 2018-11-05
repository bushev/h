'use strict';

const BaseModel = require('./base');
const mongoose  = require('mongoose');

class ResidentApplicationModel extends BaseModel {

    constructor() {
        super();

        this.name = 'resident-application';

        this.schemaObject = {
            name: {type: String, required: true},
            phone: {type: String, index: true},
            email: {type: mongoose.SchemaTypes.Email, index: true},
            description: {type: String},
            status: {type: String, required: true, index: true, enum: ['new', 'rejected', 'approved'], default: 'new'}
        };

        this.responseFields = ['id', 'name', 'phone', 'email', 'description', 'status'];

        this.writableFields = ['name', 'phone', 'email', 'description', 'status'];
    }
}

const instance = new ResidentApplicationModel();

instance.bootstrap();

module.exports = instance;