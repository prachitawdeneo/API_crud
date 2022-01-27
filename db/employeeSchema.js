const mongoose=require('mongoose');
const EmpSchema=new mongoose.Schema({
    eid:{
        type:String,
        required:true 
    },
    ename:{
        type:String,
        required:true 
    },
    email:{type:String,required:true,unique:true},
    mobile:{type:String,required:true },
    salary:{type:String,required:true }
})

module.exports=mongoose.model("employee",EmpSchema);