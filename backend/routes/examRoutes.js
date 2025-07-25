import express from "express";
import {
  getAllExams,
  getExamQuestions,
  addQuestions,
  addExams
} from "../controllers/examController.js";

const router = express.Router();

router.get("/", getAllExams);
router.get("/:id", getExamQuestions);
router.post("/", addExams);
router.post("/questions", addQuestions);

export default router;
