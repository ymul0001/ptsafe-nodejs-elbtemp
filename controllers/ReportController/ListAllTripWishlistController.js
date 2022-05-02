'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const ListUtils = require('../../commons/utils/ListUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const findAllTripWishlists = async (req,res) => {
    const tripWishlist = await Report.listAllTripWishlist();
    validateTripWishlistData(res, tripWishlist, 'cannot find any trip wishlist');
}

const validateTripWishlistData = (res, tripWishlist, message) => {
    if (ListUtils.isNullOrEmpty(tripWishlist[0])) {
        return Response.returnResponse(res, StatusCode.status.DATA_NOT_FOUND_EXCEPTION, message);
    }
    else {
        return Response.returnResponse(res, StatusCode.status.SUCCESS, tripWishlist);
    }
   
}


module.exports = {
    findAllTripWishlists
}