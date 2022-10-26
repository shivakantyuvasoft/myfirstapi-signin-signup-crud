const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    age:Number,
    school:String
})

module.exports = mongoose.model('Student',studentSchema);