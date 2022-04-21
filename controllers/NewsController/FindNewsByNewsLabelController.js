'use strict';

const News = require('../../models/News');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findNewsByNewsLabel = async (req,res) => {
    const newsLabel = req.query.newslabel;
    validateParams(res, newsLabel);
    if (!StringUtils.isNullOrEmpty(newsLabel)) {
        const news = await News.findNewsByNewsLabel(newsLabel);
        validateNewsData(res, news, 'cannot find any news according to the given news label');
    }
}

const validateParams = (res, newsLabel) => {
    if (StringUtils.isNullOrEmpty(newsLabel)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news label cannot be empty');
    }
}

const validateNewsData = (res, news, message) => {
    if (ListUtils.isNullOrEmpty(news[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, news);
    } 
}


module.exports = {
    findNewsByNewsLabel
}