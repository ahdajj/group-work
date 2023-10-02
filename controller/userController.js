const Users = require('../models/userModule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupUser =(req,res)=>{
    if(req.body.password!== ''){
        var hash = bcrypt.hashSync(req.body.Password, 12)
        let userObj ={
            ...req.body,
            Password:hash
        }     
    const newUser = new Users(userObj)
    newUser.save()
    .then (()=>{
        res.redirect('/home')
    })
    .catch(err =>{
        console.log(err)
    })
 }
}


const logInUser = (req,res)=>{
    Users.findOne({Email:req.body.Email})
      .then(user => {
        if(user !== null){
            let correctPass = bcrypt.compareSync(req.body.Password,user.Password);
            if (correctPass){
                let tokenData= {                               
                    id:user._id, 
                    Name: user.Name,
                    email:user.Email,
                    post:user.post
                }
                let userToken=jwt.sign({tokenData},'this is a random text for jwt sign')
                res.cookie('jwt', userToken)
                res.redirect('/home')
            }else{
                res.render('login' ,{err: 'password is not correct'})
            }

        }else {
            res.render('login',{err:'user is not registerd'})
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
const userAuth = (req ,res , next ) =>{
    if(req.cookies.jwt){
      jwt.verify(req.cookies.jwt ,'this is a random text for jwt sign' , function (err , decodedUser){
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
    signupUser,
    logInUser,
    logout,
    userAuth,
    logInAuth
}