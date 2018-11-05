'use strict';

const BaseController = require('./base');
const zoneModel      = require('../models/zone');

class ZoneController extends BaseController {

    constructor(request, response, next) {
        super(request, response, next);

        this.model = zoneModel;
    }
}

module.exports = (request, response, next, action) => {
    new ZoneController(request, response, next)[action]();
};
