'use strict';

const BaseController = require('./base');
const eventModel     = require('../models/event');

class EventController extends BaseController {

    constructor(request, response, next) {
        super(request, response, next);

        this.model = eventModel;
    }

    getItemFromRequest() {

        const item = super.getItemFromRequest();

        if (!item.images) item.images = [];

        return item;
    }
}

module.exports = (request, response, next, action) => {
    new EventController(request, response, next)[action]();
};
