const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require("../model/user");

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                userType: req.body.userType
            })
            user.save()
                .then((result) => {
                    res.status(200).json({
                        new_user: result
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: err
                    })
                })
        }

    })
})

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "user not exist"
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (!result) {
                        return res.status(401).json({
                            msg: "password not matched"
                        })
                    }
                    if(result){
                        const token = jwt.sign({
                            username:user[0].username,
                            userType:user[0].userType,
                            email:user[0].email,
                            phone:user[0].phone
                        },
                        'this is dummy text',
                        {expiresIn:"24h"}
                        );
                        res.status(200).json({
                            username:user[0].username,
                            userType:user[0].userType,
                            email:user[0].email,
                            phone:user[0].phone,
                            token:token
                        })
                    }
                })
            }
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
        })
})

module.exports = router;


// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// const router = express.Router();

// const User = require("../model/user");

// router.post('/', (req, res, next) => {
//     // Validate incoming request
//     const requiredFields = ['username', 'password', 'email', 'phone', 'gender', 'userType'];
//     for (const field of requiredFields) {
//         if (!req.body[field]) {
//             return res.status(400).json({
//                 error: `Missing required field: ${field}`
//             });
//         }
//     }

//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) {
//             return res.status(500).json({
//                 error: err
//             });
//         } else {
//             const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 username: req.body.username,
//                 password: hash,
//                 email: req.body.email,
//                 phone: req.body.phone,
//                 gender: req.body.gender,
//                 userType: req.body.userType
//             });

//             // Save user to the database
//             user.save()
//                 .then(result => {
//                     res.status(201).json({
//                         new_user: result
//                     });
//                 })
//                 .catch(err => {
//                     res.status(500).json({
//                         error: err
//                     });
//                 });
//         }
//     });
// });

// module.exports = router;
