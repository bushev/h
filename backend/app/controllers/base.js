'use strict';

const _ = require('lodash');

class BaseController {

    constructor(request, response, next) {

        this.request  = request;
        this.response = response;
        this.next     = next;
    }

    async create() {

        const item = await this.model.insert(this.getItemFromRequest());

        this.response.status(201).json(this.refineItemForResponse(item));
    }

    async list() {

        const filters = this.getListFilters();

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

    async update() {

        const item = await this.model.findOne({_id: this.request.params.id});

        if (!item) {

            return this.response.status(404).json({error: 'Not found'});
        }

        for (let key in _.pick(this.request.body, this.model.writableFields)) {

            // noinspection JSUnfilteredForInLoop
            item[key] = this.request.body[key];
        }

        this.response.status(200).json(this.refineItemForResponse(await item.save()));
    }

    async delete() {

        const item = await this.model.findOne({_id: this.request.params.id});

        if (!item) {

            return this.response.status(404).json({error: 'Not found'});
        }

        await item.remove();

        this.response.status(200).end();
    }

    getListFilters() {

        return {};
    }

    getItemFromRequest() {

        return _.pick(this.request.body, this.model.writableFields);
    }

    refineItemForResponse(item) {

        if (!item) return item;

        item = item.toObject({getters: true});

        item = _.pick(item, this.model.responseFields);

        return item;
    }
}

module.exports = BaseController;