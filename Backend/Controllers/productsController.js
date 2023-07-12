const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const newProduct = async (req, res, next) => {
    const { productName, productDescription, brand, category, price, stock } =
      req.body;
    const newProducts = await prisma.Products.create({
      data: {
        productName,
        productDescription,
        brand,
        category,
        price,
        stock
      },
    });
    res.status(201).json({
      message: "Added new Products",
      newProducts,
    });
  };
  
// Get All Products
const getAll = async (req, res, next) => {
    const products = await prisma.Products.findMany();
    res.status(200).json({
      products,
    });
  };
  
module.exports = {
    newProduct,
    getAll
}