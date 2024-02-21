const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

const app = express();

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', err => {
    console.log("Connection to MongoDB failed:", err);
});

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute = require('./routers/user');
const studentRoute = require('./routers/student');
const faculityRoute = require('./routers/faculity');

app.use('/api/v1/user', userRoute);
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/faculity', faculityRoute);

app.use('/server', (req, res, next) => {
    res.status(200).send("Server is working");
});

app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found"
    });
});

app.listen(port, () => {
    console.log("Server is running on localhost:" + port);
});
