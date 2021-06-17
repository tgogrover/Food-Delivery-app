const express= require('express');
const app =express();
const makeAccount=require('./api/sign_In');
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const loginInAccount=require('./api/login');
const ejs=require("ejs");
const templateSign=require('./routes/te_SignIn')
const path=require('path')
const templatelogin=require('./routes/te_Login')
const dashboardUsers=require('./routes/te_Dashboard');
const changePassword=require('./routes/editPassword');
const makeResume=require('./routes/Resume');

mongoose.connect("mongodb://localhost:27017/Resume_Creator",{useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true,
useFindAndModify: false})

mongoose.connection.on("connected",()=>{
    console.log('database is successfully created and connected')
})
mongoose.connection.on("error",(err)=>{
    console.log(err)
})





app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('views'));
// app.set('views',path.join(__dirname + './views/resumeEjs'))



app.use(changePassword);
app.use(makeAccount);
app.use(loginInAccount);
app.use(templateSign);
app.use(templatelogin)
app.use(dashboardUsers);
app.use(makeResume);

app.listen(3000,()=>{
    console.log('server:3000 is working successfully')
})

