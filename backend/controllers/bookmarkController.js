const { createBookmarkForUser, getBookmarksByUser, getBookmarkByUserandID, getBookmarksByUserIdAndUrl, getBookmarks, updateBookmark, deleteBookmarkById } = require('../models/bookmarkModel');
const { successResponse, errorResponse } = require('../utils/response');
const { responseMessages, constants } = require('../utils/constants');
const axios = require('axios');
const cheerio = require('cheerio');


const createBookmark = async (req, res) => {
    const { url } = req.body;
    console.log("received request :", url)
    const userId = req.user.id;
    try {
        if (!url) {
            return errorResponse(res, responseMessages.GENERAL.MISSING_FIELDS, 400);
        }
        const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
        if (!urlRegex.test(url)) {
            return errorResponse(res, responseMessages.BOOKMARK.INVALID_URL, 400);
        }

        const existingBookmark = await getBookmarksByUserIdAndUrl(userId, url) 
        if (existingBookmark) {
            console.log("inside bookmarks exists.")
            errorResponse(res, responseMessages.BOOKMARK.BOOKMARK_EXISTS, 400)
        }
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let title = $('meta[property="og:title"]').attr('content') || $('title').text() || url;
        let favicon =
            $('link[rel="icon"]').attr('href') ||
            $('link[rel="shortcut icon"]').attr('href') ||
            null;

        // Resolve relative favicon
        if (favicon && !favicon.startsWith('http')) {
            const u = new URL(url);
            favicon = `${u.protocol}//${u.host}${favicon}`;
        }

        // Call Jina AI
        const jinaRes = await axios.get(`https://r.jina.ai/${url}`);
        const summary = jinaRes.data?.trim().slice(0, 100) || 'No summary available';

        const bookmark = await createBookmarkForUser(userId, url, title, favicon, summary);
        successResponse(res, responseMessages.BOOKMARK.CREATE_SUCCESS, bookmark);
    } catch (error) {
        console.log(error)
        errorResponse(res, responseMessages.GENERAL.SERVER_ERROR, 500);
    }
}

const getBookmarksByUserId = async (req, res) => {
    const userId = req.user.id;
    try {
        const bookmarks = await getBookmarksByUser(userId);
        successResponse(res, responseMessages.BOOKMARK.FETCH_SUCCESS, bookmarks);
    } catch (error) {
        errorResponse(res, responseMessages.GENERAL.SERVER_ERROR, 500);
    }
}


const getBookmarksBySearch = async (req, res) => {
    const userId = req.user.id;
    const { searchText } = req.query;
    try {
        const bookmarks = await getBookmarks(userId, searchText);
        successResponse(res, responseMessages.BOOKMARK.FETCH_SUCCESS, bookmarks);
    } catch (error) {
        errorResponse(res, responseMessages.GENERAL.SERVER_ERROR, 500);
    }
}


const deleteBookmark = async (req, res) => {
    const userId = req.user.id;
    const { bookmarkId } = req.params;
    console.log("delete bookmark: ", bookmarkId)
    try {
        const bookmark = await getBookmarkByUserandID(userId, bookmarkId);
        if (!bookmark) {
            return errorResponse(res, responseMessages.BOOKMARK.NOT_FOUND, 404);
        }
        await deleteBookmarkById(bookmarkId);
        successResponse(res, responseMessages.BOOKMARK.DELETE_SUCCESS, null);
    } catch (error) {
        console.log("delete ereor:", error)
        errorResponse(res, responseMessages.GENERAL.SERVER_ERROR, 500);
    }
}

module.exports = {
    createBookmark,
    getBookmarksByUserId,
    getBookmarksBySearch,
    deleteBookmark,
};