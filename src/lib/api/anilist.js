const ANILIST_API = "https://graphql.anilist.co";

/**
 * Fetch data from AniList GraphQL API.
 * @param {string} query GraphQL query string
 * @param {object} variables Query variables
 * @returns {Promise<object>} API response data or error structure
 */
export async function fetchAniList(query, variables = {}) {
  if (!process.env.GATSBY_ANILIST_CLIENT_ID) {
    return { data: null, error: "AniList API not configured" };
  }

  try {
    const response = await fetch(ANILIST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const json = await response.json();

    if (json.errors) throw new Error(json.errors[0].message);
    return { data: json.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
