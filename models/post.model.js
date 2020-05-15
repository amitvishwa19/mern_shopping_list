const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const PostSchema = new Schema(
    {
        title: {type:String, required:true },
        body: {type:String, required:true },
        author: {type:String, required:true },
    },
    {
        timestamps:true,    
    }
);


module.exports = post = mongoose.model('post', PostSchema);