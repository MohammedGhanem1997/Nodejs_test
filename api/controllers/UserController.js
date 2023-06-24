const mongoose = require("mongoose");
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const URL = require('url'); 


exports.create_user = (req, res, next) => {
    console.log(req.file);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "E-Mail already exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashed_pass) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            type:req.body.type,
                            email: req.body.email, //sanitize email
                            password: hashed_pass,
                            userImage: `${ req.host}:${process.env.PORT}/uploads/${req.file.filename}`,
                            name:req.body.name,

                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created successfully"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

exports.get_specific_user = (req, res, next) => {


    const id = req.params.userId;
    User.findById(id)
        .select('name email type _id userImage')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: `${ req.host}:${process.env.PORT}/user`
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
exports.update_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};

    for (const [key, value] of Object.entries(req.body)) {
        console.log(key, value);
        updateOps[key] = value;
      }
    // return res.status(200).json( updateOps)

    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users/' + id
                },
                result:result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}



exports.delete_user = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
