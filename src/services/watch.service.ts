const ANICLI_URL =
  process.env.ANICLI_URL || "http://localhost:8001";

export async function getWatchPlayer(
  animeId: number,
  title: string
) {
  const response = await fetch(
    `${ANICLI_URL}/watch?title=${encodeURIComponent(title)}`
  );

  if (!response.ok) {
    throw new Error("anicli service error");
  }

  const data = await response.json();

  return {
    animeId,
    embedUrl: data.embedUrl,
  };
}
