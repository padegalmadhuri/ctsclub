const express=require('express');
const bodyParser=require('body-parser')
const router=express.Router();
const app=express();
const mongoose=require('mongoose');
const passport =require('passport')
const jwt=require('jsonwebtoken');

var User=require('../models/user');


//login router
router.get('/login',(req,res)=>res.render('login'));
//Register Router
router.get('/register',(req,res)=>res.render('register'));



router.post('/register', function (req, res, next) {

  if (req.body.password !== req.body.cpassword) {
    var err = new Error('Password doesn\'t match!');
    err.status = 400;
    res.send('Password does match!');
    return next(err);
  }
  if (req.body.regno&&
     req.body.name &&
     req.body.password &&
     req.body.cpassword) {

     var userData = {

       regno: req.body.regno,
       name: req.body.name,
       password: req.body.password,
       cpassword: req.body.cpassword,
     }


     User.create(userData, function (error, user) {
       if (error) {
         return next(error);
       } else {
         req.session.userId = user._id;
         return res.redirect('/users/profile');
       }
     });
   }
 });

 router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h2>Your name: </h2>' + user.name + '<h2>Your regno: </h2>' + user.regno + '<br><a type="button" href="/users/logout">Logout</a>')
        }
      }
    });
 });

 router.get('/logout', function (req, res, next) {
   if (req.session) {
     // delete session object
     req.session.destroy(function (err) {
       if (err) {
         return next(err);
       } else {
         return res.redirect('/');
       }
     });
   }
 });
router.post('/login',function(req,res){
  return res.redirect('/users/profile');
})

module.exports=router;
