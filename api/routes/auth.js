const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");





router.post("/register", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedpass,
      profilePic: req.body.profilePic,
    });

    const user = await newUser.save();
    console.log("User Registered:", user);

    res.status(200).json(user);
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: err.message });
  }
});


  //LOGIN
  router.post("/login", async (req,res)=>{
    try{
      const user =  await  User.findOne({ email:req.body.email })
      !user && res.status(404).send("user not found ")
  
      const validPassword =await bcrypt.compare(req.body.password,user.password)
      !validPassword && res.status(404).json("wrong password ")
  
      res.status(200).json(user)
  
    }catch(err){
      res.status(500).json(err)
  
    }
      
  })
  

module.exports = router