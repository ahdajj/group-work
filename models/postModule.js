const moment = require("moment/moment")
const mongoose = require("mongoose")

const Schema =mongoose.Schema
const postSchema = new Schema ({
    body:{
        type:String,
        required:true,
        maxlength :40
    },
    UserId:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true
    },
    comment:[{
        type:mongoose.Types.ObjectId,
        ref:'Comment'
    }],
    create_at:{
        type: Date ,
        default :Date.now,
        get:function(createAt){
            return moment(createAt).format("DD/MM/YYYY ")
        }
    }
},{timestamps:true}) 

const Post = mongoose.model("Post" , postSchema)
module.exports= Post 