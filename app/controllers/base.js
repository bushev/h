'use strict';

const _ = require('lodash');

class BaseController {

    constructor(request, response, next) {

        this.request  = request;
        this.response = response;
        this.next     = next;
    }

    refineItemForResponse(item) {

        if (!item) return item;

        item = item.toObject({getters: true});

        item = _.pick(item, this.model.responseFields);

        return item;
    }
}

module.exports = BaseController;