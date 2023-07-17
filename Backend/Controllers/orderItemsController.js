const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const orderItems = async(req,res)=>{
    const getOrderItems = prisma.orderItems.findMany()
    try {
        res.status(200).json({
            getOrderItems
        })
    } catch (error) {
        res.status(404).json({
            message: "OrderItems not Found"
        })
    }
}

// Post New OrderItems



module.exports = {
    orderItems
}