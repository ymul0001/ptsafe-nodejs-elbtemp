'use strict';

const status = {
    SUCCESS: 200,
    CREATED: 201,
    DELETE_SUCCESS: 204,
    UPDATE_SUCCESS: 204,
    BAD_REQUEST_EXCEPTION: 400,
    DATA_NOT_FOUND_EXCEPTION: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_EXCEPTION: 500,
};

module.exports =  {
    status
}