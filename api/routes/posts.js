const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


// create POST
router.post("/", async (req, res) => {
    const newPost =  new Post(req.body)
 
    try {
        const post = await  newPost.save()
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Update post

router.put("/:id", async (req, res) => {
  try {
    const post = await  Post.findById(req.params.id)
    if(post.username === req.body.username){
        try {
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,
                {$set:req.body},
                {new:true})
                res.status(200).json(updatedPost)
        } catch (err) {
        res.status(500).json("no update")
        }
    }
    else{
        res.status(401).json("you can update only your post ")
    }
  } catch (err) {
    res.status(500).json("no comment ")
  }   
  });

//delete post 

router.delete ("/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const deletePost = await Post.deleteOne(post)
                res.status(200).json("your post deleted ")
            } catch (err) {
                res.status(500).json(err)
            }
            
        } else {
            res.status(401).json(err)
        }
        
    } catch (err) {
        res.status(500).json(err)
    }
})
// get post 
router.get('/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all posts 
router.get('/',async(req,res)=>{
    const username= req.query.user
    const categorieName=req.query.cat
    try{
       let posts;
       if (username) {
        posts= await Post.find({username})
       } else  if (categorieName){
        posts = await Post.find({categories:{
            $in:[categorieName]
        }})
       }else{
        posts =  await Post.find();
       }
       res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
