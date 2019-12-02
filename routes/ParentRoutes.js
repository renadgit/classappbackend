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
// router.post('/login', (req, res)=>{

// const email = req.body.email;
// const password = req.body.password;

// ParentModel
// .findOne({ email: email }) //{}
// .then((theParent)=>{
//     if(theParent) {
        
//         bcrypt
//         .compare(password, theParent.password)
//         .then((isMatch)=>{

//             console.log(isMatch)
//             if(isMatch) {

//                 const payload = {
//                     id: theParent.id,
//                     email: theParent.email
//                 }

//                 jwt.sign(
//                     payload,
//                     secret,
//                     (err, theJWT)=>{
//                         res.json({ token: theJWT })
//                     }
//                 )

//             } else {
//                 res.json({ message: 'Wrong password' })
//             }
//         })
//         .catch()


//     } else {
//         res.json({ message: "No parent with this account exists" })
//     }
// })
// .catch()

// });

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