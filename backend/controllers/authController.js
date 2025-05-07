const { createUser, getUserByEmail } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { responseMessages } = require('../utils/constants');
const {successResponse, errorResponse} = require('../utils/response');

const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION 
const JWT_SECRET = process.env.JWT_SECRET


const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return errorResponse(res, responseMessages.GENERAL.MISSING_FIELDS, 400);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse(res, responseMessages.AUTH.INVALID_CREDENTIALS, 400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            errorResponse(res, responseMessages.AUTH.USER_EXISTS, 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(email, hashedPassword);
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        successResponse(res, responseMessages.AUTH.REGISTER_SUCCESS, { token, user: { id: user._id, email: user.email } });
        
    } catch (error) {
        errorResponse(res, responseMessages.GENERAL.SERVER_ERROR, 500);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return errorResponse(res, responseMessages.AUTH.INVALID_CREDENTIALS, 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return errorResponse(res, responseMessages.AUTH.INVALID_CREDENTIALS, 401);
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        successResponse(res, responseMessages.AUTH.LOGIN_SUCCESS, { token, user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        errorResponse(res, responseMessages.GENERAL.SERVER_ERROR, 500);
    }
}


module.exports = {
    register,
    login,
};