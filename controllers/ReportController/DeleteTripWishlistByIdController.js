'use strict';

const Report = require('../../models/Report');
const StringUtils = require('../../commons/utils/StringUtils');
const Response = require('../../commons/responses/Response');
const StatusCode = require('../../commons/constants/StatusCode');

const deleteTripWishlistById = async (req,res) => {
    const wishlistId = req.query.wishlistid;
    validateQueryParams(res, wishlistId);
    await deleteTripWishlist(res, wishlistId);
}

const deleteTripWishlist = async (res, wishlistId) => {
    try {
        await Report.deleteTripWishlistById(wishlistId);
        return Response.returnResponse(res, StatusCode.status.DELETE_SUCCESS, `Wishlist record has been successfully deleted.`);
    }
    catch (e) {
        return Response.returnResponse(res, StatusCode.status.CONFLICT, `Encounter an error when deleting wishlist data. ${e}.`);
    }
}

const validateQueryParams = (res, wishlistId) => {
    if (StringUtils.isNullOrEmpty(wishlistId)) {
        return Response.returnResponse(res, StatusCode.status.BAD_REQUEST_EXCEPTION, 'param wishlist id cannot be empty');
    }
}

module.exports = {
    deleteTripWishlistById
}