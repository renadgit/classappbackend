const ParentModel = require('../models/ParentModel');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret = process.env.SECRET;

router.post('/register', (req, res)=>{
    const formData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email,
        password : req.body.password,
        relationship: req.body.relationship,
        children: req.body.children,
        classes: req.body.classes    
    }

const newParent = new ParentModel(formData);
// Step 1. Generate a salt (random data for adding complexity)
bcrypt.genSalt((err, salt)=>{
    if(err) {
        console.log('error is', err);
    }  
    // Step 2. Generate a hashed password using (a) the user's password
    // and (b) the salt
    bcrypt.hash(
        newParent.password,
        salt,
        (err, hashedPassword)=>{
            if(err) {
                console.log('error is', err);
            }
            
            // Step 3. Reassign the user's password to be hashed password
            newParent.password = hashedPassword;

            // Step 4. Saving the formData to the database

            newParent
            .save() // Promise

            // If promise is fulfilled
            .then( 
                (newParentData)=>{
                    // Send response in the form of JSON
                    res.json(newParentData)
                }
            )
            // Otherwise...
            .catch(
                (err)=>{
                    console.log('error', err);
                }
            )
        }
    )
});
});
router.post('/login', (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;

    ParentModel
    .findOne({ email: email }) //{}
    .then((theParent)=>{
        if(theParent) {
            console.log(theParent)
            bcrypt
            .compare(password, theParent.password)
            .then((isMatch)=>{

                console.log(isMatch)
                if(isMatch) {

                    const payload = {
                        id: theParent.id,
                        email: theParent.email
                    }
                    jwt.sign(
                        payload,
                        secret,
                        (err, theJWT)=>{
                            res.json({ token: theJWT, parentid: theParent.id })
                        }
                    )

                } else {
                    res.json({ message: 'Wrong password' })
                }
            })
            .catch()


        } else {
            res.json({ message: "No Parent with this account exists" })
        }
    })
    .catch()

});

router.post('/find', async (req, res)=>{
    const theParent = await ParentModel.findById(req.body.id)
    .then(theParent=>{
        res.json(theParent);
    })
    .catch(err=>{
        res.send(err)
        
    })
    console.log("theparent",theParent)
});

//can i use req.user.id on a route with no passport authentication? can i use passport authentication on a get api
//undefined parent ? why

   


module.exports = router;