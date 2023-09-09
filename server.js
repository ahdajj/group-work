const express =require("express")
const route= require("./config/route")
const app=express()
require("./config/mongoose")



app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:false}))

app.use(route)
const port =3500
app.listen(`${port}` , ()=>console.log(`Localhost : ${port} is --- ON`))