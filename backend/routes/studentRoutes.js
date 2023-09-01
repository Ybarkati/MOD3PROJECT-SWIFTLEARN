const express = require('express')

const router = express.Router()

const postControl = require('../controllers/postController')
const studentControl=require('../controllers/studentController')
const { authorize } = require('../middleware/authMiddleware')

// seed 


// index
router.get('/', authorize,studentControl.index)

// delete
router.delete('/:id', authorize, studentControl.delete)


// create
router.post('/', authorize, studentControl.create)

// show


module.exports = router