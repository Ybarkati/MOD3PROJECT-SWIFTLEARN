const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
   // homeworkId:submit,
   // ableDownload:isChecked,
   // Published:isPublished,
   // due:date,
   // title:titleValue,
   homeworkId: { 
      type: String, 
      required: true 
   },
   ableDownload: { 
      type: String, 
      default:false 
   },
   Published: { 
      type: String, 
      default:false 
   },
   due: { 
      type: String, 
       
   },
   title: { 
      type: String, 
      required: true ,
   },
   user: { 
      type: String, 
      required: true 
   },
   // comments field here
   comments: [{
      // an id referencing the comment document
      type: mongoose.Types.ObjectId,
      // search for it in the comments collection
      ref: 'comments'
   }]
}, { timestamps: true })

const Post = mongoose.model('posts', postSchema)

module.exports = Post