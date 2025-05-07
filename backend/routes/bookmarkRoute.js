const express = require('express');
const { createBookmark, getBookmarksByUserId, getBookmarksBySearch, deleteBookmark } = require('../controllers/bookmarkController');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

router.use(verifyToken); 
router.post('', createBookmark);
router.get('', getBookmarksByUserId);
router.get('/search', getBookmarksBySearch);
router.delete('/:bookmarkId', deleteBookmark);

module.exports = router;