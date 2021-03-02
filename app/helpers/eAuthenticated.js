module.exports = {
    eAuthenticated: (req, res, next) => {
            if(req.isAuthenticated()){
                res.redirect('/home')
            }else{
                next()
            }
        }
}
