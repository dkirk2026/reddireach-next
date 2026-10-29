'use client';

import { useState } from 'react';
import { videoEmbedSrc, videoThumbnail } from '@/lib/authors';

// Click-to-play YouTube embed. Shows the poster image until clicked, so a page
// with several interviews does not load several players up front.
export default function VideoEmbed({ video }) {
  const [playing, setPlaying] = useState(false);
  const label = `${video.show}: ${video.title}`;

  if (playing) {
    return (
      <iframe
        src={videoEmbedSrc(video, { autoplay: true })}
        title={label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <button type="button" className="au-play" onClick={() => setPlaying(true)} aria-label={`Play ${label}`}>
      <img src={videoThumbnail(video)} alt="" loading="lazy" />
      <span className="au-play-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
      </span>
    </button>
  );
}
