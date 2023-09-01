const express = require('express')

const router = express.Router()

const emailController = require('../controllers/emailController')



// create
router.post('/', emailController.create)




module.exports = router