const User = require('../Models/User');

exports.getAllUser = (req, res, next) => {
    try {
        User.find().exec((err, users) => {
            if (err) return res.json({ message: 'Error occured in getting all users' })
            if (!users) {
                return res.json({ message: 'no user exist' })
            } else {
                return res.json(users);
            }
        })
    } catch (error) {
        return res.json({ error: error });
    }
}