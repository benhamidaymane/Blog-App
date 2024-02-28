const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const catRoute = require("./routes/categorie");
const multer = require("multer");
const path = require('path');



dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/local',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));


//upload image 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function(req, file, cb) {
        
        cb(null,req.body.name);
    }
});

const upload =multer({storage:storage})

app.post('/api/upload', upload.single('file'),async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send('okkkk' );
});
// Middleware setup
// Middleware setup

// Define routes

app.use("/uploads",express.static(path.join(__dirname,"/uploads")))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categorie",catRoute)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("connnected")
});
