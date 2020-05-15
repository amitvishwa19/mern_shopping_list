const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check for token
    if (!token) return res.status(401).json({ status: 401, message: 'No Token, authorization denied' });

    try {

        //Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' })
    }

}

module.exports = auth