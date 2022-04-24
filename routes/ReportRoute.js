'use strict';

const express = require('express');
const router = express.Router();
const ListStopsBasedOnRouteIdController = require('../controllers/ReportController/ListStopsBasedOnRouteIdController');
const ListRoutesBasedOnDestTypeController = require('../controllers/ReportController/ListRoutesBasedOnDestTypeController');
const ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController = require('../controllers/ReportController/ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController');
const ListAllRoutesBasedOnStopDirectionAndCurrLocationController = require('../controllers/ReportController/ListAllRoutesBasedOnStopDirectionAndCurrLocationController');
const ListNearestStopsFromCurrLocationController = require('../controllers/ReportController/ListNearestStopsFromCurrLocationController');
const ListCarriagesByDayRouteStopDepartureTimeController = require('../controllers/ReportController/ListCarriagesByDayRouteStopDepartureTimeController');
const ListCriminalActivitiesForEachCarriageController = require('../controllers/ReportController/ListCriminalActivitiesForEachCarriageController');

router.get(`/findStopsByRouteId`, ListStopsBasedOnRouteIdController.findStopsBasedOnRouteId);
router.get(`/findRoutesByDestType`, ListRoutesBasedOnDestTypeController.findRoutesBasedOnDestType);
router.get(`/findDepartureTimesByDirectionRouteIdStopId`, ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController.findDepartureTimeBasedOnDirectionRouteIdAndStopId);
router.get(`/findRoutesByStopIdDirectionCurrLocation`, ListAllRoutesBasedOnStopDirectionAndCurrLocationController.findRoutesBasedOnStopDirectionAndCurrLocation);
router.get(`/findNearestStopsByCurrLocation`, ListNearestStopsFromCurrLocationController.findNearestStopsFromCurrLocation);
router.get(`/findCarriagesByDayRouteStopDepartureTime`, ListCarriagesByDayRouteStopDepartureTimeController.findCarriagesByDayRouteStopDepartureTime);
router.get(`/findCriminalActivitiesByCarriageNumber`, ListCriminalActivitiesForEachCarriageController.findCriminalActivitiesForEachCarriage);

module.exports = router;