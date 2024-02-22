const mongoose = require('mongoose');

const newsAdimSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content:String,
    author:String,
    category:String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Newsdetails', newsAdimSchema);