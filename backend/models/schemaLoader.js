const mongoose = require('mongoose');
const userSchema = require('./schemas/userSchema');
const bookmarkSchema = require('./schemas/bookmarkSchema');

const UserModel = mongoose.model('User', userSchema);
const BookmarkModel = mongoose.model('Bookmark', bookmarkSchema);

module.exports = {
    UserModel,
    BookmarkModel,
};