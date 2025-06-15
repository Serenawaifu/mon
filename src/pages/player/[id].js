import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Use Next.js router
import Layout from "../../components/Layout/Layout";
import VideoPlayer from "../../components/Player/VideoPlayer";
import { getDocData } from "../../lib/firebase";

export default function VideoPlayerPage() {
  const router = useRouter();
  const { id } = router.query; // Get dynamic route param

  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideo() {
      setLoading(true);
      try {
        // Assume Firestore doc contains video stream URL for episode id
        const data = await getDocData(`videoStreams/${id}`);
        if (data && data.url) {
          setVideoUrl(data.url);
        } else {
          setVideoUrl(null);
        }
      } catch {
        setVideoUrl(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadVideo();
  }, [id]);

  return (
    <Layout>
      <main className="max-w-5xl mx-auto py-16 px-6 bg-white rounded-xl shadow-card min-h-screen">
        {loading ? (
          <p className="text-center text-gray-600">Loading video player…</p>
        ) : videoUrl ? (
          <VideoPlayer src={videoUrl} type="application/x-mpegURL" />
        ) : (
          <p className="text-center text-gray-600">Video not found.</p>
        )}
      </main>
    </Layout>
  );
    }
