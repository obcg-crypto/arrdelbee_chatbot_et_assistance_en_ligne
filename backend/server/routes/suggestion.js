const express = require('express')
const router = express.Router()
const suggestionCtrl = require('../controllers/suggestion')

router.post('/post', suggestionCtrl.postSuggestion)
router.get('/getAll', suggestionCtrl.getAllSuggestion)

module.exports = router