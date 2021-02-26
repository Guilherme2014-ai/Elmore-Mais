const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = new Schema ({
    origin:{
        type: String
    },
    name:{
        type: String
    },
    text:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
})
mongoose.model('post', post)