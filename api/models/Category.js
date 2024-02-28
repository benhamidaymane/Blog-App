const mongoose = require("mongoose")

const CategorieScema = new mongoose.Schema({
  
    name:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Categorie",CategorieScema)