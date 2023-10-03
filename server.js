const express =require("express")
const route= require("./config/route")
const app=express()
require("./config/mongoose")
const cookieParser = require('cookie-parser')
const cors = require ('cors')



app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors({
    "origin": "http://localhost:3000",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })
  )


app.use(route)
app.use(express.static('public'))
const port =3500
app.listen(`${port}` , ()=>console.log(`Localhost : ${port} is --- ON`))