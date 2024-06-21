const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        requireed:true
    },
    lastName:{
        type:String,
        requireed:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        requried:true
    },
    accountType:{
        type:String,
        enum: ["Buyer", "Seller", "Admin"],
		required: true,
    }
},
{timestamps:true}
);

module.exports=mongoose.model("User",userSchema);