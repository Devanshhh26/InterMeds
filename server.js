const express=require('express');
const userRoutes=require('./routes/userRoute');
const authRoutes=require('./routes/authRoute');
const productRoute=require('./routes/productRoute');
const app=express();
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

require("dotenv").config();

const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})

const dbConnect=require("./config/database");

dbConnect();

app.get('/',(req,res)=>{
    res.send('Welcome to home');
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/product',productRoute);


