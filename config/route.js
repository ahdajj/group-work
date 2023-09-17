const express= require("express")
const route = express.Router()
const postController =require("../controller/postController")
const commentController =require("../controller/commentController")
const userController =require("../controller/userController")
const comapnyController= require("../controller/companyController")

route.get('/', (req,res)=>{res.redirect('/home')})
route.get("/home" , postController.homePage)
route.get("/about" , postController.aboutPage) 
route.get("/signup",userController.logInAuth, postController.signupPage)
route.get("/login" ,userController.logInAuth, postController.loginPage)
route.get("/post/addnew" ,userController.userAuth, postController.addPost)
route.get("/post/:id" ,userController.userAuth, postController.postDisplay)
route.get('/info', (req,res)=>{res.render('userInfo')})
route.get('/logout',userController.logout)

route.post("/signup", userController.signupUser)
route.post("/login", userController.logInUser)
route.post("/addPost", postController.creatPost)
route.post("/addComment/:id", commentController.creatComment)

route.get("/signup-company",comapnyController.logInAuth, postController.signupPageCompany)
route.post("/signup-company-new", comapnyController.signupCompnay)

route.get("/login" ,comapnyController.logInAuth, postController.loginPage)
module.exports= route