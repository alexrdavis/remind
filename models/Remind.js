const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
    name: String,
    userId: String,
    date: Date
})

module.exports = mongoose.model('Remind', schema)