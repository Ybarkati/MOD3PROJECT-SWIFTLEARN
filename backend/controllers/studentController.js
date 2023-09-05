const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/commentModel')
// const users = require('../models/users')
const posts = require('../models/posts')
const allowStudent = require('../models/allowStudent')
const User = require('../models/userModel')




module.exports.index = async (req, res) => {
    try {
        console.log(req.username)
        const allowStudents = await allowStudent.find({user:req.username}).sort({ createdAt: 1 })
        res.status(200).json(allowStudents)
    } catch(err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        
          await allowStudent.findOneAndDelete({ code: req.params.id })
        
        
        const UserDelete = await User.findOneAndDelete({ code: req.params.id })
        // find the post, storing it in a varaible, then deleting it
        console.log(UserDelete,"heeeerewere")
        
        if ( UserDelete!=null){
        const post = await Posts.deleteMany({  user: UserDelete.username })
        // deleting all comments where the comment id
        console.log(post, "niceeeeeee")
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
    console.log(req.body,req.username,"hene-------")
    try {
        const post = await allowStudent.create({ ...req.body, user: req.username })
        console.log(post,"crevri----------------")
        res.status(200).json(post)
    } catch(err) {
        console.log("-----------------")
        console.log(err.message)
        res.status(400).json({ error: err.message })
        console.log("-----------------")

    }
}

