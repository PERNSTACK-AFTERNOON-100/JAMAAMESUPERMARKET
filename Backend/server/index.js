const  express = require('express')
const app = express();
const port = 4000;
app.use(express.json())
const dotenv = require('dotenv')
dotenv.config();
const userRoute = require('../routes/userRoute')
app.use('/api/users',userRoute)

app.listen(port, ()=>{
    console.log(`listen on ${port}`)
})