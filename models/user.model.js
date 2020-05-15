const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const userSchema = new Schema(
    {
        name: { type: String, trim: true, required: false },
        email: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = user = mongoose.model('user', userSchema);