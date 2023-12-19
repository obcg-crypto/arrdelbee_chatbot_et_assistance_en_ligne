const express = require('express')
const router = express.Router()
const messageCtrl = require('../controllers/message')

router.post('/post', messageCtrl.postMessage)
router.get('/getAll', messageCtrl.getAllMessage) 
router.get('/getUserMessage', messageCtrl.getUserMessage) // Discussion

module.exports = router