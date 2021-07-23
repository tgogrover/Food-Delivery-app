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
            res.render('login',{ Message: "Something went wrong", title: 'Resume Creator' })
        }
        if(data){
           
            if(bcrypt.compareSync(password,data.Password)){
                next();

            }
            else{
                res.render('login',{ Message: "invalid Password", title: 'Resume Creator' })
            }
        }
        else{
              res.render('login',{Message:'Email does not exist.So, you have to Signin first ' , title: 'Resume Creator'})
        }
      
     

    })

}





router.get('/telogin',(req,res)=>{
    var loginUser=localStorage.getItem('loginEmail');
    if(loginUser){
        res.redirect('./teDashboard')
    }
    else{
    res.render( 'login', { Message: "", title: 'Resume Creator' })
    }
    
})

router.post('/telogin',legalLogin,async(req,res)=>{
    const password=req.body.password;
    const email=req.body.email;
    const usersData= userDetails.findOne({Email:email})
     await usersData.exec((err,data)=>{
         if(err){
             res.render('login',{ Message:"you have to signin first ", title:"Resume Creator" })
         }
         if(bcrypt.compareSync(password,data.Password)){
            var token = jwt.sign({ _id: data._id}, 'ResumeCreator',{expiresIn:'5h'})
            localStorage.setItem('loginToken',token);
            localStorage.setItem('loginEmail',email)
            
            res.redirect('/teDashboard')

         }

    })
  
    
})

router.get('/logout', function(req, res, next) {
    localStorage.removeItem('loginToken');
    localStorage.removeItem('loginEmail');
    res.redirect('/telogin');
  });



module.exports=router;