import express from "express";
import {
  submitAnswers,
  getUserResults,
} from "../controllers/resultController.js";

const router = express.Router();

router.post("/submit/:examId", submitAnswers);
router.get("/:userId", getUserResults);

export default router;
