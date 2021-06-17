const express=require('express');
const router=express.Router();
const userDetails=require('../data_Models/sign_Models');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');





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


router.get('/editPassword',authorization_of_User,async(req,res)=>{

    var loginUser=localStorage.getItem('loginEmail');
    const userEmail=userDetails.find({Email:loginUser});
    await userEmail.exec((err,data)=>{
        if(err) throw err;
        else{
            res.render('editPassword', { title: 'Password Management System',Authorized_User: loginUser,record:data,success:'' });
            

        }

    })


})


router.post('/editPassword',authorization_of_User,async(req,res)=>{

    var loginUser=localStorage.getItem('loginEmail');
    const userEmail=userDetails.find({Email:loginUser});
    
            const password=req.body.password;
            const Hash_Password=bcrypt.hashSync(password,10);
            const newPassword=userDetails.findOneAndUpdate({Email:loginUser},{Password:Hash_Password},{new:true});
           await newPassword.exec((err,Data)=>{
                if(err) throw err;
        res.render('editPassword', {title: 'Password Management System',Authorized_User: loginUser,record:'',success:'Password Update Successfully' });
            
                console.log(Data)

            })

        })
    





module.exports=router;