const Companies= require('../models/companyModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupCompnay =(req,res)=>{
    if(req.body.password!== ''){
        var hash = bcrypt.hashSync(req.body.Password, 12)
        let comapnyObj ={
            ...req.body,
            Password:hash
        }     
    const companyUser = new Companies(comapnyObj)
    companyUser.save()
    .then (()=>{
        res.redirect('/home')
    })
    .catch(err =>{
        console.log(err)
    })
 }
}


// login and logout same as userController 


// middleware
const companyAuth = (req ,res , next ) =>{
    if(req.cookies.jwtc){
      jwt.verify(req.cookies.jwtc ,'this is a random text for jwt sign' , function (err , decodedcompany){
          if (err){
              console.log('issue with verify token',err)
          } else {
               res.locals.userId = decodedcompany.tokenData.id
               res.locals.userFulname = decodedcompany.tokenData.Name
               res.locals.userEmail = decodedcompany.tokenData.Email
          }  
      } )           
      next()
    }else {
      res.redirect('/login')
    }
}

const logInAuth = (req ,res , next ) =>{
    if(req.cookies.jwtc){
          res.redirect('/home')
    }else {
        next()
    }
  }

  
module.exports = {
    signupCompnay,
    companyAuth,
    logInAuth,
}