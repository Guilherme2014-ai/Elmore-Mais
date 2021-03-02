module.exports = {
    notAuthenticatedad: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('/login')
        }
    }
}