const Router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const {eAuthenticated} = require('../helpers/eAuthenticated')
const {notAuthenticatedad} = require('../helpers/notAuthenticated')

require('../models/users')
const userM = mongoose.model('user')

require('../models/posts')
const post = mongoose.model('post')

require('../models/comentarios')
const comentario = mongoose.model('comentario')

Router.get('/cadastro', eAuthenticated, (req, res) => {
    res.render('cadastro')
})

Router.post('/cadastro', (req, res) => {
    const newuser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    
    new userM(newuser).save().then(() => {
        res.redirect('/login')
    }).catch((err) => {
        console.log(err)
    })
})

Router.get('/login', eAuthenticated, (req, res) => {
    res.render('login')
})

Router.post('/login',(req, res, next) => {
    passport.authenticate ('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next)
})

Router.get('/home', notAuthenticatedad, (req, res) => {
    post.find().sort({date: 'desc'}).then((post) => {
        comentario.find().sort({date: 'desc'}).then((comentarios) => {
            res.render('home', {posts: post, comentarios: comentarios})
        }).catch((err) => {
            console.log(err)
        })
        res.render('home', {posts: post, comentarios: eachcomentario})
    }).catch((err) => {
        console.log(err)
    })
})

Router.get('/logout',(req, res) => {
    req.logOut()
    res.redirect('/login')
})

Router.get('/user/:id', notAuthenticatedad,(req, res) => {
    const _id = req.params.id
    userM.findById({_id: _id}).then((user) => {

        post.find({origin: user.email}).then((posts) => {
            res.render('user', {posts: posts})
        }).catch((err) =>{
            console.log(err)
        })

    }).catch((err) => {
        console.log(`Erro ao achar usuario: ${err}`)
    })
})

Router.post('/post', (req, res) => {
    const newpost = {
        origin: req.body.origin,
        name: req.body.name,
        text: req.body.post
    }

    new post(newpost).save().then(() => {
        res.redirect('/home')
    }).catch((err) =>{
        console.log(err)
    })
})

Router.post('/comentarios', (req, res) => {
    const newcomentario = {
        origin: req.body.origin,
        name: req.body.name,
        text: req.body.text
    }
    new comentario(newcomentario).save().then(() => {
        res.redirect('/home')
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = Router