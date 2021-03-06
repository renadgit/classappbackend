const TeacherModel = require('../models/TeacherModel');
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
        classes: req.body.classes
    }

const newTeacher = new TeacherModel(formData);
// Step 1. Generate a salt (random data for adding complexity)
bcrypt.genSalt((err, salt)=>{
    if(err) {
        console.log('error is', err);
    }  
    // Step 2. Generate a hashed password using (a) the user's password
    // and (b) the salt
    bcrypt.hash(
        newTeacher.password,
        salt,
        (err, hashedPassword)=>{
            if(err) {
                console.log('error is', err);
            }
            
            // Step 3. Reassign the user's password to be hashed password
            newTeacher.password = hashedPassword;

            // Step 4. Saving the formData to the database

            newTeacher
            .save() // Promise

            // If promise is fulfilled
            .then( 
                (newTeacherData)=>{
                    // Send response in the form of JSON
                    res.json(newTeacherData)
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

TeacherModel
.findOne({ email: email }) //{}
.then((theTeacher)=>{
    if(theTeacher) {
        
        bcrypt
        .compare(password, theTeacher.password)
        .then((isMatch)=>{

            console.log(isMatch)
            if(isMatch) {

                const payload = {
                    id: theTeacher.id,
                    email: theTeacher.email
                }

                jwt.sign(
                    payload,
                    secret,
                    (err, theJWT)=>{
                        res.json({ token: theJWT, teacherid : theTeacher.id })
                    }
                )

            } else {
                res.json({ message: 'Wrong password' })
            }
        })
        .catch()


    } else {
        res.json({ message: "No Teacher with this account exists" })
    }
})
.catch()

});

// router.post('/addlike', async (req, res)=>{
    
//     let userLikes;
//     let theFeedID = req.body.feedid;
//     let userID = req.body.userid;
//     // 1. Get the document with matching id
//     let theDocument = await FeedModel
//     .find({_id: theFeedID}) // promise

//     // 2. Extract the likes from the document
//     userLikes = theDocument[0].likes;

//     // 3. Push the new like to the array
//     if(userLikes.includes(userID))
//     {
//      userLikes.splice(userLikes.indexOf(userID),1);
//     }
//     else
//     {
//     userLikes.push(userID);
//     }   
//     // 4. Update the document
//     FeedModel
//     .updateOne(
//         {_id: theFeedID},
//         {likes: userLikes}
//     ) //promise
//     .then(theFeed=>{
//         res.json(theFeed)
//     })
//     .catch(err=>{
//         res.json(err)
//     });


//remove like

module.exports = router;