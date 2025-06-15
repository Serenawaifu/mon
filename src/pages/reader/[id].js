import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import MangaReader from "../../components/Reader/MangaReader";
import { getDocData } from "../../lib/firebase";

export default function MangaReaderPage() {
  const router = useRouter();
  const { id } = router.query;

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPages() {
      setLoading(true);
      try {
        if (!id) return;
        const data = await getDocData(`mangaPages/${id}`);
        if (data && data.pages) {
          setPages(data.pages);
        } else {
          setPages([]);
        }
      } catch {
        setPages([]);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadPages();
  }, [id]);

  return (
    <Layout>
      <main className="max-w-3xl mx-auto bg-white rounded-xl shadow-card p-6 min-h-screen">
        {loading ? (
          <p className="text-center text-gray-600">Loading reader…</p>
        ) : pages.length === 0 ? (
          <p className="text-center text-gray-600">No pages found.</p>
        ) : (
          <MangaReader pages={pages} />
        )}
      </main>
    </Layout>
  );
}
