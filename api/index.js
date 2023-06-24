const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require('cors');
const {createProxyMiddleware} = require('http-proxy-middleware');


dotenv.config();

const app = express();


app.use(cors());

app.get("/",createProxyMiddleware({target:'https://social-app-il8y.onrender.com/api',changeOrigin:true}))



const connection =mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true,useUnifiedTopology: true}
    );
    
    if(connection)console.log("Connected to MongoDB");
    
    app.use("/images", express.static(path.join(__dirname, "public/images")));
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common")); 
    app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.get("/",(req,res)=>{
    res.send("Welcome to Homepage");
})
app.get("/users",(req,res)=>{
    res.send("Welcome to User's Page");
})

if(process.env.NODE_ENV=='production'){
  const path = require('path');

  app.get("/",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,'react-social','build')));
    res.sendFile(path.resolve(__dirname,'react-social','build','index.html'));
  })
}

app.listen(5000,(err)=>{
    if(err)console.log(err);
    else
    console.log("Server started at port 5000");
})