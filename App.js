const express=require('express');
const PORT=8899;
const app=express();
const connectDB=require('./config/db')
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//db connection
connectDB();


const empRoutes=require('./routes/empRoutes');
const { urlencoded } = require('express');
app.use('/api',empRoutes);


app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on ${PORT}`);
})