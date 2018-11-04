'use strict';

class BaseController {

    constructor(request, response, next) {

        this.request  = request;
        this.response = response;
        this.next     = next;
    }


}

module.exports = BaseController;