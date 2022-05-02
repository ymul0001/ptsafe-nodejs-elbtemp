'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findCriminalActivitiesForEachCarriage = async (req,res) => {
    const carriageNumber = req.query.carriagenumber;
    const day = req.query.day;
    const routeId = req.query.routeid;
    const stopId = req.query.stopid;
    const departureTime = req.query.departuretime;
    validateParams(res, carriageNumber, day, routeId, stopId, departureTime);
    if (!StringUtils.isNullOrEmpty(carriageNumber) && !StringUtils.isNullOrEmpty(day) && !StringUtils.isNullOrEmpty(routeId) && !StringUtils.isNullOrEmpty(stopId) && !StringUtils.isNullOrEmpty(departureTime)) {
        const crimeActivities = await Report.listCriminalActivitiesForEachCarriage(parseInt(carriageNumber), day, routeId, parseInt(stopId), departureTime);
        validateCrimeActivitiesData(res, crimeActivities, 'no crime activities found');
    }
}


const validateParams = (res, carriageNumber, day, routeId, stopId, departureTime) => {
    if (StringUtils.isNullOrEmpty(carriageNumber)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'carriage number cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(day)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'day cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(routeId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'route id cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(departureTime)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'departure time cannot be empty');
    }
}

const validateCrimeActivitiesData = (res, crimeActivities, message) => {
    if (ListUtils.isNullOrEmpty(crimeActivities[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, crimeActivities);
    }
}

module.exports = {
    findCriminalActivitiesForEachCarriage
}