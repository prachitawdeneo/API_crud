const mongoose=require('mongoose');

const db="mongodb://localhost:27017/api_crud";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser:true});
        console.log("MOngoDB connected");
    }
    catch(err){
        console.log(err.message);
    }
}


module.exports=connectDB;