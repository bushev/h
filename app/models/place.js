'use strict';

const BaseModel = require('./base');
const mongoose  = require('mongoose');

class PlaceModel extends BaseModel {

    constructor() {
        super();

        this.name = 'place';

        this.schemaObject = {
            name: {type: String, required: true},
            openHours: {type: String},
            type: {type: String, required: true, index: true, enum: ['eat', 'exhibition', 'art', 'sport', 'free']},
            zone: {type: 'ObjectId', ref: 'zone', autopopulate: true},
            resident: {type: 'ObjectId', ref: 'user', autopopulate: true}
        };

        this.responseFields = ['id', 'name', 'openHours', 'type', 'zone', 'resident'];

        this.writableFields = ['name', 'openHours', 'type', 'zone', 'resident'];
    }
}

const instance = new PlaceModel();

instance.bootstrap();

module.exports = instance;