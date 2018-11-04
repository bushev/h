'use strict';

const BaseController = require('./base');
const userModel      = require('../models/user');

class ResidentController extends BaseController {

    constructor(request, response, next) {
        super(request, response, next);

        this.model = userModel;
    }

    getItemFromRequest() {

        return {
            ...super.getItemFromRequest(),
            ...{type: 'resident'}
        }
    }

    getListFilters() {

        const filters = {
            type: 'resident'
        };

        const query = this.request.query;

        if (query.filters) {

            if (query.filters.email) {

                filters['email'] = query.filters.email;
            }
        }

        return filters;
    }
}

module.exports = (request, response, next, action) => {
    new ResidentController(request, response, next)[action]();
};
