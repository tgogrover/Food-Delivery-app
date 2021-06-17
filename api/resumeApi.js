const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const resumeDetails=require('../data_Models/resume_Models');
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


router.get('/resume',authorization_of_User,(req,res)=>{
    res.render('resume',{title:'Resume Creator',Message:''})

})


router.post('/resume',authorization_of_User,async(req,res)=>{

 const name=req.body.name;
 const email=req.body.email;
 const qualification=req.body.qualification;
 const startYear=req.body.startYear;
 const endingYear=req.body.endingYear;
 const linkedinProfile=req.body.linkedinProfile;
 const skills=req.body.skills;
 const projectDone=req.body.projectDone;
 const coursesDone=req.body.coursesDone;
 const ResumeCreator= new resumeDetails({
    Name:name,
    Email:email,
    Graduation_starts_in_year:startYear,
    Graduation_completes_in_year:endingYear,
    Qualification:qualification,
    Project_Done:projectDone,
    Skills:skills,
    Linkedin_Profile:linkedinProfile,
    Courses_Done:coursesDone
})
 await ResumeCreator.save((err,data)=>{
     if(err) throw err;
     if(data){
     res.render('resume',{title:'Resume Creator',Message:'Your Data saved Successfully'})
     }


 })
    
})




module.exports=router;