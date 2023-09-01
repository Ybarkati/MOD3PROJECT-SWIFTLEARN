const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    role:{
        type:String,
        require:true,
        enum:["teacher","student"],
        default:"student"
    },
    allowStudent: [{
        // an id referencing the allowStudent document
        type: mongoose.Types.ObjectId,
        // search for it in the allowStudent collection
        ref: 'allowStudent'
     }],
     UserID:{
        type:String,
     }
     
})

const User = mongoose.model('User', userSchema)

module.exports = User