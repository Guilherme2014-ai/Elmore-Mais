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
        secret: 'curso de node',
        resave: true,
        saveUninitialized: true
}))

    app.use (passport.initialize())
    app.use (passport.session())

    app.use (flash())

// Mongoose:
    mongoose.connect('mongodb://localhost:27017/elmoremais',{
        useUnifiedTopology: true,
        useNewUrlParser: true
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