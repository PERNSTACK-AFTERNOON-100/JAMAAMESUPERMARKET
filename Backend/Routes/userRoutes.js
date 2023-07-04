const express = require('express');
const routes = express.Router()
const userController = require('../Controllers/userController')

routes.get('/all',userController.getUsers)
routes.get('/getById/:byId',userController.findUser)
routes.post('/new',userController.userPost)
routes.put('/update/:idUser',userController.updateUser)
routes.delete('/delete/:idUser',userController.deleteUser)

module.exports = routes