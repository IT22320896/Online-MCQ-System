import Exam from "../models/Exam.js";
import Question from "../models/Question.js";

const getAllExams = async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
};

const getExamQuestions = async (req, res) => {
  const { id } = req.params;
  const questions = await Question.find({ examId: id });
  res.json(questions);
};

export { getAllExams, getExamQuestions };
