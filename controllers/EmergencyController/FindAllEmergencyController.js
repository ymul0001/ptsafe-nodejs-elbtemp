'use strict';

const Emergency = require('../../models/Emergency');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findAllEmergency = async (req,res) => {
    const emergency = await Emergency.findAll();
    validateEmergencyData(res, emergency, 'cannot find any emergency contact details');
}

const validateEmergencyData = (res, emergency, message) => {
    if (ListUtils.isNullOrEmpty(emergency[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, emergency);
    }
}


module.exports = {
    findAllEmergency
}