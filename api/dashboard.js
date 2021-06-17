const express=require('express');
const router=express.Router();
const userDetails=require('../data_Models/sign_Models');


            

const authorization_of_User= async(req,res,next)=>{
    const email=req.body.email;
    const usersData=userDetails.findOne({Email:email});
    await usersData.exec((err,data)=>{
    var token = jwt.sign({ _id: data._id}, 'ResumeCreator',{expiresIn:'5h'})
            
    const tokenVerify=jwt.verify(token,'ResumeCreator')
    if(err) throw err;
    if(tokenVerify){
     next();   
    }
    else{
        res.status(400).json({
            Message:"Unauthorized User"
        })
    }
    })
}        


router.get('./dashboard/_id',authorization_of_User,async(req,res)=>{
    // var token = jwt.sign({ _id: data._id}, 'ResumeCreator',{expiresIn:'5h'})
    // var  userID=req.params._id
   
    //  var updatePassword=userDetails.findByIdAndUpdate(userID,{Password:req.body.Password})
    //  updatePassword.exec((err,data)=>{
    //      if(err){
    //          res.status(400).json({
    //              Message:"Something went Wrong",
    //              Error:err
    //          })
    //      }
    //      else{
    //          res.status(201).json({
    //              NewPassword:data
    //          })
    //      }

    //  })


})