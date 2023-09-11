const postModel = require("../models/postModule")



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
    res.render("login")
}

module.exports={
    homePage,
    aboutPage,
    signupPage,
    loginPage
}