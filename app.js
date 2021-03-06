//jshint esversion:6
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");


const app = express()

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
        email:String,
        password:String
})



const UserModel = mongoose.model("User",userSchema);


app.get("/home",function(req,res){
    res.render("home");
  })

 app.get("/login",function (req,res) {
    res.render("login");

   }) 

 app.post("/login",function (req,res) {
    
      const  username = req.body.username;
      const  password = md5(req.body.password);

    
    UserModel.findOne({email:username},function (err,userFound) {
        if (err) {
            console.log(err);
        } else {
            if (userFound.password === password) {
                res.render("secrets")
            } else {
                res.send("Check you password or email")
            }
        }
      })

   })  

   
app.get("/register",function (req,res) { 
    res.render("register");
 })

 app.post("/register",function(req,res) {

        
        const addUser = new UserModel({
            email:req.body.username,
            password:md5(req.body.password)
        })
        addUser.save(function(err){
            if (err) {
                console.log(err);
            } else {
                res.render("secrets")
            }
     })


   })



app.listen(3000,function() { 
    console.log("Server running on port 3000");
 })