const mongoose = require('mongoose')
const Schema = mongoose.Schema

const comentario = new Schema({
    origin:{
        type: String
    },
    name:{
        type: String
    },
    text: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model('comentario', comentario)