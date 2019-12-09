const express = require("express");
const router = express.Router();
const InboxModel = require("../models/InboxModel");
const ParentModel = require("../models/ParentModel");
//Testing Route
router.get("/", (req, res, next) => {
  res.json({
    //status: 200,
    message: "Working inbox router"
  });
});

//Listing All messages
router.get("/all", (req, res) => {
  InboxModel.find()
    .then(inboxResults => {
      res.json(inboxResults);
    })
    .catch(e => {
      console.log("Errors in Feed Listing", e);
    });
});


//Add New Feed

router.post("/send", (req, res) => {
  const inboxData = {
    title: req.body.title,
    sender: req.body.sender,
    receiver:req.body.receiver,
    messagebody: req.body.messagebody,
  };
  const newInbox = new InboxModel(inboxData);

  newInbox
    .save()
    .then(inboxResults => {
      res.json(inboxResults);
    })
    .catch(e => {
      console.log("Error in adding to inbox", e);
    });
});

//find by ID of message
router.post("/yourmessage", (req, res) => {
    const messageID = req.body.messageID;
    
        InboxModel.find({_id:messageID}) // chck syntax of ID
        .then(result => {
        res.json(result);
     })
    .catch(e => {
        console.log("Error in Inbox:", e);
      });
  });
//find by id of receiver
router.post("/yourinbox", (req, res) => {
    const userID = req.body.id;
    const user = req.body.user;
    let email = "hello";

    if(user==='parent')
    ParentModel.find({_id:userID})
    .then(parent=>{
        //res.json(parent);
        email = parent[0].email;
        InboxModel.find({receiver:email}) // chck syntax of ID
        .then(result => {
        res.json(result);
     })
    })
    .catch(e => {
        console.log("Error in Inbox:", e);
      });
  });
//Delete Feed

router.delete("/delete", (req, res) => {
  const messageID = req.body.id;
  InboxModel.findByIdAndDelete(messageID)
    .then(delResult => {
      res.json(delResult);
    })
    .catch(e => {
      console.log("Error in Inbox:", e);
    });
});

module.exports = router;