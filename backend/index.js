import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import examRoutes from "./routes/examRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/login", resultRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
