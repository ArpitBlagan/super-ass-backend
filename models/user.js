const mongoose=require('mongoose');
const Object1 = new mongoose.Schema({
    name:String,
    ele:String,
}); 
const Object2 = new mongoose.Schema({
    name:String,
    ele:String,
}); 
const user=mongoose.Schema({
    name:{
        type:String,
        required:[true,'required Filed']
    },
    form_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'fDB'
    },
    cloze:[Object1],
    category:[Object2],
    comprehension:[String]
});
module.exports=mongoose.model('uDB',user);