const mongoose = require("mongoose")

const PostScema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true
    },username:{
        type:String,
        reqyuired:true
    },
    categories:{
        type:Array,
        reqyuired:true

    }
},{timestamps:true})

module.exports = mongoose.model("Post",PostScema)