import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runQuestion } from "./server.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "question is missing" });
  }

  try {
    const answer = await runQuestion(question);
    return res.json({ response: answer });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({ error: "Failed to get an answer" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});