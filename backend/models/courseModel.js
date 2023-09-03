const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({

   courseId: { 
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
   title: { 
      type: String, 
      required: true ,
   },
   user: { 
      type: String, 
      required: true 
   },
   
}, { timestamps: true })

const Courses = mongoose.model('courses', courseSchema)

module.exports = Courses