'use strict';

const News = require('../../models/News');
const StringUtils = require('../../commons/utils/StringUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');
const { v4: uuidv4 } = require('uuid');

const create = async (req,res) => {
    const newsId = uuidv4();
    const newsTitle = req.body.newstitle;
    const newsLabel = req.body.newslabel;
    const newsContent = req.body.newscontent;
    const imageUrl = req.body.imageurl;
    const newsUrl = req.body.newsurl;
    validateParams(res, newsTitle, newsLabel, newsContent, imageUrl, newsUrl);
    if (!StringUtils.isNullOrEmpty(newsTitle) && !StringUtils.isNullOrEmpty(newsLabel) && !StringUtils.isNullOrEmpty(newsContent) && !StringUtils.isNullOrEmpty(imageUrl) && !StringUtils.isNullOrEmpty(newsUrl)) {
        const newsData = [newsId, newsTitle, newsLabel, newsContent, imageUrl, newsUrl];
        await createNews(newsData, res);
    }
}

const createNews = async (newsData, res) => {
    try {
        await News.createNews(newsData);
        return Response.returnResponse(res, StatusCode.status.CREATED, `news record has been successfully created.`);
    }
    catch (e) {
        return Response.returnResponse(res, StatusCode.status.CONFLICT, `Encounter an error when creating news data. ${e}.`);
    }
}

const validateParams = (res, newsTitle, newsLabel, newsContent, imageUrl, newsUrl) => {
    if (StringUtils.isNullOrEmpty(newsTitle)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news title cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(newsLabel)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news label cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(newsContent)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news content cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(imageUrl)){
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'image url cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(newsUrl)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news url cannot be empty!');
    }
}

module.exports = {
    create
}