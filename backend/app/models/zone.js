'use strict';

const BaseModel = require('./base');

class ZoneModel extends BaseModel {

    constructor() {
        super();

        this.name = 'zone';

        this.schemaObject = {
            name: {type: String, required: true},
            domId: {type: String},
            type: {type: String, required: true, index: true, enum: ['work', 'art', 'sport', 'free']}
        };

        this.responseFields = ['id', 'name', 'domId', 'type'];

        this.writableFields = ['name', 'domId', 'type'];
    }
}

const instance = new ZoneModel();

instance.bootstrap();

module.exports = instance;