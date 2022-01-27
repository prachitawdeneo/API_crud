const empModel=require('../db/employeeSchema');

async function getData(){
    let empData = await empModel.find({}, (err,data)=>{
        if (err) throw err
             
     }).clone();
     console.log(empData)
     return empData
}

async function postData(data){
    console.log(data)
    let ins=await new empModel(data);
     ins.save((err)=>{
        if(err) throw err
        else{
        console.log("User Added!")
        // res.redirect('/login')
        }
    })
}

async function updateData(data,id){
    await empModel.updateOne({eid:id},{$set:data})
}

async function deleteData(id){
    await empModel.deleteOne({eid:id},(err)=>{
        if (err) throw err;
    })
}
async function loginData(id){
    
}
module.exports={getData,postData,updateData,deleteData}