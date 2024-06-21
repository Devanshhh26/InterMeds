const express = require('express');
const router = express.Router();
const { 
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProductById,
    getProductsByCategory,
    getProductsByUser 
} = require('../controllers/productController.js'); 
const { verifyToken } = require('../utils/verifyToken.js');

router.get('/all', getAllProducts);
router.get('/userProducts', verifyToken, getProductsByUser);
router.get('/category/:category', getProductsByCategory);
router.get('/:productId', getProductById);
router.delete('/delete/:productId', verifyToken, deleteProduct);
router.put('/updateProduct/:productId', verifyToken, updateProduct);

module.exports = router;
