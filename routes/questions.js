const express = require('express')
const router = express.Router()

const {
  getAllQuestions,
  createQuestion,
  getQuestion
} = require('../controllers/question')

router.route('/').get(getAllQuestions).post(createQuestion)
router.route('/:id').get(getQuestion)
module.exports = router
