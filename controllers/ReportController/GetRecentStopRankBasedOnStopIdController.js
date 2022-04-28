'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findRecentStopRankBasedOnStopId = async (req,res) => {
    const stopId = req.query.stopid;
    validateParams(res, stopId);
    if (!StringUtils.isNullOrEmpty(stopId)) {
        const recentStop = await Report.getRecentStopRankBasedOnStopId(stopId);
        validateRecentStopdata(res, recentStop, 'cannot find a stop rank');
    }
}

const validateParams = (res, stopId) => {
    if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty');
    }
}

const validateRecentStopdata = (res, recentStop, message) => {
    if (ListUtils.isNullOrEmpty(recentStop[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, recentStop);
    }
}


module.exports = {
    findRecentStopRankBasedOnStopId
}