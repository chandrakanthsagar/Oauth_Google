const express = require('express')
const session = require('express-session')
const passport = require('passport');
require('./auth');
const app = express();
app.use(session({secret:'cats'}))
app.use(passport.initialize());
app.use(passport.session());



function isLoggedIn(req,res,next){
    req.user ?next():res.sendStatus(401);
}
app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Authentication with the Google">')
})
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile', 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/userinfo.profile']
    })
);
app.get('/profile', isLoggedIn, (req, res) => {
    res.json(req.user);
});

app.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure'
}))
app.get('/auth/failure',(req,res)=>{
  res.send("something went wrong");
})
app.get('/protected',isLoggedIn,(req,res)=>{
res.send(`Hello ${req.user.displayName}<br><br>UserEmail:${req.user.email}<br><br>ProfilePicture:${req.user.picture}<br><br>FamilyName: ${req.user.family_name}<br><br>GivenName:${req.user.given_name}`);
})
app.listen(5000,()=>{
    console.log("server listening on 5000")
})