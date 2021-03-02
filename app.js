const app = require('./config/server')
const PORT = process.env.PORT || 8089
const routes = require('./app/routes/index')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

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
    mongoose.Promise = global.Promise
    mongoose.connect("mongodb+srv://elmoremais:guilherme2014@elmoremais.qupnx.mongodb.net/elmoremais?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Mongoose Conectado !')
    }).catch((err) => {
        console.log(`${err}`)
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