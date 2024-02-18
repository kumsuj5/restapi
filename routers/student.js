const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Student = require('../model/student');
const checkauth = require('../middleware/check-auth')
// get all data 

router.get('/',checkauth, (req, res, next) => {
    Student.find().then((result) => {
        res.status(200).json({
            studentData: result
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

//get one data by user

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
        .then((result) => {
            res.status(200).json({
                student: result
            })
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// post ,method

router.post('/', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,

    })
    student.save().then(result => {
        console.log(result);
        res.status(200).json({
            newStudent: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

// delete ,method

router.delete('/:id', (req, res, next) => {
    Student.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({
                message: 'Student details deleted',
                result: result
            })
        }).catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})

//put method 

router.put('/:id',(req,res,next)=>{
    console.log(req.params.id)
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
    }}).then((result)=>{
        res.status(200).json({
            message: 'Student details updated',
            updated_student:result
        })
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})



module.exports = router;