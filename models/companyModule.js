const mongoose = require('mongoose')

const Schema = mongoose.Schema ;
const companySchema = new Schema({
       Name:{
        type:String,
        required: true
       },
       Email:{
        type:String,
        required: true
       },
       Password:{
        type:String,
        required: true
       },
       comment:[{
              type:mongoose.Types.ObjectId,           
              ref:'Comment'                           
       }],

})

const  User = mongoose.model('Companies', comapnySchema)
module.exports = Company