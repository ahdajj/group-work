const commentmModel = require('../models/commentModule')
const postModel = require("../models/postModule")
const Companies= require('../models/companyModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const creatComment = (req,res)=>{
    
    jwt.verify(req.cookies.jwtc ,'this is a random text for jwt sign' , function (err , decodedcompany){
        if (err){
            console.log('issue with verify token',err)
        } else {
             res.companyId = decodedcompany.tokenData.id
        }  
    } ) 

    const comment = new commentmModel({
        body: req.body.comment,
        PostId:req.params.id,
        CompanyId:res.companyId
    })
    comment.save()
    .then((result)=>{
        postModel.findById(req.params.id)
        .then((Post)=>{
            Post.comment.push(comment._id)
            Post.save()
             .then(()=>{
                Companies.findById(res.companyId)
                .then((comp)=>{
                    comp.comment.push(comment._id)
                    comp.save()
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
        })
        .catch((err)=>{
            console.log(err)
         })
        })     
    .catch((err)=>{
       console.log(err)
    })
}

const commentAuth = (req ,res , next ) =>{
    if(req.cookies.jwtc){
        next()
         
    }else {
        res.render('PostDisplay' , {err : 'only Companies can write a comment '})
    }
  }

module.exports = {
    creatComment,
    commentAuth
}