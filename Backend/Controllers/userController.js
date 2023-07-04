const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const bcryptjs = require('bcryptjs')


// Get all Users
const getUsers = async(req,res)=>{
    const {userName, email , password} = req.body;
    const users = await prisma.User.findMany({
        where:{
            userName,
            email,
            password
        }
    });
    try {
        res.status(200).json({
            status: "success",
            users
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}

// new User 
const userPost = async(req,res)=>{
    const {userName, email, password} =req.body;
    if(!userName || !email || !password){
        res.status(404).json({
            message: "waan ka xunnahay macmiil ma jiro userkan!"
        })
    }
    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hashSync(password, salt)
    const newUser = await prisma.User.create({
        data:{
            userName,
            email,
            password:hashedPassword
        }
    });
    try {
        res.status(201).json({
            message: "User created successfully"
        })
    } catch (error) {
        res.status(404).json({
            message: "Error creating user"
        })
    }
}

// Update User
const updateUser = async(req,res)=>{
    const {idUser} = req.params
    const {userName} = req.body;

    try {
        const updateUsers = await prisma.User.update({
            where:{userId:+idUser},
            data:{userName}
        })
        res.json({
            message: `Updated User ${idUser}`,
          });
    } catch (error) {
        res.status(404).json({
            message: `Error updating user`
        })
    }
}

// Deleted

const deleteUser = async(req,res)=>{
    const {idUser} = req.params
    const {userName} = req.body;

    try {
        const updateUsers = await prisma.User.delete({
            where:{userId:+idUser},
        })
        res.json({
            message: `deleted User ${idUser}`,
          });
    } catch (error) {
        res.status(404).json({
            message: `Error Deleting user`
        })
    }
}

// GetByid
const findUser = async(req,res)=>{
    const {byId} = req.params
    const {userName,email,password} = req.body;

    try {
        const findUsers = await prisma.User.findUnique({
            where:{
                userId:+byId,
                userName,
                email,
                password
            },
        })
        res.json({
            message: `find User ${byId}`,
            findUsers
            // status: "waa lasoo heley xogta"
          });
    } catch (error) {
        res.status(404).json({
            message: `Error Finding user`
        })
    }
}
module.exports = {
    getUsers,
    userPost,
    updateUser,
    deleteUser,
    findUser
}