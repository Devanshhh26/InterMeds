const express=require('express');
const router=express.Router();
const {verifyToken}=require('../utils/verifyToken');
const {deleteUser,updateUser,getUser,signout}=require('../controllers/userController.js');

router.put('/update/:userId',verifyToken,updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser);
router.post('/signout',signout);
router.get('/:userId',verifyToken,getUser);

module.exports = router;