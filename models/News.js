'use strict';

const mysqlService = require('../services/mysql');

const findAll = () => {
    return mysqlService.execute(`SELECT * FROM news`);
}

const findNewsByNewsLabel = (newsLabel) => {
    return mysqlService.execute(`SELECT * FROM news WHERE news_label LIKE '${newsLabel}'`)
}

const createNews = (params) => {
    return mysqlService.execute(`INSERT INTO news (news_id, news_title, news_label, news_content, image_url, news_url) VALUES (?, ?, ?, ?, ?, ?)`, params);
}
 
module.exports = {
    findAll,
    findNewsByNewsLabel,
    createNews
}