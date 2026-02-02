type CacheValue = {
  data: any;
  expiresAt: number;
};

const cache = new Map<string, CacheValue>();

export const getCache = (key: string) => {
  const item = cache.get(key);
  if (!item) return null;

  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }

  return item.data;
};

export const setCache = (key: string, data: any, ttl = 60_000) => {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
};
