// src/pages/reader/[id].js

import React, { useEffect, useState } from "react";
import { useParams } from "@reach/router";
import Layout from "../../components/Layout/Layout";
import MangaReader from "../../components/Reader/MangaReader";
import { getDocData } from "../../lib/firebase";

export default function MangaReaderPage() {
  const { id } = useParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPages() {
      setLoading(true);
      try {
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
