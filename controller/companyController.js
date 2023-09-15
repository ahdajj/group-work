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
    const companyUser = new Companies(userObj)
    companyUser.save()
    .then (()=>{
        res.redirect('/home')
    })
    .catch(err =>{
        console.log(err)
    })
 }
}


const logInCompany = (req,res)=>{
    Companies.findOne({Email:req.body.Email})
      .then(user => {
        if(user !== null){
            let correctPass = bcrypt.compareSync(req.body.Password,company.Password);
            if (correctPass){
                let tokenData= {                               
                    id:comapny._id, 
                    Name: company.Name,
                    email:comapny.Email,
                    comment:company.comment
                }
                let companyToken=jwt.sign({tokenData},'this is a random text for jwt sign')
                res.cookie('jwt', userToken)
                res.redirect('/home')
            }else{
                res.render('login' ,{err: 'password is not correct'})
            }

        }else {
            res.render('login',{err:'company is not registerd'})
        }
      })
      .catch(err =>{
        console.log(err)
      })
}    


const logout = (req,res)=>{
    if(req.cookies.jwt) { 
    res.clearCookie('jwt');
    res.redirect('/home')}
    else {
        res.redirect('/login')
    }
}

// middleware
const companyAuth = (req ,res , next ) =>{
    if(req.cookies.jwt){
      jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedcompany){
          if (err){
              console.log('issue with verify token',err)
          } else {
               res.locals.userId = decodedUser.tokenData.id
               res.locals.userFulname = decodedUser.tokenData.Name
               res.locals.userEmail = decodedUser.tokenData.Email
          }  
      } )           
      next()
    }else {
      res.redirect('/login')
    }
}

const logInAuth = (req ,res , next ) =>{
    if(req.cookies.jwt){
          res.redirect('/home')
    }else {
        next()
    }
  }

module.exports = {
    signupCompnay,
    logInCompany,
    logout,
    companyAuth,
    logInAuth
}