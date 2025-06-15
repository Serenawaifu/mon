import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CommentsSection from "../../components/Comments/CommentsSection";
import { useRouter } from "next/router"; // Use Next.js router
import { fetchAniList } from "../../lib/api/anilist";

export default function ManhwaDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Get dynamic route param

  const [manhwa, setManhwa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadManhwa() {
      setLoading(true);
      setError("");
      try {
        const query = `
          query ($id: Int) {
            Media(id: $id, type: MANGA, format_in: [MANGA, NOVEL]) {
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
              format
            }
          }
        `;
        const variables = { id: parseInt(id, 10) };
        const { data, error } = await fetchAniList(query, variables);

        if (error) {
          setError(error);
        } else if (data && data.Media) {
          setManhwa(data.Media);
        } else {
          setError("Manhwa not found.");
        }
      } catch {
        setError("Failed to load manhwa data.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadManhwa();
    }
  }, [id]);

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 bg-white rounded-xl shadow-card space-y-12">
        {loading ? (
          <p className="text-center text-gray-600 text-lg select-none">Loading…</p>
        ) : error ? (
          <p role="alert" className="text-center text-red-600 text-lg select-none">
            {error}
          </p>
        ) : manhwa ? (
          <>
            <section className="flex flex-col md:flex-row gap-10 items-start">
              <img
                src={manhwa.coverImage.extraLarge}
                alt={manhwa.title.english || manhwa.title.romaji}
                loading="lazy"
                className="w-full md:w-64 rounded-xl shadow-lg object-cover select-none"
              />
              <div className="flex-1">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4 select-text">
                  {manhwa.title.english || manhwa.title.romaji}
                </h1>

                {manhwa.averageScore != null && (
                  <p
                    className="text-yellow-500 text-lg font-semibold mb-2 select-none"
                    aria-label={`Average score ${manhwa.averageScore} out of 100`}
                  >
                    ★ {Math.round(manhwa.averageScore / 20)}/5 Stars
                  </p>
                )}

                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap select-text mb-4">
                  {manhwa.description}
                </p>

                <p className="text-gray-600 text-sm font-semibold select-none">
                  Chapters: {manhwa.chapters ?? "N/A"} | Volumes: {manhwa.volumes ?? "N/A"} | Format: {manhwa.format ?? "Unknown"}
                </p>
              </div>
            </section>

            <CommentsSection comments={[]} loading={false} />
          </>
        ) : (
          <p className="text-center text-gray-600 select-none">Manhwa not found.</p>
        )}
      </main>
    </Layout>
  );
    }
    
