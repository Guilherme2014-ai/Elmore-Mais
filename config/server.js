const express = require('express')
const bodyparser = require('body-parser')
const app = express()

// Set:
    app.set('view engine', 'ejs')
    app.set('views', './app/views')

    app.use (express.static('./app/public'))

// Body-Parser:
    app.use(bodyparser.urlencoded({extended:true}))
    app.use(bodyparser.json())

module.exports = app