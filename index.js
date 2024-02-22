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
const newspostadmin = require('./routers/adminnews');

const faculityRoute = require('./routers/faculity');

app.use('/api/v1/user', userRoute);
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/faculity', faculityRoute);
app.use('/api/v1/newspostadmin', newspostadmin);


app.use('/server',(req,res,next)=>{
    res.status(200).send("Server is working")
} )


// app.use((req, res, next) => {
//     res.status(404).json({
//         error: "bad request"
//     });
// });
app.use('/', (req, res, next) => {
    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');

    // Use inline styles for simplicity (consider using an external CSS file for better organization)
    const style = `
        <style>
            body {
                font-family: 'Arial', sans-serif;
                text-align: center;
                background-color: #f0f0f0;
                padding: 50px;
            }
            .love-symbol {
                color: red;
                font-size: 48px;
            }
            .birthday-wish {
                font-size: 24px;
                margin-top: 20px;
            }
        </style>
    `;

    // Construct the HTML content
    const htmlContent = `
        <html>
            <head>
                <title>Birthday Wishes</title>
                ${style}
            </head>
            <body>
                <div class="love-symbol">18</div>
                <div class="birthday-wish">Happy Birthday, Sudha! </div>
            </body>
        </html>
    `;

    // Send the HTML response
    res.status(200).send(htmlContent);
});

app.listen(port, () => {
    console.log("Server is running on localhost " + port);
});
