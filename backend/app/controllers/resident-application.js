'use strict';

const BaseController           = require('./base');
const residentApplicationModel = require('../models/resident-application');

class ResidentApplicationController extends BaseController {

    constructor(request, response, next) {
        super(request, response, next);

        this.model = residentApplicationModel;
    }

    getListFilters() {

        const filters = {};
        const query   = this.request.query;

        if (query.filters) {

            if (query.filters.status) {

                filters['status'] = query.filters.status;
            }
        }

        return filters;
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
