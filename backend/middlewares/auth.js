const jwt = require('jsonwebtoken');
const  { responseMessages } = require('../utils/constants');

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];
    console.log('token:',token);
    if (!token) {
        const message = responseMessages.TOKEN.NOT_FOUND;
        return res.status(401).json({ message});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log('decoded:',decoded);
        next();
    }
    catch (err) {
        const message = responseMessages.TOKEN.INVALID
        console.log('inside error messsage:',message);
        res.status(400).json({ message });
    }
};

module.exports = verifyToken;