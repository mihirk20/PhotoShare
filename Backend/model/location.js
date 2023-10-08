const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    pic: { type: String, required: true },
    address: { type: String, required: true },
    // userid: { type: String, required: true }
    userid: [{ type:mongoose.Schema.Types.ObjectId, required: true, Reference: "User" }]

});

module.exports = mongoose.model("Location", locationSchema);