const express  = require('express');
const router = express.Router();
const userController =  require('../Controllers/userController')
router.get('/all',userController.getAllUser)
router.post('/new',userController.registerUser)
router.post('/login',userController.login)
router.get('/find/:userId',userController.getUser)

module.exports = router