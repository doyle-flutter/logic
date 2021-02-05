var express = require('express'),
    app = express(),
    path = require('path'),
    session = require('express-session'),
    userDB = [
        {
            no: 1,
            email: 'user@jamesdev.com',
            pw: 'user',
            type: 'user'
        },
        {
            no: 2,
            email: 'admin@jamesdev.com',
            pw: 'admin',
            type: 'admin'
        }
    ],
    handle = (req, res) => {
        if(req.originalUrl === '/user' || req.originalUrl === '/admin'){
            if(req.session.check === undefined || !req.session.check) return res.redirect('/');
        }
        var cid = req.body.cid;
        var cpw = req.body.cpw;
        if(cid !== undefined && cpw !== undefined){ 
            for (var i = 0; i < userDB.length; i++){
                var email = userDB[i].email;
                var pw = userDB[i].pw;
                var type = userDB[i].type;
                if(cid === email && pw === cpw){
                    if(type === 'user'){
                        req.session.check = true;
                        return res.redirect('/user');
                    }
                    if(type === 'admin'){
                        req.session.check = true;
                        return res.redirect('/admin');
                    }
                }
            }
            req.session.check = null;
            return res.redirect('/');
        }
        req.session.check = null;
        return res.sendFile(path.join(__dirname, './views/loginPage.html'));
    };
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('*', handle);
app.listen(3000, _ => console.log(3000));