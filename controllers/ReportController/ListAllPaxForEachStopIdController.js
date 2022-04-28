'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findAllPaxForEachStopId = async (req,res) => {
    const stopId = req.query.stopid;
    validateParams(res, stopId);
    if (!StringUtils.isNullOrEmpty(stopId)) {
        const paxes = await Report.listAllPaxForEachStopId(stopId);
        validatePaxesdata(res, paxes, 'cannot find any paxes according to the stop id');
    }
}

const validateParams = (res, stopId) => {
    if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty');
    }
}

const validatePaxesdata = (res, paxes, message) => {
    if (ListUtils.isNullOrEmpty(paxes[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, paxes);
    }
}


module.exports = {
    findAllPaxForEachStopId
}