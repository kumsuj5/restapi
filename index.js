const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb+srv://kumsuj5:8953729002@restapi.d5hd8is.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error', err => {
    console.log("connection failed vks");
});
mongoose.connection.on('connected', () => {
    console.log("connected to mongoose");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const userRoute = require('./routers/user');
const studentRoute = require('./routers/student');

const faculityRoute = require('./routers/faculity');

app.use('/api/v1/user', userRoute);
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/faculity', faculityRoute);


app.use('/server',(req,res,next)=>{
    res.status(200).send("Server is working")
} )

app.use((req, res, next) => {
    res.status(404).json({
        error: "bad request"
    });
});

app.listen(port, () => {
    console.log("Server is running on localhost " + port);
});
