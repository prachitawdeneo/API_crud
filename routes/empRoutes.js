const express=require('express');
const router=express.Router();
const jwt = require('jsonwebtoken')
const jwtSecret='afkhfhgruwi743657iuhuj4k5j'
const { check, validationResult } = require('express-validator');
const {getData,postData,updateData,deleteData}=require('../controller/empController')
const empModel=require('../db/employeeSchema');

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}

router.get('/getdata', async (req,res)=>{
    let data=[]
      data =  await getData();
    console.log( data)
    res.json({"emp":data})
})

router.post('/login',[
    check('email', 'Email length should be 4 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('ename', 'Name length should be 3 to 20 characters')
                    .isLength({ min: 3, max: 20 }),],
    (req,res)=>{
        console.log(req.body)
    let email=req.body.email;
    let ename=req.body.ename;
    empModel.findOne({email:email,ename:ename},(err,data)=>{
        console.log(email);
        if(err){
            res.json({"err":1,"msg":"Email or ename is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or ename is not correct"})
        }
        else {
            let payload={
                uid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"msg":"Login Success","token":token})
        }
        
    })
})

router.post('/postdata',autenticateToken,[
    check('email', 'Email length should be 4 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('ename', 'Name length should be 3 to 20 characters')
                    .isLength({ min: 3, max: 20 }),
    check('mobile', 'Mobile number should contains 10 digits')
                    .isLength({ min: 10, max: 10 }),
    check('salary', 'Salary length should be 3 to 10 characters')
                    .isLength({ min: 3, max: 10 }),
    check('eid', 'Eid length should be 3 to 10 characters')
                    .isLength({ min: 3, max: 10 })
],(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    // let empData={eid:req.body.eid,ename:req.body.ename,email:req.body.email,mobile:req.body.mobile,salary:req.body.salary}
    else{
        let payload={
            uid:req.body.email
        }
        const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
        postData(req.body);
        // data=getData()
        res.json({"msg":"Data posted","token":token})
    }
   

})

router.put('/update/:id',(req,res)=>{
    id=req.params.id
    // let empData={eid:req.body.eid,ename:req.body.ename,email:req.body.email,mobile:req.body.mobile,salary:req.body.salary}
    updateData(req.body,id);
    res.json({"msg":"Data Updated"})
})

router.delete('/delete/:id',(req,res)=>{
    id=req.params.id;
    deleteData(id);
    res.json({"msg":"Data Deleted"})

})

module.exports=router;