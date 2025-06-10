// src/pages/forum.js

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ForumBoard from "../components/Forum/ForumBoard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function ForumPage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBoards() {
      setLoading(true);
      setError("");
      try {
        const boardsCol = collection(db, "forumBoards");
        const snapshot = await getDocs(boardsCol);
        const boardsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBoards(boardsData);
      } catch (e) {
        setError("Failed to load forum boards.");
      } finally {
        setLoading(false);
      }
    }
    fetchBoards();
  }, []);

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 pt-16 pb-20 bg-white rounded-xl shadow-card">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 select-none">
          Forum
        </h1>

        {loading && (
          <p className="text-center text-gray-600 text-lg">Loading boards...</p>
        )}

        {error && (
          <p role="alert" className="text-center text-red-600 text-lg">
            {error}
          </p>
        )}

        {!loading && !error && boards.length === 0 && (
          <p className="text-center text-gray-600 italic text-lg">
            No boards found.
          </p>
        )}

        {!loading && !error && boards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {boards.map((board) => (
              <ForumBoard
                key={board.id}
                boardName={board.name || board.id}
                posts={board.posts || []}
              />
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
