'use strict';

const mysqlService = require('../services/mysql');

const findCommentsByNewsId = (newsId) => {
    return mysqlService.execute(`SELECT * FROM comment WHERE news_id = '${newsId}'`);
}

const createComments = (params) => {
    return mysqlService.execute(`INSERT INTO comment (comment_id, news_id, comment_title, comment_content) VALUES (?, ?, ?, ?)`, params);
}

module.exports = {
    findCommentsByNewsId,
    createComments
}