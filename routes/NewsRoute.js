'use strict';

const express = require('express');
const router = express.Router();
const findAllNewsController = require('../controllers/NewsController/FindAllNewsController');
const findNewsByNewsLabelController = require('../controllers/NewsController/FindNewsByNewsLabelController');
const createNewsController = require('../controllers/NewsController/CreateNewsController');

router.get(`/findAll`, findAllNewsController.findAllNews);
router.get(`/findByNewsLabel`, findNewsByNewsLabelController.findNewsByNewsLabel);
router.post(`/create`, createNewsController.create);

module.exports = router;