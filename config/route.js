const express= require("express")
const route = express.Router()
const postController =require("../controller/postController")
const commentController =require("../controller/commentController")
const userController =require("../controller/userController")


route.get("/" , postController.homePage)


module.exports= route