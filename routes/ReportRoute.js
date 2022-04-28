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
const ListAllTripWishlistController = require('../controllers/ReportController/ListAllTripWishlistController');
const GetRecentStopRankBasedOnStopIdController = require('../controllers/ReportController/GetRecentStopRankBasedOnStopIdController');
const ListAllPaxForEachStopIdController = require('../controllers/ReportController/ListAllPaxForEachStopIdController');
const CreateCrowdednessController = require('../controllers/ReportController/CreateCrowdednessController');
const CreateTripWishlistController = require('../controllers/ReportController/AddTripWishlistController');
const DeleteTripWishlistByIdController = require('../controllers/ReportController/DeleteTripWishlistByIdController');

router.get(`/findStopsByRouteId`, ListStopsBasedOnRouteIdController.findStopsBasedOnRouteId);
router.get(`/findRoutesByDestType`, ListRoutesBasedOnDestTypeController.findRoutesBasedOnDestType);
router.get(`/findDepartureTimesByDirectionRouteIdStopId`, ListDepartureTimeBasedOnDirectionRouteIdAndStopIdController.findDepartureTimeBasedOnDirectionRouteIdAndStopId);
router.get(`/findRoutesByStopIdDirectionCurrLocation`, ListAllRoutesBasedOnStopDirectionAndCurrLocationController.findRoutesBasedOnStopDirectionAndCurrLocation);
router.get(`/findNearestStopsByCurrLocation`, ListNearestStopsFromCurrLocationController.findNearestStopsFromCurrLocation);
router.get(`/findCarriagesByDayRouteStopDepartureTime`, ListCarriagesByDayRouteStopDepartureTimeController.findCarriagesByDayRouteStopDepartureTime);
router.get(`/findCriminalActivitiesByCarriageNumber`, ListCriminalActivitiesForEachCarriageController.findCriminalActivitiesForEachCarriage);
router.get(`/findAllTripWishlist`, ListAllTripWishlistController.findAllTripWishlists);
router.get(`/findRecentStopRankByStopId`, GetRecentStopRankBasedOnStopIdController.findRecentStopRankBasedOnStopId);
router.get(`/findAllPaxForEachStopId`, ListAllPaxForEachStopIdController.findAllPaxForEachStopId);
router.post(`/create`, CreateCrowdednessController.create);
router.post(`/createTripWishlist`, CreateTripWishlistController.create);
router.delete(`/deleteTripWishlistById`, DeleteTripWishlistByIdController.deleteTripWishlistById);

module.exports = router;