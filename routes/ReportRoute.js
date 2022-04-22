'use strict';

const express = require('express');
const router = express.Router();
const ListStopsBasedOnRouteIdController = require('../controllers/ReportController/ListStopsBasedOnRouteIdController');
const ListRoutesBasedOnDestTypeController = require('../controllers/ReportController/ListRoutesBasedOnDestTypeController');
const ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController = require('../controllers/ReportController/ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController');
const ListAllRoutesBasedOnStopDirectionAndCurrLocationController = require('../controllers/ReportController/ListAllRoutesBasedOnStopDirectionAndCurrLocationController');
const ListNearestStopsFromCurrLocationController = require('../controllers/ReportController/ListNearestStopsFromCurrLocationController');

router.get(`/findStopsByRouteId`, ListStopsBasedOnRouteIdController.findStopsBasedOnRouteId);
router.get(`/findRoutesByDestType`, ListRoutesBasedOnDestTypeController.findRoutesBasedOnDestType);
router.get(`/findDepartureTimesByDirectionRouteIdStopId`, ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController.findDepartureTimeBasedOnDirectionRouteIdAndStopId);
router.get(`/findRoutesByStopIdDirectionCurrLocation`, ListAllRoutesBasedOnStopDirectionAndCurrLocationController.findRoutesBasedOnStopDirectionAndCurrLocation);
router.get(`/findNearestStopsByCurrLocation`, ListNearestStopsFromCurrLocationController.findNearestStopsFromCurrLocation);

module.exports = router;