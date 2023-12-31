const express = require('express')

const router = express.Router()

const commentControl = require('../controllers/commentController')

const { authorize } = require('../middleware/authMiddleware')

// index
// router.get('/:postId', commentControl.index)

// delete
router.delete('/:postId/:commentId',authorize, commentControl.delete)

// update
router.put('/:commentId', commentControl.update)

// create
router.post('/:postId',authorize, commentControl.create)

// show
router.get('/:commentId', commentControl.show)


module.exports = router