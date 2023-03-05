const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"userData"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"userData"}
    }],
    postedBy:{
       type:ObjectId,
       ref:"userData"
    }
})

const Post = mongoose.model("Post",postSchema)
module.exports = {Post}