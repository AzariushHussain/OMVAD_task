const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoute');
const bookmarkRoutes = require('./bookmarkRoute');

router.use('/auth', authRoutes);
router.use('/bookmarks', bookmarkRoutes);

module.exports = router;