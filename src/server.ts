import express from "express";
import cors from "cors";
import watchRouter from "./routes/watch.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/watch", watchRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Watch backend running on port ${PORT}`);
});
