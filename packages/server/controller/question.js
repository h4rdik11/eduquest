const router = require("express").Router();
const QuestionModel = require("../model/question");

router.get("/", async (request, response) => {
  const topics = request.query.topic;
  const questions = await QuestionModel.find({ topics: { $in: topics } });
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

router.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await QuestionModel.deleteOne({ _id: id });
  response.status(200).json({ message: "Question deleted successfully!!" });
});

module.exports = router;