'use strict';

const Comment = require('../../models/Comment');
const StringUtils = require('../../commons/utils/StringUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');
const { v4: uuidv4 } = require('uuid');

const create = async (req,res) => {
    const commentId = uuidv4();
    const newsId = req.body.newsid;
    const commentTitle = req.body.commenttitle;
    const commentContent = req.body.commentcontent;
    console.log(commentContent);
    validateParams(res, newsId, commentTitle, commentContent);
    if (!StringUtils.isNullOrEmpty(newsId) && !StringUtils.isNullOrEmpty(commentTitle) && !StringUtils.isNullOrEmpty(commentContent)) {
        const commentData = [commentId, newsId, commentTitle, commentContent];
        await createComments(commentData, res);
    }
}

const createComments = async (commentData, res) => {
    try {
        await Comment.createComments(commentData);
        return Response.returnResponse(res, StatusCode.status.CREATED, `comment record has been successfully created.`);
    }
    catch (e) {
        return Response.returnResponse(res, StatusCode.status.CONFLICT, `Encounter an error when creating comments data. ${e}.`);
    }
}

const validateParams = (res, newsId, commentTitle, commentContent) => {
    if (StringUtils.isNullOrEmpty(newsId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'news id cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(commentTitle)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'comment title cannot be empty!');
    }
    if (StringUtils.isNullOrEmpty(commentContent)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'comment content cannot be empty!');
    }
}

module.exports = {
    create
}