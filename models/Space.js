const mongoose = require('mongoose')

const spaceSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    type: {
        type: String,
    },
    keywords: {
        type: Array,
        default: []
    },
    description: {
        type: String
    },
    contents: {
        type: String
   },
   tel: {
        type: String,
        trim: true
   },
   site: {
        type: String,
        lowercase: true,
        trim: true
   },
   email: {
        type: String,
        lowercase: true,
        trim: true

   },
   instagram: {
        type: String,
        lowercase: true,
        trim: true
   },
   open_time: {
       type: String
   },
   closed_time: {
       type: String
   },
   rep_image: {
       type: String
   },
   images: {
       type : Array,
       default: []
   }
})

const Space = mongoose.model('Space', spaceSchema)

module.exports = { Space }