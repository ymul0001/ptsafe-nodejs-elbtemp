'use strict';

const Credential = require('../../models/Credential');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');
const crypto = require('crypto');

const findCredentialByUserNameAndPassword = async (req,res) => {
    const userName = req.query.username;
    const rawPassword = req.query.password;
    console.log(userName);
    console.log(rawPassword);
    validateLoginParams(res, userName, rawPassword);
    if (userName != undefined && rawPassword != undefined) {
        const password = crypto.createHash('md5').update(rawPassword).digest('hex');
        const credentials = await Credential.findCredentialByUserNameAndPassword(userName, password);
        validateCredentialsData(res, credentials, 'cannot find any credentials according to the given username and password');
    }
}

const validateLoginParams = (res, userName, password) => {
    if (StringUtils.isNullOrEmpty(userName) && StringUtils.isNullOrEmpty(password)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'username and password cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(userName)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'username cannot be empty');
    }
    else if (StringUtils.isNullOrEmpty(password)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'password cannot be empty');
    }
}

const validateCredentialsData = (res, credentials, message) => {
    if (ListUtils.isNullOrEmpty(credentials[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, credentials);
    }
}


module.exports = {
    findCredentialByUserNameAndPassword
}