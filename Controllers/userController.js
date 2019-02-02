const User = require('../Models/User');
const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');
const auth = require('../Services/Auth');
const Post = require('../Models/Post');
const cloud = require('../Services/cloudinary');

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

exports.login = (req, res, next) => {
    try {
        if (req.body.username == '' || req.body.username == null || req.body.password == '' || req.body.password == null) {
            return res.json({ message: 'The field(s) are required!', code: 10 });
        } else {
            User.findOne({ username: req.body.username }).exec((err, user) => {
                if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                Admin.findOne({ username: req.body.username }).exec((err, admin) => {
                    if (err) return res.json({ message: 'Error ocurred in finding this admin', code: 12 });
                    if (user) {
                        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
                        if (!checkPassword) {
                            res.json({ message: 'email or password invalid!', code: 14 });
                        } else {
                            const token = auth.getToken(user._id, user.username);
                            res.json({ message: 'You have logged in succesfully', code: 200, token: token })
                        }
                    } else if (admin) {

                    } else {
                        return res.json({ message: 'This account does not exist', code: 22 })
                    }
                })
            })
        }
    } catch (error) {
        res.json({ error: error, message: 'error ocurred', code: 19 });
    }
}

exports.userProfil = (req, res, next) => {
    const userId = req.userData.id;
    try {
        User.findOne({ _id: userId }, '-password').populate({
            path: 'post',
            options: { sort: { dateCreated: -1 }}
        }).exec((err, user) => {
            if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
            if (!user) {
                return res.json({ message: 'This user does not exist' });
            }
            res.json({ user: user, code: 200 });
        })
    } catch (error) {
        res.json({ error: error, message: 'error ocurred', code: 19 });
    }
}

exports.postAlite = (req, res, next) => {
    const userId = req.userData.id;
    const post = new Post({
        postDesc: req.body.postDesc,
        image: req.file.path || '',
        imageID: ''
    })
    try {
        if (req.body.postDesc == '' || req.body.postDesc == null) {
            return res.json({ message: 'field empty', code: 12 })
        } else {
            if (req.file.size >= 1048576) {
                return res.json({ message: 'file should not exist 1MB', code: 13 })
            } else {
                User.findOne({ _id: userId }, '-password').exec((err, user) => {
                    if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                    if (!user) {
                        return res.json({ message: 'This user does not exist', code: 23 });
                    }
                    cloud.upload(req.file.path).then(result => {
                        post.image = result.url;
                        post.imageID = result.Id;
                        Post.create(post, (err, post) => {
                            if (err) return res.json({ message: 'Error ocurred in finding this post', code: 16 });
                            if (!post) {
                                return res.json({ message: 'Error ocurred in creating this post', code: 18 });
                            }
                            user.post.push(post._id);
                            user.save();
                            return res.json({ message: 'Post created successfully', code: 200 });
                        })
                    })
                })
            }
        }
    }
    catch (error) {
        res.json({ error: error, message: 'error ocurred', code: 19 });
    }
}