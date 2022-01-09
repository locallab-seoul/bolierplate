const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    type: {
        type: String
    },
    rep_image: {
        type: String
    },
    title: {
        type: String,
        maxlength: 50
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: String,
        default: Date.now
    },
    start_time: {
        type: Date,
        default: Date.now
    },
    end_time: {
        type: Date,
        default: Date.now
    },
    price: {
        type: String
    },
    address: {
        type: String
    },
    howto: {
        thpe: String
    },
    contents: {
        type: String
    },
    keywords: {
        type: Array,
        default: []
    }

})

const News = mongoose.model('News', newsSchema)
module.exports = { News }