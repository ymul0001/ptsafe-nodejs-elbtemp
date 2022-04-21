'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findStopsBasedOnRouteId = async (req,res) => {
    const routeId = req.query.routeid;
    validateParams(res, routeId);
    if (!StringUtils.isNullOrEmpty(routeId)) {
        const stops = await Report.listStopsBasedOnRouteId(routeId);
        validateStopsdata(res, stops, 'cannot find any stops according to the given route id');
    }
}

const validateParams = (res, routeId) => {
    if (StringUtils.isNullOrEmpty(routeId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'route id cannot be empty');
    }
}

const validateStopsdata = (res, stops, message) => {
    if (ListUtils.isNullOrEmpty(stops[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, stops);
    }
}


module.exports = {
    findStopsBasedOnRouteId
}