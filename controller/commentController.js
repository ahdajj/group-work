const commentmModel = require('../models/commentModule')
const postModel = require("../models/postModule")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const creatComment = (req,res)=>{
    
    jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedUser){
        if (err){
            console.log('issue with verify token',err)
        } else {
              res.userId = decodedUser.tokenData.id
        } 
        }) 

    const comment = new commentmModel({
        body: req.body.comment,
        PostId:req.params.id
    })
    console.log(req.params.id)
    comment.save()
    .then((result)=>{
        postModel.findById(req.params.id)
        .then((Post)=>{
            Post.comment.push(comment._id)
            Post.save()
             .then(()=>{
                 res.redirect('/home')
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

module.exports = {
    creatComment
}