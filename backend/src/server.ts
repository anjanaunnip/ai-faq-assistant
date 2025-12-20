import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import faqRoutes from "./routes/faq.routes";
import aiRoutes from "./ai";   

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/faqs", faqRoutes);
app.use("/ai", aiRoutes);     
app.get("/", (_req, res) => {
  res.send("FAQ API running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
