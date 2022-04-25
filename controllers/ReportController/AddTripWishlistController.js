'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');
const { v4: uuidv4 } = require('uuid');

const create = async (req,res) => {
    const wishlistId = uuidv4();
    const sourceName = req.body.sourcename;
    const destinationName = req.body.destinationname;
    const stopId = req.body.stopid;
    const routeId = req.body.routeid;
    const departureTime = req.body.departuretime;
    const carriageNumber = req.body.carriagenumber;
    validateParams(res, sourceName, destinationName, stopId, routeId, departureTime, carriageNumber);
    if (!StringUtils.isNullOrEmpty(sourceName) && !StringUtils.isNullOrEmpty(destinationName) && !StringUtils.isNullOrEmpty(stopId) && !StringUtils.isNullOrEmpty(routeId) && !StringUtils.isNullOrEmpty(departureTime) && !StringUtils.isNullOrEmpty(carriageNumber)) {
        const wishlistData = [wishlistId, sourceName, destinationName, parseInt(stopId), routeId, departureTime, parseInt(carriageNumber)];
        await createWishlistData(wishlistData, res);
    }
}

const createWishlistData = async (wishlistData, res) => {
    try {
        await Report.addTripWishlist(wishlistData);
        return Response.returnResponse(res, StatusCode.status.CREATED, `wishlist record has been successfully created.`);
    }
    catch (e) {
        return Response.returnResponse(res, StatusCode.status.CONFLICT, `Encounter an error when creating wishlist data. ${e}.`);
    }
}

const validateParams = (res, sourceName, destinationName, stopId, routeId, departureTime, carriageNumber) => {
    if (StringUtils.isNullOrEmpty(sourceName)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'source name cannot be empty!');
    }
    else if (StringUtils.isNullOrEmpty(destinationName)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'destination name cannot be empty!');
    }
    else if (StringUtils.isNullOrEmpty(stopId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'stop id cannot be empty!');
    }
    else if (StringUtils.isNullOrEmpty(routeId)){
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'route id cannot be empty!');
    }
    else if (StringUtils.isNullOrEmpty(departureTime)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'departure time cannot be empty!');
    }
    else if (StringUtils.isNullOrEmpty(carriageNumber)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'carriage number cannot be empty!');
    }
}

module.exports = {
    create
}