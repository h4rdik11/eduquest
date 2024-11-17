const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  topics: Array(String),
});

module.exports = mongoose.model("Question", QuestionSchema);
