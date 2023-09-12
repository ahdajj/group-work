const postModel = require("../models/postModule")
const Users = require('../models/userModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const homePage =(req,res)=>{
    postModel.find()
        .sort({created_at :-1})
        .then(data =>{
            // console.log(data[1]);
            res.render("index",{
                posts:data
            })
        })
        .catch(err=>{
            console.log(err);
        })
}
const aboutPage =(req,res)=>{
        res.render("about")
}
const signupPage =(req,res)=>{
    res.render("signup")
}
const loginPage =(req,res)=>{
    res.render("login" , {err : ''})
}
const addPost =(req,res)=>{
    res.render("addNew")
}

const creatPost = (req,res)=>{

    jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedUser){
        if (err){
            console.log('issue with verify token',err)
        } else {
              res.userId = decodedUser.tokenData.id
              res.userFulname = decodedUser.tokenData.Name
        } 
        })
        const post = new postModel({
            ...req.body,
            userId:res.userId
        });  
        post.save()
        .then((result)=>{
            Users.findById(res.userId)
            .then((user)=>{
                user.post.push(post._id)
                user.save()
                 .then(()=>{
                    res.redirect('/index')
                 })
                 .catch((err)=>{
                    console.log(err)
                 })
            })
            .catch((err)=>{
                console.log(err)
            })
         })
        .catch((err)=>{
           console.log(err)
        })
    }
    

module.exports={
    homePage,
    aboutPage,
    signupPage,
    loginPage,
    creatPost,
    addPost
}