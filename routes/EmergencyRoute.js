'use strict';

const express = require('express');
const router = express.Router();
const findAllEmergencyController = require('../controllers/EmergencyController/FindAllEmergencyController');


router.get(`/findAll`, findAllEmergencyController.findAllEmergency);

module.exports = router;