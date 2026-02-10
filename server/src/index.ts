import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/todos", todoRoutes);

app.listen(4000, () => {
  console.log("🚀 API running at http://localhost:4000");
});
