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

const addExams = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addQuestions = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAllExams, getExamQuestions, addQuestions, addExams };
