import express from "express";
import {
  getAllExams,
  getExamQuestions,
} from "../controllers/examController.js";

const router = express.Router();

router.get("/", getAllExams);
router.get("/:id", getExamQuestions);

export default router;
