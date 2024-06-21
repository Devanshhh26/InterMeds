const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, username } = req.body;

        // Check if all fields are provided
        if (!firstName || !lastName || !email || !password || !confirmPassword || !username || !accountType) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            accountType,
            username,
        });

        return res.status(200).json({
            success: true,
            user: newUser,
            message: "User Registered Successfully"
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({
            success: false,
            message: "User Cannot be registered"
        });
    }
};

exports.signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email   ||  !password   ||  email==""    ||  password=="")
        {
            return res.status(400).json({
                success:false,
                message:"Enter all fields"
            })
        }
        const validUser=await User.findOne({email});
        if(!validUser)
        {
            return res.status(400).json({
                success:false,
                message:"The user does not exist"
            })
        }
        if(await bcrypt.compare(password,validUser.password))
        {
            const token=jwt.sign({id:validUser._id,accountType:validUser.accountType},process.env.JWT_SECRET);
            const {password:pass,...rest}=validUser._doc;
            res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
        }
        else{
            return res.status(403).json({
                status:false,
                message:"Password Incorrect"
            })
        }
    }
    catch(error)
    {   
        console.error("Check ",error);
        return res.status(500).json({
            success:false,
            message:"Email or password does not match"
        })
    }
}