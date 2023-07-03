const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


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
    const newUser = await prisma.User.create({
        data:{
            userName,
            email,
            password
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

// Update User
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
module.exports = {
    getUsers,
    userPost,
    updateUser,
    deleteUser

}