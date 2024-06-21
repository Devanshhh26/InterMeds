const Product = require('../models/product');
const User=require('../models/user');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

exports.createProduct=async(req,res)=>{
    try{
        const id=req.user.id;
        const user=await User.findById(id);
        if(!user)
        {
            return res.status(404).json({
                success: false,
                message: "User not Found",
              })
        }
        const {name,brand,description,price,images,category}=req.body;
        if(!name    ||  !brand  ||  !description    ||  !price  ||  !images  ||  !category)
        {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
              })
        }
        const product=new Product({name,brand,description,price,images,category,userId:id});
        await product.save();
        console.log("product created successfully");
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
exports.updateProduct=async(req,res)=>{
    try{
        const productId=req.params.id;
        const userId=req.user.id;
        const {name,brand,description,price,images,category}=req.body;
        const product=await Product.findById(productId);
        if(!product)
        {
            return  res.status(404).json({
                success:false,
                message:"No product found"
            })
        }
        if(product.userId !== userId)
        {
            return  res.status(403).json({
               success:false,
                message:"You are not authorized to update the product"
            })
        }
        if (name) product.name = name;
        if (brand) product.brand = brand;
        if (description) product.description = description;
        if (price) product.price = price;
        if (images) product.images = images;
        if (category) product.category = category;
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    }
    catch(error)
    {
        console.error('Error updating product:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        const userId=req.user.id;
        const productId=req.params.id;
        const product=await Product.findById(productId);
        if(!product)
        {
            return res.status(404).json({
                success: false,
                message: "No product found to delete",
                error: error.message
            });
        }
        if(product.userId !== userId)
        {
            return  res.status(403).json({
                success:false,
                 message:"You are not authorized to Delete the product"
            })
        }
        await product.delete();
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    }
    catch(error)
    {
        console.error('Error deleting product:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getProductsByUser=async(req,res)=>{
    try{
        const userId = req.user.id; 
        const products = await Product.find({ userId });
        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found for this user"
            });
        }
        return res.status(200).json({
            success: true,
            products
        });
    }
    catch(error)
    {
        console.error('Error fetching products by user:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });   
    }
}
exports.getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category })
        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

