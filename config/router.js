var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')

module.exports = function(app){
   
    app.use(function(req,res,next){
        var _user = req.session.user
        app.locals.user = _user
        return next()
    })

    app.get('/home',Index.index) 
    app.post('/',Index.send)

    app.get('/',User.oauth)
    app.get('/wx/callback',User.callback)
    app.get('/user/:openid',User.showUserInfo)
}