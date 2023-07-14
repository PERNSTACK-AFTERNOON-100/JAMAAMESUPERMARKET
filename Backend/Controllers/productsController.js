const { PrismaClient } = require("@prisma/client");
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
      stock,
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

// FindProducts
const FindProducts = async (req, res) => {
  const { getById } = req.params;
  const findProduct = await prisma.Products.findUnique({
    where: {
      ProductID: +getById,
    },
  });
  try {
    res.status(200).json({
      findProduct,
    });
  } catch (error) {
    res.status(404).json({
      message: "Product not found",
    });
  }
};

// updateProducts
const updateProducts = async (req, res) => {
  const { updateById } = req.params;
  const { productName, productDescription, brand, category, price, stock } =
    req.body;

  const updatedById = await prisma.Products.update({
    where: {
      ProductID: +updateById,
      productName,
      productDescription,
      brand,
      category,
      price,
      stock
    }
  });
  try {
    res.status(200).json({
      message: `Updated products by ID : ${updateById}`,
      updatedById,
    });
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const { deleteById } = req.params;
  const deleted= await prisma.Products.delete({
    where: {
      ProductID: +deleteById,
    },
  });
  try {
    res.status(200).json({
      message: "Deleted Product successfully"+ deleteById
    });
  } catch (error) {
    res.status(404).json({
      message: "Product not found",
    });
  }
};

module.exports = {
  newProduct,
  getAll,
  FindProducts,
  updateProducts,
  deleteProduct
};
