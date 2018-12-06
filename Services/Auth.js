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
        // console.log('This is from the params',req.params.token)
        const token = req.body.token || req.params.token || req.headers.token || req.headers.authorization.split(" ")[1];
        // console.log('after the params token', token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log('decoded',decoded);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth Failed!',
            code: 90
        })
    }
}