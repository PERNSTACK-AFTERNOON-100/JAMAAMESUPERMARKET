const  express = require('express')
const app = express();
const port = 4000;
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config();
const userRoute = require('../routes/userRoute')
const productsRoute = require('../routes/productsRoute')
app.use('/api/users',userRoute)
app.use('/api/products',productsRoute)

app.listen(port, ()=>{
    console.log(`listen on ${port}`)
})