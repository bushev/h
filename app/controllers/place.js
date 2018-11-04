'use strict';

const BaseController = require('./base');
const placeModel     = require('../models/place');

class PlaceController extends BaseController {

    constructor(request, response, next) {
        super(request, response, next);

        this.model = placeModel;
    }
}

module.exports = (request, response, next, action) => {
    new PlaceController(request, response, next)[action]();
};
