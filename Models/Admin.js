const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Admin', adminSchema);