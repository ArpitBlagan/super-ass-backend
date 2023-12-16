require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const multer=require('multer');
const bodyParser = require('body-parser');
const Router=require('./Router');
const fs=require('fs');
const fDB =require('./models/form');
const cors=require('cors');const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:['*','http://localhost:5173']
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
    fs.unlink(ele.path,(err)=>{console.log("Error",err);})
    });
    console.log(req.body);
    const {Com,Cat,Cloze,email,formName}=req.body;
    console.log(Com,Cloze,Cat,email);
    const img=files[0].name||'';
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