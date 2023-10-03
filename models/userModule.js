const mongoose = require('mongoose')

const Schema = mongoose.Schema ;
const userSchema = new Schema({
       Name:{
        type:String,
        required: true
       },
       Email:{
        type:String,
        required: true
       },
       Linkedin:{
        type:String,
       },
       Facebook:{
        type:String,
       },
       Instagram:{
        type:String,
       },
       Bio:{
        type:String,
       },
       Password:{
        type:String,
        required: true
       },
       post:[{
              type:mongoose.Types.ObjectId,           
              ref:'Post'                           
       }],
       skills: [{
        name: String,
        checked: Boolean
    }]

})

const  User = mongoose.model('Users', userSchema)
module.exports = User