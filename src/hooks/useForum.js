// src/hooks/useForum.js

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/**
 * useForumPosts - subscribes to posts in a forum board, ordered by createdAt desc
 * @param {string} boardId - forum board identifier
 */
export function useForumPosts(boardId) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!boardId) return;

    const postsRef = collection(db, "forum", boardId, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
        setPosts(docs);
        setLoading(false);
      },
      () => {
        setPosts([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [boardId]);

  return { posts, loading };
}
