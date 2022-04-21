'use strict';

const Comment = require('../../models/Comment');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findNewsByNewsId = async (req,res) => {
    const newsId = req.query.newsid;
    validateParams(res, newsId);
    if (!StringUtils.isNullOrEmpty(newsId)) {
        const comments = await Comment.findCommentsByNewsId(newsId);
        validateCommentsdata(res, comments, 'cannot find any comments according to the given news id');
    }
}

const validateParams = (res, newsId) => {
    if (StringUtils.isNullOrEmpty(newsId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news id cannot be empty');
    }
}

const validateCommentsdata = (res, comments, message) => {
    if (ListUtils.isNullOrEmpty(comments[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, comments);
    }
}


module.exports = {
    findNewsByNewsId
}