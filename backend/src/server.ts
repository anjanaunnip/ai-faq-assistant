import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import faqRoutes from "./routes/faq.routes";
import aiRoutes from "./ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/faqs", faqRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api", (_req, res) => {
  res.send("FAQ API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

