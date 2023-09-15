const moment = require("moment/moment")
const mongoose = require("mongoose")


const Schema = mongoose.Schema ;
const CommentSchema = new Schema ({
    body:{
        type:String,
        required: true
    },
    PostId:{
        type:mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    created_at:{
        type: Date ,
        default :Date.now,
        get:function(createAt){
            return moment(createAt).format("DD/MM/YYYY ")
        }
    }
})

const Comment = mongoose.model('Comment' , CommentSchema)
module.exports =  Comment;
