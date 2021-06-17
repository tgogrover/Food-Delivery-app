const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const userDetails=require('../data_Models/sign_Models');
const jwt=require('jsonwebtoken');




if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }


const legalLogin=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    const legalEmail=userDetails.findOne({Email:email});
    await legalEmail.exec((err,data)=>{
        if(err){
            console.log(err)
            res.status(400).json({
                Message:"Something went wrong",
            })
        }
        if(data){
           
            if(bcrypt.compareSync(password,data.Password)){
                next();

            }
            else{
                res.status(400).json({
                    Message:"invalid Password"
                })
            }
        }
        else{
              res.status(400).json({
            message:'Email does not exist.So, you have to login first '
          })
        }
      
     

    })

}





router.get('/login',(req,res)=>{
    
})

router.post('/login',legalLogin,async(req,res)=>{
    const password=req.body.password;
    const email=req.body.email;
    const usersData= userDetails.findOne({Email:email})
     await usersData.exec((err,data)=>{
         if(err){
             res.status(400).json({
                 Message:"you have to signin first "
             })
         }
         if(bcrypt.compareSync(password,data.Password)){
            var token = jwt.sign({ _id: data._id}, 'ResumeCreator',{expiresIn:'5h'})
            // var decodeToken=jwt.decode(token);

            // console.log(decodeToken);
            // var userId=decodeToken._id;
            // console.log(userId);
            res.status(200).json({
                Message:"you  login successfully"
            })
            localStorage.setItem('loginToken',token);
            localStorage.setItem('loginEmail',email);


            var loginUser=localStorage.getItem('loginEmail');

            console.log(loginUser)
         
 
        
                // Message:"you  login successfully",
                // Token:token
                
         }

    })
  
    
})


module.exports=router;