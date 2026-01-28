import express from "express";
import cors from "cors";
import watchRouter from "./routes/watch.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/watch", watchRouter);

app.listen(3001, () => {
  console.log("🚀 Watch backend running on http://localhost:3001");
});
