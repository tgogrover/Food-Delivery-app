const express= require('express');
const router=express.Router();
const mongoose =require('mongoose');
const userDetails=require('../data_Models/sign_Models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const userDb=userDetails.find({});

const legalSign=async(req,res,next)=>{
    const email=req.body.email
    const  usedEmail= userDetails.findOne({Email:email});
    await usedEmail.exec((err,data)=>{
        if(err) throw err;


        if(data){
        res.render('signIn',{ Message: "Email Already exist" , title: "Resume Creator" })
    }
    else{
        next();
    }

    })
   
}

router.get('/tesignin',(req,res)=>{
    var loginUser=localStorage.getItem('loginEmail');
    if(loginUser){
        res.redirect('./teDashboard')
    }
    else{
res.render('signIn',{ Message: "" , title: "Resume Creator" })
    }

})


router.post('/tesignin',legalSign,async(req,res)=>{

    
 const name=req.body.name;
 const email=req.body.email;
 const qualification=req.body.qualification;
 const startYear=req.body.startYear;
 const endingYear=req.body.endingYear;
 const password=req.body.password;
 const Hash_Password=bcrypt.hashSync(password,10);
 
 const userData=new userDetails({
     Name:name,
     Email:email,
     Graduation_starts_in_year:startYear,
     Graduation_completes_in_year:endingYear,
     Qualification:qualification,
     Password:Hash_Password
 })

  await userData.save((err,Data)=>{
   
    if(err) throw err;
    
    else{
        res.render('signIn',{ Message: "Yours Data saved successfully" , title:"Resume Creator"})
    }

  })




})
 module.exports=router;