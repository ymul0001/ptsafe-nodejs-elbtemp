'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findDepartureTimeBasedOnDirectionRouteIdAndStopId = async (req,res) => {
    const directionType = req.query.directiontype;
    const routeId = req.query.routeid;
    const stopId = req.query.stopid;
    validateParams(res, directionType, routeId, stopId);
    if (!StringUtils.isNullOrEmpty(directionType) && !StringUtils.isNullOrEmpty(routeId) && !StringUtils.isNullOrEmpty(stopId)) {
        const departureTimes = await Report.listDepartureTimeBasedOnDirectionRouteIdAndStopId(parseInt(directionType), routeId, parseInt(stopId));
        validateDepartureTimesData(res, departureTimes, 'cannot find any departure times');
    }
}

const validateParams = (res, directionType, routeId, stopId) => {
    if (StringUtils.isNullOrEmpty(directionType)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'direction type cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(routeId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'route id cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty');
    }
}

const validateDepartureTimesData = (res, departureTimes, message) => {
    if (ListUtils.isNullOrEmpty(departureTimes[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, departureTimes);
    }
}


module.exports = {
    findDepartureTimeBasedOnDirectionRouteIdAndStopId
}