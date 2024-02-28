const router = require("express").Router();
const Categorie = require("../models/Category");

//create  cat 

router.post('/',async(req,res)=>{
    const newCat = new Categorie(req.body)

    try {
        const cat = await  newCat.save()
        res.status(200).json(cat)
        
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get('/',async(req,res)=>{
     try{
        const cats = await Categorie.find()
        res.status(200).json(cats)
     }catch(err){
        res.status(500).json(err)
     }
})

module.exports = router;