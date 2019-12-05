const FeedModel = require('../models/FeedModel');
const ParentModel = require('../models/ParentModel');
const ChildModel = require('../models/ChildModel');
const express = require('express');
const router = express.Router();

router.post('/newfeed', (req, res)=>{
    const formData = {
        username: req.body.username,
        image: req.body.image,
        tags: req.body.tags,
        likes: req.body.likes,
        shares: req.body.shares,
        comments: req.body.comments,
        description: req.body.description,
        title: req.body.title
    }

    const newFeed = new FeedModel(formData);

    newFeed
    .save()
    .then(newFeedData=>{
        res.json(newFeedData);
    })
    .catch(err=>{
        res.json(err)
    });

});


router.post('/addlike', async (req, res)=>{
    
    let userLikes;
    let theFeedID = req.body.feedid;
    console.log('feedid',theFeedID)
    console.log('userID',req.user.id)
    let userID = req.user.id;//req.user.id doesnt work!!!!! req.user.id
    
    // 1. Get the document with matching id
    let theDocument = await FeedModel
    .find({_id: theFeedID}) // promise
    .catch(err=>{
        res.send(err)
    })
    // 2. Extract the likes from the document
    userLikes = theDocument[0].likes;

    // 3. Push the new like to the array
    if(userLikes.includes(userID))
    {
     userLikes.splice(userLikes.indexOf(userID),1);
    }
    else
    {
    userLikes.push(userID);
    }   
    // 4. Update the document
    FeedModel
    .updateOne(
        {_id: theFeedID},
        {likes: userLikes}
    ) //promise
    .then(theFeed=>{
        res.json(theFeed)
    })
    .catch(err=>{
        res.json(err)
    });
//remove like
});


router.post( 
    '/mychildren',
    (req, res)=> {
let childrenArray=[];
        ParentModel.find({"_id": req.body.id})//find parent with this id
        .then((users)=>{
            let children = users[0].children //get children id of parent
            console.log(children)
            
            ChildModel.find({"_id":{$in:users[0].children}}).then(childrenArray=>{res.json(childrenArray)}).catch(err=>console.log(err))
        })

        .catch((err)=>console.log(err))
    });

    router.post( 
        '/mychildfeed',
        (req, res)=> {
            let groups = req.body.groups; //array of groups for child
            console.log(groups)
            FeedModel.find({"seenBy":{$in:groups}}).then(feed=>{res.json(feed)}).catch(err=>console.log(err))
        })

module.exports = router;