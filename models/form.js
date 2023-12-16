const mongoose=require('mongoose');
const Object1 = new mongoose.Schema({
    question:String,
    correct:String,
    answers:[String]
}); 
const Object2 = new mongoose.Schema({
    passage:String,
    questions:[{statement:String,options:[String],correct:String}]
}); 
const Object3 = new mongoose.Schema({
    categories:[String],
    values:[{key:String,val:String}]
});  
const form=mongoose.Schema({
    formName:{
        type:String,
        required:[true,'Name required']
    },
    email:{
        type:String,
        required:[true,'Email required']
    },
    img:{
        type:String
    },
    cloze:[Object1],
    comprehension:[Object2],
    category:[Object3]
});
module.exports=mongoose.model('fDB',form);