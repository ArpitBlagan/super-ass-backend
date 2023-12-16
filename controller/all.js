const fDB =require('../models/form');

exports.getAll=async(req,res)=>{
    const data=await fDB.find();
    res.status(202).json(data);
}
exports.getForm=async(req,res)=>{
    const id=req.params.id;
    const data=await fDB.findById(id);
    if(data){
        return res.status(200).json(data);
    }
    res.status(404).json({message:"Not Found"});
}