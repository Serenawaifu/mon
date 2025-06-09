// src/hooks/useAnimeAPI.js

import { useQuery } from "react-query";

const ANILIST_GRAPHQL_URL = "https://graphql.anilist.co";

async function fetchAniList(query, variables = {}) {
  // Graceful fallback if env not set
  if (!process.env.GATSBY_ANILIST_CLIENT_ID) {
    return { data: null, error: "AniList API not configured" };
  }
  const res = await fetch(ANILIST_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

/**
 * useAnimeSearch - fetches anime titles by search term.
 * @param {string} searchTerm
 */
export function useAnimeSearch(searchTerm) {
  return useQuery(
    ["animeSearch", searchTerm],
    () =>
      fetchAniList(
        `
      query ($search: String) {
        Page(perPage: 10) {
          media(search: $search, type: ANIME) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            averageScore
            episodes
          }
        }
      }
    `,
        { search: searchTerm }
      ),
    {
      enabled: Boolean(searchTerm),
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
      retry: 1, // retry once on failure
    }
  );
}
