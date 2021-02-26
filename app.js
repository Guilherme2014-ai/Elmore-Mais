const app = require('./config/server')
const PORT = process.env.PORT || 8089
const routes = require('./app/routes/index')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const flash = require('flash')

const passport = require('passport')
require('./config/auth')(passport)


// Session:
    app.use (session({
        secret: 'Elmore Mais',
        resave: true,
        saveUninitialized: true
}))

    app.use (passport.initialize())
    app.use (passport.session())

    app.use (flash())

// Mongoose:
    const MongoClient = require('mongodb').MongoClient
    const uri = "mongodb+srv://elmoremais:guilherme2014@elmoremais.qupnx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    client.connect(err => {
    const collection = client.db("test").collection("devices")
    // perform actions on the collection object
    client.close()
})

// Middleware:
    app.use((req, res, next) => {
        res.locals.user = req.user || null
        next()
})

app.use('/', routes)

app.listen(PORT, () => {
    console.log('Running on Port: '+PORT)
})