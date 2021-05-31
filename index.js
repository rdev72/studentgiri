const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan');

//middleWares
//bodyParser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//mongoose
mongoose.connect('mongodb+srv://rohandev74:devrohan@studentgiri-task.na3pn.mongodb.net/test',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db =mongoose.connection;
db.once('open',()=>console.log('mongo connected'));
db.on('error',err=> console.log(err));
//morgan
app.use(morgan('dev'))


//Routes
app.get('/',(req,res)=>{res.send("Hello")})
app.use('/user',require('./routes/user'))
app.use('/task',require('./routes/task'))

//Get all User Detail- for Admin
//get single user detail- for Admin
//Delete user with all task (by Admin or user itself)

//user register
// user login
//user logout

//creat task
//Read all task
//read single task
//update task
//deleted task




const port = process.env.PORT || 3000
app.listen(port,console.log(`Server is running at ${port}`))