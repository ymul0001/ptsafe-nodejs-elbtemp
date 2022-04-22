'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findNearestStopsFromCurrLocation = async (req,res) => {
    const lat = req.query.lat;
    const long = req.query.long;
    validateParams(res, lat, long);
    if (!StringUtils.isNullOrEmpty(lat) && !StringUtils.isNullOrEmpty(long)) {
        const stops = await Report.listNearestStopsFromCurrLocation(parseFloat(lat), parseFloat(long));
        validateStopsdata(res, stops, 'cannot find any stops according to the current location');
    }
}

const validateParams = (res, lat, long) => {
    if (StringUtils.isNullOrEmpty(lat)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'latitude cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(long)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'longitude cannot be empty');
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
    findNearestStopsFromCurrLocation
}