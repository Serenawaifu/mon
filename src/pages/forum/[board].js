// src/pages/forum/[board].js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "@reach/router";
import Layout from "../../components/Layout/Layout";
import ForumBoard from "../../components/Forum/ForumBoard";
import { db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export default function ForumBoardPage() {
  const { board } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!board) return;

    setLoading(true);
    setError("");

    const postsRef = collection(db, "forum", board, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(docs);
        setLoading(false);
      },
      (err) => {
        setError("Failed to load posts.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [board]);

  return (
    <Layout>
      <main className="max-w-screen-xl mx-auto px-6 md:px-8 pt-16 pb-20 bg-white rounded-xl shadow-card min-h-screen">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 select-none capitalize">
          {board} Board
        </h1>

        <Link
          to="/forum"
          className="text-sm text-gray-600 hover:text-gray-900 transition mb-8 inline-block"
        >
          ← Back to Forum overview
        </Link>

        {loading && (
          <p className="text-center text-gray-600">Loading posts...</p>
        )}

        {error && (
          <p role="alert" className="text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-600 italic">No posts yet.</p>
        )}

        {!loading && posts.length > 0 && (
          <ul className="space-y-8">
            {posts.map(({ id, title, author, createdAt, commentCount }) => (
              <li
                key={id}
                className="p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  to={`/forum/post/${id}`}
                  className="block"
                  aria-label={`View post titled ${title}`}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {title}
                  </h2>
                </Link>
                <div className="text-gray-600 text-sm flex flex-wrap gap-4">
                  <span>
                    Posted by <strong>{author}</strong>
                  </span>
                  <span>
                    {new Date(createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>{commentCount ?? 0} comments</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  );
          }
          
