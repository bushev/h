'use strict';

const BaseModel = require('./base');
const mongoose  = require('mongoose');

class EventModel extends BaseModel {

    constructor() {
        super();

        this.name = 'event';

        this.schemaObject = {
            name: {type: String, required: true},
            dateBegin: {type: Date, index: true},
            dateEnd: {type: Date, index: true},
            price: {type: String},
            ageLimit: {type: String},
            website: {type: String},
            type: {type: String},
            description: {type: String},
            image: {type: String},
            status: {type: String, required: true, index: true, enum: ['listed', 'unlisted']},
            place: {type: 'ObjectId', ref: 'place', autopopulate: true}
        };

        this.responseFields = [
            'id', 'name', 'dateBegin', 'dateEnd', 'price', 'ageLimit', 'website', 'type', 'description', 'image',
            'status', 'place'
        ];

        this.writableFields = [
            'name', 'dateBegin', 'dateEnd', 'price', 'ageLimit', 'website', 'type', 'description', 'image',
            'status', 'place'
        ];
    }
}

const instance = new EventModel();

instance.bootstrap();

module.exports = instance;