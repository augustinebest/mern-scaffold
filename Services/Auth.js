const jwt = require('jsonwebtoken');
const User = require('../Controllers/userController');

exports.getToken = (id, username) => {
    const token = jwt.sign({
        id: id,
        username: username
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    }
    )
    return token;
}

exports.checkAuth = (req, res, next) => {
    try {
        const token = req.body.token || req.headers.authorization.split(" ")[1] || req.params.token;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth Failed!'
        })
    }
}