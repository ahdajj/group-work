const postModel = require("../models/postModule")



const homePage =(req,res)=>{
    postModel.find()
        .sort({created_at :-1})
        .then(data =>{
            // console.log(data[1]);
            res.render("index",{
                posts:data
            })
        })
        .catch(err=>{
            console.log(err);
        })
}


module.exports={
    homePage,

}