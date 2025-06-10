// src/pages/manga/[id].js

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CommentsSection from "../../components/Comments/CommentsSection";
import { useParams } from "@reach/router";
import { fetchAniList } from "../../lib/api/anilist";

export default function MangaDetailPage() {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadManga() {
      setLoading(true);
      try {
        const query = `
          query ($id: Int) {
            Media(id: $id, type: MANGA) {
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
              chapters
              volumes
            }
          }
        `;
        const variables = { id: parseInt(id, 10) };
        const { data, error } = await fetchAniList(query, variables);
        if (error) {
          setError(error);
        } else {
          setManga(data.Media);
        }
      } catch (e) {
        setError("Failed to load manga data.");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadManga();
  }, [id]);

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 bg-white rounded-xl shadow-card space-y-12">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : manga ? (
          <>
            <section className="flex flex-col md:flex-row gap-10 items-start">
              <img
                src={manga.coverImage.extraLarge}
                alt={manga.title.english || manga.title.romaji}
                className="w-full md:w-64 rounded-xl shadow-lg object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                  {manga.title.english || manga.title.romaji}
                </h1>
                {manga.averageScore != null && (
                  <p className="text-yellow-500 text-lg font-semibold mb-2" aria-label={`Average score ${manga.averageScore} out of 100`}>
                    ★ {Math.round(manga.averageScore / 20)}/5 Stars
                  </p>
                )}
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap mb-4">
                  {manga.description}
                </p>
                <p className="text-gray-600 text-sm font-semibold">
                  Chapters: {manga.chapters ?? "N/A"} | Volumes: {manga.volumes ?? "N/A"}
                </p>
              </div>
            </section>

            <CommentsSection comments={[]} loading={false} />
          </>
        ) : (
          <p className="text-center text-gray-600">Manga not found.</p>
        )}
      </main>
    </Layout>
  );
}
