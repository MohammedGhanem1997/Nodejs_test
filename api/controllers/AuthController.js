const mongoose = require("mongoose");
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed, email does not exits"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed, pwd comparison failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            type: user[0].type,
                            
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn:  process.env.expiresIn||"2h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful, login successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed, JWT error"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Auth initialization failed"
            });
        });
}


