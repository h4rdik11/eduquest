const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  topics: String,
  answers: Array(String),
});

module.exports = mongoose.model("Question", QuestionSchema);
