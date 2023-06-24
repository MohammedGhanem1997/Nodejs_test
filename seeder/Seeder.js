

const bcrypt = require("bcrypt");
const User = require("../api/models/user_model");
require('dotenv').config()
const mongoose = require("mongoose");

dbURI="mongodb+srv://ghanemm138:849PF8PN8PREU7ie@cluster0.ary5cqi.mongodb.net/"
console.log(dbURI);
 module.exports= mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>console.log("conected") )
    .catch((error) => console.log(error)
    );

