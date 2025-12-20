import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

/**
 * GET /faqs
 */
router.get("/", async (_req: Request, res: Response) => {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(faqs);
});

/**
 * POST /faqs
 */
router.post("/", async (req: Request, res: Response) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: "Both fields required" });
  }

  const faq = await prisma.fAQ.create({
    data: { question, answer },
  });

  res.status(201).json(faq);
});

/**
 * PUT /faqs/:id
 */
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const updated = await prisma.fAQ.update({
      where: { id },
      data: { question, answer },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ message: "FAQ not found" });
  }
});

/**
 * DELETE /faqs/:id
 */
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.fAQ.delete({ where: { id } });
    res.json({ message: "FAQ deleted" });
  } catch {
    res.status(404).json({ message: "FAQ not found" });
  }
});

export default router;
