const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    try {
        if (req.body.username == '' || req.body.username == null || req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null || req.body.confirmPassword == '' || req.body.confirmPassword == null) {
            return res.json({ message: 'The field(s) are required', code: 10 });
        } else {
            User.findOne({ email: req.body.email } || { username: req.body.username }).exec((err, user) => {
                if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                User.findOne({ username: req.body.username }).exec((err, user2) => {
                    if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                    if (user2) {
                        return res.json({ message: 'The user already exist', code: 12 });
                    } else {
                        if (user) {
                            return res.json({ message: 'The email already exist', code: 12 });
                        }
                        else {
                            if (req.body.username.length < 3) {
                                return res.json({ message: 'The username should contain at least 3 characters', code: 13 });
                            } else {
                                if (req.body.password.length < 6) {
                                    return res.json({ message: 'The password should contain at least 6 characters', code: 16 });
                                } else {
                                    if (req.body.password !== req.body.confirmPassword) {
                                        return res.json({ message: 'The password does not match', code: 17 });
                                    } else {
                                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                                            if (err) res.json(err);
                                            else {
                                                const user = {
                                                    username: req.body.username,
                                                    email: req.body.email,
                                                    password: hash
                                                };
                                                User.create(user, (err, result) => {
                                                    if (err) return res.status(303).json({ err: err })
                                                    res.json({ message: 'This user have been added successfully!', code: 200 });
                                                })
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
            })
        }
    } catch (error) {
        res.json({ error: error, message: 'error ocurred', code: 19 });
    }
}

exports.checkForUsername = (req, res, next) => {
    try {
        User.findOne({ username: req.body.username }).exec((err, user) => {
            if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
            if (!user) {
                return res.json({ message: 'This username is available', code: 12 });
            }
            return res.json({ message: 'The user already exist', code: 200 });
        })
    } catch (error) {
        res.json({ error: error, message: 'error ocurred', code: 19 });
    }
}