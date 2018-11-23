'use strict';

module.exports = function (request, response, err) {

    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        return response.response({ 'invalid_item': err.details[0] })
            .code(400)
            .takeover();
    }

    return response.response(err)
        .takeover();
};
