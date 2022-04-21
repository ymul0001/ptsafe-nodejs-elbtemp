'use strict';

const express = require('express');
const router = express.Router();
const findCommentsByNewsIdController = require('../controllers/CommentController/FindCommentsByNewsIdController');
const createCommentsController = require('../controllers/CommentController/CreateCommentsController');

router.get(`/findByNewsId`, findCommentsByNewsIdController.findNewsByNewsId);
router.post(`/create`, createCommentsController.create);

module.exports = router;