import Result from "../models/Result.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

const submitAnswers = async (req, res) => {
  const { userId, answers } = req.body;
  const { examId } = req.params;

  let score = 0;
  const answerDocs = [];

  for (let ans of answers) {
    const question = await Question.findById(ans.questionId);
    const isCorrect = question.correctOption === ans.selectedOption;
    if (isCorrect) score++;

    answerDocs.push({
      questionId: ans.questionId,
      selectedOption: ans.selectedOption,
      isCorrect,
    });
  }

  const result = await Result.create({ userId, examId, score });

  for (let ans of answerDocs) {
    await Answer.create({ ...ans, resultId: result._id });
  }

  res.json({ resultId: result._id, score });
};

const getUserResults = async (req, res) => {
  const results = await Result.find({ userId: req.params.userId }).populate(
    "examId"
  );
  res.json(results);
};

export { submitAnswers, getUserResults };
