// src/pages/anime/[id].js

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CommentsSection from "../../components/Comments/CommentsSection";
import { useParams } from "@reach/router";
import { fetchAniList } from "../../lib/api/anilist";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnime() {
      setLoading(true);
      try {
        const query = `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
                english
              }
              description(asHtml: false)
              coverImage {
                extraLarge
              }
              averageScore
            }
          }
        `;
        const variables = { id: parseInt(id, 10) };
        const { data, error } = await fetchAniList(query, variables);
        if (error) {
          setError(error);
        } else {
          setAnime(data.Media);
        }
      } catch (e) {
        setError("Failed to load anime data.");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadAnime();
  }, [id]);

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 bg-white rounded-xl shadow-card space-y-12">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : anime ? (
          <>
            {/* Header with poster and title */}
            <section className="flex flex-col md:flex-row gap-10 items-start">
              <img
                src={anime.coverImage.extraLarge}
                alt={anime.title.english || anime.title.romaji}
                className="w-full md:w-64 rounded-xl shadow-lg object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                  {anime.title.english || anime.title.romaji}
                </h1>
                {anime.averageScore != null && (
                  <p className="text-yellow-500 text-lg font-semibold mb-2" aria-label={`Average score ${anime.averageScore} out of 100`}>
                    ★ {Math.round(anime.averageScore / 20)}/5 Stars
                  </p>
                )}
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                  {anime.description}
                </p>
              </div>
            </section>

            {/* Comments Section - placeholder */}
            <CommentsSection comments={[]} loading={false} />
          </>
        ) : (
          <p className="text-center text-gray-600">Anime not found.</p>
        )}
      </main>
    </Layout>
  );
                  }
                      
