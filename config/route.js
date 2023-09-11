const express= require("express")
const route = express.Router()
const postController =require("../controller/postController")
const commentController =require("../controller/commentController")
const userController =require("../controller/userController")


route.get("/home" , postController.homePage)
route.get("/about" , postController.aboutPage) 
route.get("/signup", postController.signupPage)
route.get("/login" , postController.loginPage)


module.exports= route