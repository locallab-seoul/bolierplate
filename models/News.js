const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    contents: {
        type: String
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    price: {
        type: String
    },
    address: {
        type: String
    },
    url: {
        type: String,
        lowercase: true,
        trim: true
    }
})

const News = mongoose.model('News', newsSchema)
module.exports = { News }