const MAL_API_BASE = "https://api.myanimelist.net/v2";

const MAL_CLIENT_ID = process.env.GATSBY_MAL_CLIENT_ID || null;

export async function fetchMAL(resource, params = {}) {
  if (!MAL_CLIENT_ID) {
    return { data: null, error: "MyAnimeList API not configured" };
  }

  const url = new URL(`${MAL_API_BASE}/${resource}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  try {
    const res = await fetch(url.toString(), {
      headers: { "X-MAL-CLIENT-ID": MAL_CLIENT_ID },
    });
    if (!res.ok) throw new Error(`MyAnimeList API error: ${res.status}`);
    const json = await res.json();
    return { data: json, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
