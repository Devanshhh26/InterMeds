const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("connection successful"))
    .catch((error)=>{
        console.log("Issue in connection");
        console.error(error.message);
        process.exit(1);
    });

}
module.exports=dbConnect;