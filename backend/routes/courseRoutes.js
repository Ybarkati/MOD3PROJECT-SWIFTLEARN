const express = require('express')

const router = express.Router()

const courseControl=require("../controllers/courseController")
const { authorize } = require('../middleware/authMiddleware')


// index
router.get('/', authorize, courseControl.index)

// delete
router.delete('/:id', authorize, courseControl.delete)

// update
router.put('/:id', authorize, courseControl.update)

// create
router.post('/', authorize, courseControl.create)

// show
router.get('/:id', courseControl.show)

module.exports = router