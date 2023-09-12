const express= require("express")
const route = express.Router()
const postController =require("../controller/postController")
const commentController =require("../controller/commentController")
const userController =require("../controller/userController")

route.get('/', (req,res)=>{res.redirect('/home')})
route.get("/home" , postController.homePage)
route.get("/about" , postController.aboutPage) 
route.get("/signup",userController.logInAuth, postController.signupPage)
route.get("/login" ,userController.logInAuth, postController.loginPage)
route.get("/post/addnew" ,userController.userAuth, postController.addPost)

route.post("/signup", userController.signupUser)
route.post("/login", userController.logInUser)

module.exports= route