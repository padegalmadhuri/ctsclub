const express=require('express');
const router=express.Router();
const path=require('path');
var app=express();


router.get('/',(req,res)=>res.render('home'));



module.exports=router;
