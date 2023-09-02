const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true 
    },
    user: { 
        type: String, 
        required: true 
     },
     name:{
        type:String,
        required: true
     }
})

const allowStudent = mongoose.model('allowStudent', userSchema)
module.exports = allowStudent