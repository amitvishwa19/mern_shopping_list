const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const ItemSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        required:false
    }
});


module.exports = item = mongoose.model('item', ItemSchema);