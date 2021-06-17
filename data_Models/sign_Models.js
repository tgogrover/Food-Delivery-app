const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');


var sign_Schema =new mongoose.Schema({

    Name:{
        type:String,
        required:true
       
    },
    Email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
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
    Password:{
        type:String,
        required:true,
        minlength:7
    }

});


const sign_Model=mongoose.model('User_Database',sign_Schema)  
module.exports=sign_Model;

