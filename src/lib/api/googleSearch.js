const GOOGLE_CSE_API = "https://www.googleapis.com/customsearch/v1";

const GOOGLE_CSE_KEY = process.env.GATSBY_GOOGLE_CSE_KEY || null;
const GOOGLE_CSE_ID = process.env.GATSBY_GOOGLE_CSE_ID || null;

export async function fetchGoogleSearch(query, num = 5) {
  if (!GOOGLE_CSE_KEY || !GOOGLE_CSE_ID) {
    return { data: null, error: "Google Custom Search API not configured" };
  }

  const url = new URL(GOOGLE_CSE_API);
  url.searchParams.append("key", GOOGLE_CSE_KEY);
  url.searchParams.append("cx", GOOGLE_CSE_ID);
  url.searchParams.append("q", query);
  url.searchParams.append("searchType", "image");
  url.searchParams.append("num", num);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Google Search API error: ${res.status}`);
    const json = await res.json();
    return { data: json, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
