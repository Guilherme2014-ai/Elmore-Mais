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
    }
})

mongoose.model('comentario', comentario)