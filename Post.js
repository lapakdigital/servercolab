const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema)