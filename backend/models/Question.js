import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  questionText: String,
  options: [String],
  correctOption: Number,
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
