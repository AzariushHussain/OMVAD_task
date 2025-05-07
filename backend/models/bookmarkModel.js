const { BookmarkModel } = require('./schemaLoader');

const createBookmarkForUser = async (userId, url, title, favicon, summary) => {
    try {
        const bookmark = new BookmarkModel({ user: userId, url, title, favicon, summary });
        await bookmark.save();
        return bookmark;
    } catch (error) {
        throw new Error('Error creating bookmark: ' + error.message);
    }
}

const getBookmarksByUser = async (userId) => {
    try {
        const bookmarks = await BookmarkModel.find({ user: userId });
        return bookmarks;
    } catch (error) {
        throw new Error('Error fetching bookmarks: ' + error.message);
    }
}

const getBookmark = async (bookmarkId) => {
    try {
        const bookmark = await BookmarkModel.findById(bookmarkId);
        if (!bookmark) {
            throw new Error('Bookmark not found');
        }
        return bookmark;
    }
    catch (error) {
        throw new Error('Error fetching bookmark: ' + error.message);
    }
}

const getBookmarkByUserandID = async (userID, urlID) => {
    try{
        const bookmark = await BookmarkModel.findOne({_id: urlID, user: userID})
        return bookmark
    } catch (error) {
        throw new Error('Error fetching bookmarks: ' + error.message);
    }
    
}

const getBookmarksByUserIdAndUrl = async (userId, url) => {
    try {
        const bookmarks = await BookmarkModel.findOne({ user: userId, url });
        console.log("already existing url found: ",bookmarks)
        return bookmarks;
    } catch (error) {
        throw new Error('Error fetching bookmarks: ' + error.message);
    }
}

const getBookmarks = async (userId, searchText) => {
    try {
        const bookmarks = await BookmarkModel.find({
            user: userId,
            $or: [
                { url: { $regex: searchText, $options: 'i' } },
                { title: { $regex: searchText, $options: 'i' } },
                { summary: { $regex: searchText, $options: 'i' } },
            ],
        });
        return bookmarks;
    } catch (error) {
        throw new Error('Error fetching bookmarks: ' + error.message);
    }
};


const updateBookmark = async (bookmarkId, updateData) => {
    try {
        const bookmark = await BookmarkModel.findByIdAndUpdate(bookmarkId, updateData, { new: true });
        if (!bookmark) {
            throw new Error('Bookmark not found');
        }
        return bookmark;
    }
    catch (error) {
        throw new Error('Error updating bookmark: ' + error.message);
    }
}

const deleteBookmarkById = async (bookmarkId) => {
    try {
        const bookmark = await BookmarkModel.findByIdAndDelete(bookmarkId);
        if (!bookmark) {
            throw new Error('Bookmark not found');
        }
        return bookmark;
    } catch (error) {
        throw new Error('Error deleting bookmark: ' + error.message);
    }
}

const deleteBookmarksByUserId = async (userId) => {
    try {
        const result = await BookmarkModel.deleteMany({ user: userId });
        return result.deletedCount;
    } catch (error) {
        throw new Error('Error deleting bookmarks: ' + error.message);
    }
}

const deleteBookmarksByUrl = async (url) => {
    try {
        const result = await BookmarkModel.deleteMany({ url });
        return result.deletedCount;
    }
    catch (error) {
        throw new Error('Error deleting bookmarks: ' + error.message);
    }
}


module.exports = {
    createBookmarkForUser,
    getBookmarksByUser,
    getBookmark,
    getBookmarksByUserIdAndUrl,
    getBookmarks,
    updateBookmark,
    deleteBookmarkById,
    deleteBookmarksByUserId,
    deleteBookmarksByUrl,
    getBookmarkByUserandID
};