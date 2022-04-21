'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findRoutesBasedOnStopDirectionAndCurrLocation = async (req,res) => {
    const stopId = req.query.stopid;
    const directionType = req.query.directiontype;
    const lat = req.query.lat;
    const long = req.query.long;
    validateParams(res, stopId, directionType, lat, long);
    if (!StringUtils.isNullOrEmpty(stopId) && !StringUtils.isNullOrEmpty(directionType) && !StringUtils.isNullOrEmpty(lat) && !StringUtils.isNullOrEmpty(long)) {
        const routes = await Report.listAllRoutesBasedOnStopDirectionAndCurrLocation(parseInt(stopId), parseInt(directionType), parseFloat(lat), parseFloat(long));
        validateRoutesData(res, routes, 'cannot find any routes');
    }
}

const validateParams = (res, stopId, directionType, lat, long) => {
    if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(directionType)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'direction type cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(lat)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'latitude cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(long)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'longitude cannot be empty');
    }
}

const validateRoutesData = (res, routes, message) => {
    if (ListUtils.isNullOrEmpty(routes[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, routes);
    }
}


module.exports = {
    findRoutesBasedOnStopDirectionAndCurrLocation
}