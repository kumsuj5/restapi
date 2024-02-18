const express = require("express");

const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:"this is a get request from faculity"
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:"this is post req from faculity"
    })
})

module.exports= router;