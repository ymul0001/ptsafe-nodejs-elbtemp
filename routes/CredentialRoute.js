'use strict';

const express = require('express');
const router = express.Router();
const findCredentialByUserNameAndPasswordController = require('../controllers/CredentialController/FindCredentialByUsernameAndPasswordController');

router.get(`/findByUserNameAndPassword`, findCredentialByUserNameAndPasswordController.findCredentialByUserNameAndPassword);

module.exports = router;