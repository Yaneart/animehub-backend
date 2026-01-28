const ANICLI_URL = process.env.ANICLI_URL;

if (!ANICLI_URL) {
  throw new Error("ANICLI_URL is not defined");
}

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
