const express=require('express')
const router =express.Router();
const userController=require('../controllers/user.controller')
router.get('/',userController.getLandingPage)
router.post('/signup',userController.registerUser)
router.post('/signin',userController.signIn)
router.get('/dashboard',userController.getDashboard)
module.exports=router