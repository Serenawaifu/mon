const KITSU_API = "https://kitsu.io/api/edge";

const KITSU_CLIENT_ID = process.env.GATSBY_KITSU_CLIENT_ID || null;
const KITSU_CLIENT_SECRET = process.env.GATSBY_KITSU_CLIENT_SECRET || null;

export async function fetchKitsu(resource, params = {}) {
  if (!KITSU_CLIENT_ID) {
    return { data: null, error: "Kitsu API not configured" };
  }

  const url = new URL(`${KITSU_API}/${resource}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
    });
    if (!res.ok) throw new Error(`Kitsu API error: ${res.status}`);
    const json = await res.json();
    return { data: json, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
