require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const bodyParser = require('body-parser');
const Router=require('./Router');
const fs=require('fs');
const fDB =require('./models/form');
const cors=require('cors');
const {v2}= require("cloudinary");

v2.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:['*','http://localhost:5173',
    'https://delicate-pegasus-7f8449.netlify.app',
  'https://657d930da6dfa72acbb10cf4--delicate-pegasus-7f8449.netlify.app']
}))
mongoose.connect(process.env.URL).then(con=>{console.log("connnected")});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './controller')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({ storage });
app.post("/addForm",upload.array('files'),async(req,res)=>{
    let files=[];
    req.files.map((ele,index)=>{
    console.log(ele.path);
    files.push({name:ele.originalname,path:ele.path})
    });
    console.log(req.body);
    const {Com,Cat,Cloze,email,formName}=req.body;
    console.log(Com,Cloze,Cat,email);
    let response='';
    console.log(files);
    if(files.length&&files[0].path){
      try{
      response = await v2.uploader.upload(files[0].path, {
        resource_type: "auto"
    });fs.unlink(files[0].path,(err)=>{console.log("Error",err);});
    }catch(err){console.log(err); fs.unlink(files[0].path,(err)=>{console.log("Error",err);})}}
    const img=response.url;
    console.log(img);
    const data=await fDB.create({formName,email,category:JSON.parse(Cat),cloze:JSON.parse(Cloze),
        comprehension:JSON.parse(Com),img});
    if(data){
    return res.status(200).json({message:"Created"});
    }
    res.status(400).json({message:"something went wrong"})
})
app.use("/v1",Router)
const port=process.env.PORT||5009;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})