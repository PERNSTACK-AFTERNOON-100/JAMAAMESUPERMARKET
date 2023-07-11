const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//get bcryptjs
const bcrypt = require("bcryptjs");
// get jsonwebtoken
const jwt = require("jsonwebtoken");

// token Generator
const tokenGenerator = (user) => {
  return jwt.sign({ user }, process.env.JWT_SEC, {
    expiresIn: "1m",
  });
};


// Register new User
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await prisma.user.findFirst({
    where: { email },
  });
  if (checkUser) {
    res.json({
      status: "Error",
      message: "the email is already exist",
    });
    return;
  }
  if (!email || !password) {
    res.json({
      status: "Error",
      message: "email or password was not provided",
    });
    return;
  }

  //HasedPassword
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      email: true,
      password: true,
      isAdmin: true,
    },
  });
  const token = tokenGenerator(newUser.id);
  res.json({
    user: { ...newUser },
    token,
    status: "success",
  });
};

// Get All Users
const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error while getting users",
    });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      message: "Please enter your email address and password",
    });
    return;
  }
  const userExisting = await prisma.user.findFirst({
    where: {
      email,
      
    },
    select: {
      id: true,
      email: true,
      password: true,
      isAdmin: true,
      role: true,
    },
  });
  if(!userExisting){
    res.json({
        message: "wrong credentials"
    })
    return
  }
  const dehashedPassword = await bcrypt.compareSync(password, userExisting.password);
  if(dehashedPassword){
 const token = tokenGenerator(userExisting.id);
 res.json({
    status: "success",
    message : `you are now logged`,
    token,
    user:userExisting
 }) 
  }else{
    res.json({
        status: 'error',
        message : `you are not logged`
    })
  }
};

// get user
const getUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
        select: {
          id: true,
          email: true,
        },
      });
  
      res.json({
        user,
      });
    } catch (error) {
        res.status(404).json({
            message: 'Invalid request error',
        })
      res.json({
        error,
      });
    }
  };

module.exports = {
  registerUser,
  getAllUser,
  login,
  getUser
};