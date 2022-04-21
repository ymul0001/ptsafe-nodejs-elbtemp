'use strict';

const News = require('../../models/News');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findAllNews = async (req,res) => {
    const news = await News.findAll();
    validateNewsData(res, news, 'cannot find any news');
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
    findAllNews
}