import { Router } from "express";
import { getWatchPlayer } from "../services/watch.service";

const router = Router();

router.get("/sources", async (req, res) => {
  const { title, episode } = req.query;

  if (!title || !episode) {
    return res.status(400).json({
      error: "title and episode are required",
    });
  }

  const ANICLI_URL = process.env.ANICLI_URL;
  if (!ANICLI_URL) {
    return res.status(500).json({
      error: "ANICLI_URL is not defined",
    });
  }

  try {
    const response = await fetch(
      `${ANICLI_URL}/watch/sources?title=${encodeURIComponent(
        String(title)
      )}&episode=${episode}`
    );

    if (!response.ok) {
      throw new Error("anicli response not ok");
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      error: "anicli sources error",
    });
  }
});

router.get("/:animeId", async (req, res) => {
  const animeId = Number(req.params.animeId);
  const title = String(req.query.title);

  try {
    const data = await getWatchPlayer(animeId, title);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "watch player error",
    });
  }
});

export default router;
