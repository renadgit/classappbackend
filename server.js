// Imports the express package into your file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const UserRoutes = require('./routes/UserRoutes');
const InboxRoutes = require('./routes/InboxRoutes');
const FeedRoutes = require('./routes/FeedRoutes');
const PageRoutes = require('./routes/PageRoutes');
const ParentRoutes = require('./routes/ParentRoutes');
const TeacherRoutes = require('./routes/TeacherRoutes');
const ChildRoutes = require('./routes/ChildRoutes');

const initPassportStrategy = require('./config/passport')
// Create an express app
const app = express();
app.use(cors()); // normally takes the whitelisted ips but here allows all so express doesnt block from backend

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
initPassportStrategy(passport);

const db = process.env.MONGO_URI;
mongoose
.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}) //Promise
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>{
    console.log('error', err)
})

/*app.get('/parent/find', passport.authenticate('jwt', {session: false}),(req, res)=>{
    
    console.log(req.user.id)
    
    ParentModel.find({_id: req.user.id})
    .then(theParent=>{
        res.json(theParent);
    })
    .catch(err=>{
        res.send(err)

    })
    console.log("theparent",theParent)
});*/

app.use('/users',UserRoutes);
app.use('/parent',ParentRoutes);
app.use('/Teacher',TeacherRoutes);
app.use('/feed',FeedRoutes);
app.use('/child',ChildRoutes);
app.use('/inbox',InboxRoutes);


// app.use(
//     '/feed',
//     passport.authenticate('jwt', {session: false}),
//     FeedRoutes
// );
app.use('/',PageRoutes);
/*
    Our first route
    First argument: route address
    Second argument: callback
*/



app.listen(process.env.PORT || 3000, ()=>{
    console.log('You are connected!')
})