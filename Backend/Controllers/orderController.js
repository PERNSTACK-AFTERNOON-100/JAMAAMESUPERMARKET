const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const Order = async(req,res)=>{
    const Orders = prisma.Order.findMany();
    try {
        res.status(200).json
        ({
            Orders
        })
    } catch (error) {
        res.status(404).json({
            messag: "Order not Found"
        })
    }
}

module.exports = {
    Order
}