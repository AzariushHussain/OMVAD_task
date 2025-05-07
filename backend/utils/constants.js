const constants = {
    bool: {
        TRUE: true,
        FALSE: false,
    },
    operation: {
        status: {
            SUCCESS: 'success',
            FAILED: 'failed',
        }
    },
    user: {
        status: {
            ACTIVE: 'active',
            INACTIVE: 'inactive',
        },
        default: {
            about: 'I am saving bookmarks!',
        }
    },
    bookmark: {
        status: {
            SAVED: 'saved',
            DELETED: 'deleted',
            FAILED: 'failed',
        },
        meta: {
            DEFAULT_TITLE: 'Untitled Bookmark',
            DEFAULT_SUMMARY: 'No summary available',
            DEFAULT_FAVICON: '/favicon.ico',
        }
    },
    auth: {
        status: {
            AUTHENTICATED: 'authenticated',
            UNAUTHENTICATED: 'unauthenticated',
        },
    }
};

const responseMessages = {
    AUTH: {
        REGISTER_SUCCESS: 'Registration successful.',
        LOGIN_SUCCESS: 'Login successful.',
        INVALID_CREDENTIALS: 'Invalid email or password.',
        USER_EXISTS: 'User already exists.',
        UNAUTHORIZED: 'Unauthorized access.',
    },
    BOOKMARK: {
        SAVE_SUCCESS: 'Bookmark saved successfully.',
        SAVE_FAILED: 'Failed to save bookmark.',
        DELETE_SUCCESS: 'Bookmark deleted successfully.',
        DELETE_FAILED: 'Failed to delete bookmark.',
        FETCH_FAILED: 'Failed to fetch bookmarks.',
        BOOKMARK_EXISTS: 'Bookmark already exists.',
        INVALID_URL: 'Invalid URL format.',
    },
    GENERAL: {
        SERVER_ERROR: 'An unexpected error occurred.',
        MISSING_FIELDS: 'Required fields are missing.',
    },
    TOKEN: {
        EXPIRED: 'Token has expired.',
        INVALID: 'Invalid token.',
        NOT_FOUND: 'Token not found.',
    },
};

module.exports = { responseMessages, constants };
