const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/commentModel')
// const users = require('../models/users')
const posts = require('../models/posts')
const allowStudent = require('../models/allowStudent')
const User = require('../models/userModel')




module.exports.index = async (req, res) => {
    try {
        const allowStudents = await allowStudent.find().sort({ createdAt: 1 })
        res.status(200).json(allowStudents)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        
          await allowStudent.findOneAndDelete({ userID: req.params.id })
        
        
        const UserDelete = await User.findOneAndDelete({ userID: req.params.id })
        // find the post, storing it in a varaible, then deleting it
        
        if ( UserDelete!=null){
        const post = await Posts.deleteMany({  user: UserDelete.username })
        // deleting all comments where the comment id
        if (post!=null){
            await Comments.deleteMany({ _id: {
                // matches any comment ids in the given array
                $in: post.comments   
            }})
        }
        }
        res.status(200).json({ message: 'successfully deleted' })
    } catch(err) {
        console.log(err.message,"herrrerer")
        res.status(400).json({ error: err.message })
    }
}



module.exports.create = async (req, res) => {
    console.log(req.body)
    try {
        const post = await allowStudent.create({ ...req.body, user: req.username })
        res.status(200).json(post)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

