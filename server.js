const express = require('express');
const mongoose = require('mongoose');
var session = require("express-session");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const path = require('path');


require('dotenv').config();

const app = express();


//Body parser middleware
app.use(express.json());

//Passport Middleware
//require('./passport')(passport);
//app.use(passport.initialized());
//app.use(passport.session());


//Connect to mongo db
mongoose
    .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB.....'))
    .catch(err => console.log('Error while connecting to database\n' + err))

//Use Routes
app.use('/api/auth', require('./routes/api/auth.route')); //public
app.use('/api/post', require('./routes/api/posts.route'));

//serve static asset on production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname__, 'client', 'build', 'index.html'));
    })
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));