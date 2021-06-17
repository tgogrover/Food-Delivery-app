const express= require('express');
const router=express.Router();
const mongoose =require('mongoose');
const userDetails=require('../data_Models/sign_Models');
const bcrypt=require('bcrypt');


const userDb=userDetails.find({});

const legalSign=async(req,res,next)=>{
    const email=req.body.email
    const  usedEmail= userDetails.findOne({Email:email});
    await usedEmail.exec((err,data)=>{
       
    

        if(data){
        res.status(400).json({
            Message:"Email Already exist"
        })
    }
    else{
        next();
    }

    })
   
}

router.get('/signin',(req,res)=>{




})


router.post('/signin',legalSign,async(req,res)=>{
    
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
   
    if(err){
        res.status(404).json({
            Message:"Something went wrong",
            Error:err
        })
    }
    else{
        res.status(201).json({
            Message:"Yours Data saved successfully"
        })
    }

  })




})
 module.exports=router;