const Question = require('../models/question')
const { StatusCodes } = require('http-status-codes')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({})
    if (!questions || questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "No questions found." })
    }
    res.status(StatusCodes.OK).json({ questions })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching questions." })
  }
};

const createQuestion = asyncWrapper(async (req, res) => {
  const questions = await Question.create(req.body)
  res.status(StatusCodes.CREATED).json({ questions })
})


const getQuestion = async (req, res, next) => {
  try {
    const { id: questionId } = req.params;
    const question = await Question.findOne({ id: questionId });
    if (!question) {
      return next(createCustomError(`No Question with id : ${questionId}`, 404));
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the question." });
  }
};




module.exports = {
  getAllQuestions,
  createQuestion,
  getQuestion
}
