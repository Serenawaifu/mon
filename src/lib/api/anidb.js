const ANIDB_API = "https://api.anidb.net/api";

const ANIDB_USERNAME = process.env.NEXT_PUBLIC_ANIDB_USERNAME; // Updated for Next.js
const ANIDB_PASSWORD = process.env.NEXT_PUBLIC_ANIDB_PASSWORD; // Updated for Next.js

export async function fetchAniDB(queryParams) {
  if (!ANIDB_USERNAME || !ANIDB_PASSWORD) {
    return { data: null, error: "AniDB API not configured" };
  }

  const url = new URL(ANIDB_API);
  Object.entries(queryParams).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );
  // Add auth params
  url.searchParams.append("user", ANIDB_USERNAME);
  url.searchParams.append("pass", ANIDB_PASSWORD);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const text = await response.text();
    // AniDB returns XML; further parsing logic can be implemented here
    return { data: text, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
