// src/hooks/useMangaAPI.js

import { useQuery } from "react-query";

const ANILIST_GRAPHQL_URL = "https://graphql.anilist.co";

/**
 * useMangaSearch - fetches manga titles by search term.
 * @param {string} searchTerm
 */
export function useMangaSearch(searchTerm) {
  return useQuery(
    ["mangaSearch", searchTerm],
    () =>
      fetch(ANILIST_GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
        query ($search: String) {
          Page(perPage: 10) {
            media(search: $search, type: MANGA) {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              chapters
              volumes
            }
          }
        }
        `,
          variables: { search: searchTerm },
        }),
      }).then(async (res) => {
        if (!res.ok) throw new Error("API request failed");
        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        return json.data;
      }),
    {
      enabled: Boolean(searchTerm),
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );
}
