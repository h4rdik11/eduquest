const router = require("express").Router();
const QuestionModel = require("../model/question");

router.post("/get_score", async (request, response) => {
  const questions = request.body;
  let score = 0;
  for (let question in questions) {
    const questionTopics = questions[question];
    const questionTopicsDB = await QuestionModel.find({ _id: question });
    const questionTopicsDBTopics = questionTopicsDB[0].answers;
    if (
      questionTopicsDBTopics.includes(questionTopics[0]) &&
      questionTopicsDBTopics.includes(questionTopics[1])
    ) {
      score += 1;
    }
  }
  response.status(200).json({ score });
});

router.get("/", async (request, response) => {
  const topics = request.query.topic;
  const questions = await QuestionModel.find({ topics }).select("-answers");
  response.status(200).json({ questions });
});

router.get("/all", async (_, response) => {
  const questions = await QuestionModel.find({});
  response.status(200).json({ questions });
});

router.post("/", async (request, response) => {
  try {
    const data = request.body.data;
    const question = new QuestionModel(data);
    await question.save();
    response.status(200).json({ message: "Question created Successfully!!" });
  } catch (err) {
    console.log(err);
    response.status(200).json({ error: err });
  }
});

router.put("/", async (request, response) => {
  try {
    const data = request.body.data;
    await QuestionModel.findOneAndUpdate({ id: data._id }, data);
    response.status(200).json({ message: "Question updated Successfully!!" });
  } catch (err) {
    console.log(err);
    response.status(200).json({ error: err });
  }
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await QuestionModel.deleteOne({ _id: id });
  response.status(200).json({ message: "Question deleted successfully!!" });
});

module.exports = router;
