const moment = require("moment/moment")
const mongoose = require("mongoose")
const Schema =mongoose.Schema

const postSchema = new Schema ({
    name :{
        type :String,
        required : true,
    },
    post:{
        type:String,
        required:true,
        maxlength :40

    },
    create_at:{
        type: Date ,
        default :Date.now,
        get:function(createAt){
            return moment(createAt).format("DD/MM/YYYY ")
        }
    }
},{timestamps:true}) 


module.exports=mongoose.model("Post" , postSchema)