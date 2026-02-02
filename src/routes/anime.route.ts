import { Router } from "express";
import { jikanApi } from "../services/jikan.service";
import { getCache, setCache } from "../lib/cache";

const router = Router();

router.get("/random", async (req, res) => {
  const cacheKey = "anime:random";
  const cached = getCache(cacheKey);

  if (cached) {
    return res.json(cached);
  }

  try {
    const { data } = await jikanApi.get("/random/anime");
    setCache(cacheKey, data, 30_000); // 30 сек
    res.json(data);
  } catch (e: any) {
    res.status(e.response?.status || 500).json({
      message: "Jikan error",
    });
  }
});

router.get("/list", async (req, res) => {
  const query = new URLSearchParams(req.query as any).toString();
  const cacheKey = `anime:list:${query}`;

  const cached = getCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const { data } = await jikanApi.get(`/anime?${query}`);
    setCache(cacheKey, data, 60_000);
    res.json(data);
  } catch (e: any) {
    res.status(e.response?.status || 500).json({
      message: "Jikan error",
    });
  }
});

export default router;
