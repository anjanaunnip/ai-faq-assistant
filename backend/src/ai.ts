import { Router, Request, Response } from "express";
import Groq from "groq-sdk";

const router = Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

router.post("/rewrite", async (req: Request, res: Response) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ message: "Answer is required" });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", 
      messages: [
        {
          role: "system",
          content: "Rewrite the text in clear, professional English.",
        },
        {
          role: "user",
          content: answer,
        },
      ],
      temperature: 0.3,
    });

    const rewritten =
      completion.choices[0]?.message?.content || answer;

    res.json({ rewrittenAnswer: rewritten });
  } catch (error) {
    console.error("Groq AI Error:", error);
    res.status(500).json({ message: "AI rewrite failed" });
  }
});

export default router;
