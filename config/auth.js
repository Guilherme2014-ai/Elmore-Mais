const app = require('./server')
const CryptoJS = require('crypto-js')
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')

const keyHash = app.get('keyHash')

require('../app/models/users')
const user = mongoose.model('user')

module.exports = (passport) => {
    passport.use (new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        user.findOne({email: email}).then((user) => {
            const Decrypt = CryptoJS.AES.decrypt(user.password, keyHash).toString(CryptoJS.enc.Utf8)

            if(password == Decrypt){
                return done(null, user, {message: 'Cadastrado Com Sucesso !'})
            }
            if(password != Decrypt){
                return done(null, false, {message: 'Senha Incorreta !'})
            }
            else{
                return done(null, false, {message: 'Esta Conta Nao Existe !'})
            }
        })
    }))

    passport.serializeUser((user,done) => {
        done(null, user)
    })

    passport.deserializeUser((id, done) => {
        user.findById(id, (erro, user) => {
            done(erro, user)
        })
    })

}
