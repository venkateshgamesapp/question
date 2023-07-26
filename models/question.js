const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:false
  },
  Question: {
    type: String,
    required: [true, 'must provide Question']
  }
})


module.exports = mongoose.model('Question', QuestionSchema)
