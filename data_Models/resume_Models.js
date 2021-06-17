const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');


var resume_Schema =new mongoose.Schema({

    Name:{
        type:String,
        required:true
       
    },
    Email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    Qualification:{
        type:String,
        required:true
    },
    Graduation_starts_in_year:{
        type:Number,
        require:true,
        trim:true
        
    },
    Graduation_completes_in_year:{
        type:Number,
        required:true,
        trim:true
    },
    Project_Done:{
        type:String,
        required:true
    },
    Skills:{
        type:String,
        required:true
    },
    Linkedin_Profile:{
        type:String,
        required:true,
        trim:true 
    },
    Courses_Done:{
        
        type:String,
        required:true,
        
    }
});


const Resume_Model=mongoose.model('Resume_Details',resume_Schema)  
module.exports=Resume_Model;

