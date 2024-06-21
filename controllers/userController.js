const User = require('../models/User');
const bcryptjs=require('bcryptjs');

exports.updateUser=async(req,res)=>{
        if(req.user.id !== req.params.userId)
        {
            return res.status(500).json({
                success: false,
                message: 'You are not allowed to update this account',
                error: error.message 
            });
        }
        if(req.body.password)
        {
            if(req.body.password.length<8)
            {
                return res.status(500).json({
                    success: false,
                    message: 'Password should be atleast 8 letter',
                    error: error.message 
                });
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.body.username) {
            if (req.body.username.length < 7 || req.body.username.length > 20) {
                return res.status(500).json({
                    success: false,
                    message: 'Username should be atleast 7 letter',
                    error: error.message 
                });
            }
            if (req.body.username.includes(' ')) {
                return res.status(500).json({
                    success: false,
                    message: 'Username should not include spaces',
                    error: error.message 
                });
            }
            if (req.body.username !== req.body.username.toLowerCase()) {
                return res.status(500).json({
                    success: false,
                    message: 'Username should be in lowercase',
                    error: error.message 
                });
            }
            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                return res.status(500).json({
                    success: false,
                    message: 'Username cannot not contain special characters',
                    error: error.message 
                });
            }
        }        
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,
            {
                $set:{
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    accountType:req.body.accountType
                },
            },
            {new:true}
        );
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: 'Cannot be updated',
            error: error.message 
        });
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        await User.findByIdAndDelete(id);
        res.clearCookie('access_token').status(200).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted',
            error: error.message 
        });
    }
};
exports.signout = (req, res) => {
    try {
        res.clearCookie('access_token').status(200).json({
            success: true,
            message: "User has been signed out"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        if(req.user.id != req.params.userId)
        {
            return res.status(500).json({
                success:false,
                message:"Not Authorized"
            })
        }
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
