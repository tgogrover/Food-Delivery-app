const express=require('express');
const router=express.Router();
const userDetails=require('../data_Models/sign_Models');
const jwt=require('jsonwebtoken');

const authorization_of_User= (req,res,next)=>{
    // var email=req.body.email;
    var validToken=localStorage.getItem('loginToken');
    var tokenVerify=jwt.verify(validToken,'ResumeCreator');

    // const usersData=userDetails.findOne({Email:email});
    // await usersData.exec((err,data)=>{
    // var token = jwt.sign({ _id: data._id}, 'ResumeCreator',{expiresIn:'5h'})
            
    // const tokenVerify=jwt.verify(token,'ResumeCreator')
    
    if(tokenVerify){
     next();   
    }
    else{
        res.render('login',{ Message: "UnAuthorized User", title: 'Resume Creator' })
      
    }
    // })
}


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }





router.get('/teDashboard',authorization_of_User,async(req,res)=>{
    var loginUser=localStorage.getItem('loginEmail');
    // var token = jwt.sign({ _id: data._id}, 'ResumeCreator',{expiresIn:'5h'})
         
    // var decodeToken=jwt.decode(token);
    // var userID=decodeToken._id;
    var usersData=userDetails.find({Email:loginUser})
    await usersData.exec((err,data)=>{
     if(err) throw err;

    if(data){

    res.render('dashboard',{title:'Resume Creator',Your_Email:loginUser,Authorized_User:loginUser,Message:""})
    }
  
 })


})



  module.exports=router;













































module.exports=router;