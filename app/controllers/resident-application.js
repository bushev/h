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

    async get() {

        const item = await this.model.findOne({_id: this.request.params.id});

        if (!item) {

            return this.response.status(404).json({error: 'Not found'});
        }

        this.response.status(200).json(this.refineItemForResponse(item));
    }

    async action() {

        const item = await this.model.findOne({_id: this.request.params.id});

        if (!item) {

            return this.response.status(404).json({error: 'Not found'});
        }

        if (this.request.params.action === 'approve') {

            item.status = 'approved';

        } else if (this.request.params.action === 'reject') {

            item.status = 'rejected';

        } else {

            return this.response.status(400).json({error: 'Unexpected action'});
        }

        this.response.status(200).json(this.refineItemForResponse(await item.save()));
    }
}

module.exports = (request, response, next, action) => {
    new ResidentApplicationController(request, response, next)[action]();
};
