const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const exerciseSchema = new Schema(
    {
        user: { type:String, required:true },
        description: { type:String, required:true },
        duration: { type:Number, required:true },
        date: { type:Date, required:true }
    },
    {
        timestamps:true,
    }
)

module.exports = Exercise = mongoose.model('Exercise', exerciseSchema);