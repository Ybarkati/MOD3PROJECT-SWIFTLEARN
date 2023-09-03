const Posts = require('../models/postModel')
const Courses=require("../models/courseModel")
const Comments = require('../models/commentModel')
const Users = require('../models/commentModel')
// const users = require('../models/users')
const posts = require('../models/posts')
const allowStudent = require('../models/allowStudent')
const User = require('../models/userModel')




module.exports.index = async (req, res) => {
    const currentUser=await User.find({username:req.username})
    if (currentUser[0].role=="student"){
        
        try {
            
            const teacher=await allowStudent.find({code:currentUser[0].code})
            const course = await Courses.find({user:teacher[0].user,Published:"true"}).sort({ createdAt: -1 })
            res.status(200).json(course)
        } catch(err) {
            console.log(err.message)
            res.status(400).json({ error: err.message })
        }

    }else{
        try {
            const course = await Courses.find({user:req.username}).sort({ createdAt: -1 })
            res.status(200).json(course)
        } catch(err) {
            console.log(err.message)
            res.status(400).json({ error: err.message })
        }
    }
    
}

module.exports.delete = async (req, res) => {
    try {
        // find the post, storing it in a varaible, then deleting it
        const post = await Courses.findOneAndDelete({ _id: req.params.id, user: req.username })
        // deleting all comments where the comment id
        res.status(200).json({ message: 'successfully deleted' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedCourse = await Courses.findOneAndUpdate({ _id: req.params.id, user: req.username }, req.body, { new: true })
        
        // If updatedCourse comes back null, that means the document was not found using the
        // user id from the middleware and it's likely the wrong user requesting the document
        if (!updatedCourse) {
            throw new Error('Access denied')
        }
        console.log('updated post:')
        console.log(updatedCourse)
        res.status(200).json(updatedCourse)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const course = await Courses.create({ ...req.body, user: req.username })
        res.status(200).json(course)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    console.log('Show:')
    try {
        // populate replaces the ids with actual documents/objects we can use
        const course = await Courses.findById(req.params.id)
        console.log(course)
        res.status(200).json(course)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}