const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Newsdetails = require('../model/adminnew');


router.post('/create-news-post', (req, res, next) => {
    const newsdetails = new Newsdetails({
        _id: new mongoose.Types.ObjectId,
        title:  req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
    })
    newsdetails.save().then(result => {
        console.log(result);
        res.status(200).json({
            newsdeta: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})


module.exports= router;