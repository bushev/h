'use strict';

const BaseController           = require('./base');
const residentApplicationModel = require('../models/resident-application');

class ResidentApplicationController extends BaseController {

    constructor(request, response, next) {
        super(request, response, next);

        this.model = residentApplicationModel;
    }

    async create() {

        const item = await this.model.insert(this.request.body);

        this.response.status(201).json(this.refineItemForResponse(item));
    }

    async list() {

        const filters = {};
        const query   = this.request.query;

        if (query.filters) {

            if (query.filters.status) {

                filters['status'] = query.filters.status;
            }
        }

        const items = await this.model.find(filters);

        this.response.status(200).json(items.map(item => {
            return this.refineItemForResponse(item);
        }));
    }
}

module.exports = (request, response, next, action) => {
    new ResidentApplicationController(request, response, next)[action]();
};
