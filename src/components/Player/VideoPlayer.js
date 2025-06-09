// src/components/Player/VideoPlayer.js

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

/**
 * VideoPlayer - wraps Video.js player for M3U8/MP4 playback.
 * Props:
 *   - src: string (video URL) (required)
 *   - poster: string (optional poster image URL)
 *   - type: string ('application/x-mpegURL' for HLS, 'video/mp4' for MP4)
 */
export default function VideoPlayer({ src, poster, type = "application/x-mpegURL" }) {
  const videoNode = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    if (!videoNode.current) return;

    // Initialize Video.js player
    player.current = videojs(videoNode.current, {
      controls: true,
      preload: "auto",
      fluid: true, // responsive
      poster,
      controlBar: {
        volumePanel: { inline: false },
        pictureInPictureToggle: true,
      },
    });

    // Load source
    player.current.src({ src, type });

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [src, poster, type]);

  return (
    <div className="max-w-5xl mx-auto rounded-xl shadow-lg bg-black overflow-hidden">
      <video
        ref={videoNode}
        className="video-js vjs-big-play-centered"
        playsInline
        muted={false}
      />
    </div>
  );
}
