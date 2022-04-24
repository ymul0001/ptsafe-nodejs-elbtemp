'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');
const { v4: uuidv4 } = require('uuid');

const create = async (req,res) => {
    const crowdednessId = uuidv4();
    const stopId = req.body.stopid;
    const routeId = req.body.routeid;
    const departureTime = req.body.departuretime;
    const direction = req.body.direction;
    const day = req.body.day;
    const carriageNumber = req.body.carriagenumber;
    const crowdednessLevel = req.body.crowdednesslevel;
    const criminalActivity = req.body.criminalactivity;
    validateParams(res, stopId, routeId, departureTime, direction, day, carriageNumber, crowdednessLevel, criminalActivity);
    if (!StringUtils.isNullOrEmpty(stopId) && !StringUtils.isNullOrEmpty(routeId) && !StringUtils.isNullOrEmpty(departureTime) && !StringUtils.isNullOrEmpty(direction) && !StringUtils.isNullOrEmpty(day) && !StringUtils.isNullOrEmpty(carriageNumber) && !StringUtils.isNullOrEmpty(crowdednessLevel) && !StringUtils.isNullOrEmpty(criminalActivity)) {
        const crowdednessData = [crowdednessId, stopId, routeId, departureTime, direction, day, carriageNumber, crowdednessLevel, criminalActivity];
        await createCrowdednessData(crowdednessData, res);
    }
}

const createCrowdednessData = async (crowdednessData, res) => {
    try {
        await Report.reportCrowdedness(crowdednessData);
        return Response.returnResponse(res, StatusCode.status.CREATED, `crowdedness record has been successfully created.`);
    }
    catch (e) {
        return Response.returnResponse(res, StatusCode.status.CONFLICT, `Encounter an error when creating crowdedness data. ${e}.`);
    }
}

const validateParams = (res, stopId, routeId, departureTime, direction, day, carriageNumber, crowdednessLevel, criminalActivity) => {
    if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(routeId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'route id cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(departureTime)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'departure time cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(direction)){
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'direction cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(day)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'day cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(carriageNumber)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'carriage number cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(crowdednessLevel)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'crowdedness level cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(criminalActivity)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'criminal activity cannot be empty!');
    }
}

module.exports = {
    create
}