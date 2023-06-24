
const mongoose=  require('./Seeder')
const bcrypt = require("bcrypt");
const User = require("../api/models/user_model");

//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
  const password= "123456789" ;
  const email="admin2@unifi.com";
  const name="ghanem";

bcrypt.hash(password, 10, (err, hashed_pass) => {
    if (err) {
        return res.status(500).json({
            error: err
        });
    } else {
        const user = new User({
            type: 'admin',
            
            email: email, //sanitize email
            password: hashed_pass
        });
        user
            .save()
            .then(result => {
                console.log(result);
               console.log( "message", "User created successfully"  );
            })
            .catch(err => {
                console.log(err);
                console.error( "message", "User error"  );

            });
    }
});










