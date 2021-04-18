const app = require('../../config/server')
const Router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const CryptoJS = require('crypto-js')
const {eAuthenticated} = require('../helpers/eAuthenticated')
const {notAuthenticatedad} = require('../helpers/notAuthenticated')

const keyHash = '2014'
app.set('keyHash', keyHash)

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
    const Hash = CryptoJS.AES.encrypt(req.body.password, keyHash).toString()

    const newuser = {
        name: req.body.name,
        email: req.body.email,
        password: Hash
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

Router.post('/result', (req, res) => {
    const name = req.body.name

    
    userM.find({name: name}).then((name) => {
        res.render('result', {result: name})
    })
})

Router.get('/perfil/:id', (req, res) => {
    userM.findById(req.params.id).then((user) => {
        post.find({origin: user.email}).then((posts) => {
            res.render('search', {userM: user, posts: posts})
        })
    })
})

module.exports = Router