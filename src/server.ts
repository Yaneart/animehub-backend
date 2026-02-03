import "dotenv/config";
import express from "express";
import cors from "cors";
import watchRouter from "./routes/watch.route";
import animeRoutes from "./routes/anime.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/watch", watchRouter);
app.use("/api/anime", animeRoutes);
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Watch backend running on port ${PORT}`);
});
