const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const resumeDetails=require('../data_Models/resume_Models');
const jwt=require('jsonwebtoken');
const fs=require('fs');
//  html_to_pdf = require('html-pdf-node');
// { output } = require('pdfkit');

// const ejsPdf=require('html-pdf');
var pdf = require('html-pdf');
const path=require('path');
//  const pdf = require('pdfkit');


 //const pdfDocument=require('pdfkit');

// const doc=new pdfDocument();



// doc.pipe(fs.createWriteStream('output.pdf'));
 


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
    //   res.render('resume',{title:'Resume Creator',Message:'Your Data saved Successfully'})
    res.render('resume1',{Data:data,Message:''},
    (err,data)=>{
        if (err) {
            res.send(err);
      } else {
          let options = {
              "height": "11.25in",
              "width": "8.5in",
              "header": {
                  "height": "20mm"
              },
              "footer": {
                  "height": "20mm",
              },
          };
          pdf.create(data, options).toFile("resume.pdf", function (err, data) {
            if (err) {
                res.send(err);
             } else {
                var loginUser=localStorage.getItem('loginEmail');
              res.render('dashboard',{title:'Resume Creator',Your_Email:loginUser,Authorized_User:loginUser,Message:"Pdf Created successful"})
          }
        })
        
       }
    })
}

    
    })
})






module.exports=router;