const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();


//Body parser middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to mongo db
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB.....'))
    .catch(err => console.log('Error while connecting to database\n' + err))

//Use Routes
app.use('/api/items',items); 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));