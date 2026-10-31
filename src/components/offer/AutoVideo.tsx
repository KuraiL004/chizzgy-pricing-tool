"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AutoVideoProps {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}

// Ekrana girəndə səssiz oynayır, çıxanda dayanır. Səs düyməsi ilə açılır.
export function AutoVideo({ src, poster, label, className }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden bg-elevated ${className ?? ""}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Səsi aç" : "Səsi bağla"}
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center text-white"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
