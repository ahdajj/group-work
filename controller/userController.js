const Users = require('../models/userModel')
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
        res.redirect('/index')
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
                res.redirect('/index')
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
    res.clearCookie('jwt');
    res.redirect('/about')
}

module.exports = {
    signupUser,
    logInUser,
    logout
}