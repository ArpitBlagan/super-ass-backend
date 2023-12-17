const express=require('express');
const multer =require('multer');
const uDB=require('./models/user');
const {getForm, getAll, }=require('./controller/all');
const Router=express.Router();
const upload=multer();
Router.route("/getForm/:id").get(getForm);
Router.route("/all").get(getAll)
Router.post("/userRes",upload.none(),async(req,res)=>{
    const{name,form_id,cat,comp,cloze}=req.body;
    console.log(req.body);
    // const data=await uDB.create({form_id,name,category:JSON.parse(cat),cloze:JSON.parse(cloze),
    //     comprehension:JSON.parse(comp)});
    // if(data){
    // return res.status(200).json({message:"Created"});
    // }
    // res.status(400).json({message:"something went wrong"})
});
module.exports=Router