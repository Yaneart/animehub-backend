import { Router } from "express";
import { getWatchPlayer } from "../services/watch.service";

const router = Router();

const ANICLI_URL =
  process.env.ANICLI_URL || "http://localhost:8001";

/**
 * =========================
 * 🔥 WATCH SOURCES
 * =========================
 * ВАЖНО: этот роут ДОЛЖЕН быть ВЫШЕ `/:animeId`
 */
router.get("/sources", async (req, res) => {
  const { title, episode } = req.query;

  if (!title || !episode) {
    return res.status(400).json({
      error: "title and episode are required",
    });
  }

  try {
    const response = await fetch(
      `${ANICLI_URL}/watch/sources?title=${encodeURIComponent(
        String(title)
      )}&episode=${episode}`
    );

    if (!response.ok) {
      return res.status(500).json({
        error: "anicli sources error",
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      error: "anicli service unavailable",
    });
  }
});

/**
 * =========================
 * 🔒 WATCH v1 (STABLE)
 * =========================
 */
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
