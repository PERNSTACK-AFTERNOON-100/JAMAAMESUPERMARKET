const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT_NUMBER;
const userRoute = require('../Routes/userRoutes')
app.use(express.json())
app.use('/api/users', userRoute)
app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})