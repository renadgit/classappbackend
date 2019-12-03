const express = require('express');
const router = express.Router();
const ChildModel = require('../models/ChildModel');

router.post('/addchild', (req, res)=>{ 
    const formData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        age: req.body.age,
        groups: req.body.groups,
        classes: req.body.classes,
        
    }

    const newChild = new ChildModel(formData);

    newChild
    .save()
    .then(newChildData=>{
        res.json(newChildData);
    })
    .catch(err=>{
        res.json(err)
    });

});

module.exports = router;
