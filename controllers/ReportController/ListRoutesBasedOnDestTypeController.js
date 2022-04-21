'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findRoutesBasedOnDestType = async (req,res) => {
    const destinationType = req.query.destinationtype;
    validateParams(res, destinationType);
    if (!StringUtils.isNullOrEmpty(destinationType)) {
        const routes = await Report.listRoutesBasedOnDestType(parseInt(destinationType));
        validateRoutesdata(res, routes, 'cannot find any routes according to the given destination type');
    }
}

const validateParams = (res, destinationType) => {
    if (StringUtils.isNullOrEmpty(destinationType)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'destination type cannot be empty');
    }
}

const validateRoutesdata = (res, routes, message) => {
    if (ListUtils.isNullOrEmpty(routes[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, routes);
    }
}


module.exports = {
    findRoutesBasedOnDestType
}