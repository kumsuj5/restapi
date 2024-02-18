const mongoose = require("mongoose");

const studentSchma = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,
    gender:String
})

module.exports = mongoose.model('Student',studentSchma);