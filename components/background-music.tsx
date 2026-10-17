"use client";

import { useEffect, useRef, useState } from "react";
import type { APlayer as APlayerInstance } from "aplayer-ts";
import { Pause, Play } from "lucide-react";

// Drop the audio file at public/music/rendezvous.mp3.
const TRACK = {
  name: "Rendezvous",
  artist: "Mili",
  url: "/music/rendezvous.mp3",
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "--:--";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

// aplayer-ts drives playback from a hidden container; this
// component only draws a single line of text in the site's own style.
export function BackgroundMusic() {
  const engineRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<APlayerInstance | null>(null);

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    let cancelled = false;
    let destroy: (() => void) | undefined;

    import("aplayer-ts").then(({ default: APlayer }) => {
      if (cancelled) return;

      const player = APlayer().init({
        container: engine,
        audio: TRACK,
        loop: "one",
        volume: 0.4,
        preload: "metadata",
        storageName: "kaiqin-bgm",
      });
      playerRef.current = player;

      player.on("play", () => setPlaying(true));
      player.on("pause", () => setPlaying(false));
      player.on("durationchange", () => setDuration(player.audio.duration));
      player.on("timeupdate", () => setTime(player.audio.currentTime));
      player.on("error", () => setFailed(true));

      // Browsers block audible autoplay, so start on the first interaction.
      const events = ["pointerdown", "keydown"] as const;
      const startOnInteraction = (event: Event) => {
        removeListeners();
        if (rootRef.current?.contains(event.target as Node)) return;
        player.play();
      };
      const removeListeners = () => {
        events.forEach((name) => window.removeEventListener(name, startOnInteraction));
      };
      events.forEach((name) => window.addEventListener(name, startOnInteraction));

      destroy = () => {
        removeListeners();
        playerRef.current = null;
        player.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  const progress = Number.isFinite(duration) && duration > 0 ? Math.min(time / duration, 1) : 0;

  const seek = (event: React.MouseEvent<HTMLDivElement>) => {
    const player = playerRef.current;
    if (!player || !Number.isFinite(duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    player.seek(((event.clientX - rect.left) / rect.width) * duration);
  };

  return (
    <>
      <div ref={engineRef} hidden aria-hidden="true" />
      {!failed && (
        <div
          ref={rootRef}
          className="fixed bottom-0 left-0 z-40 w-[min(22rem,100vw)] bg-background px-4 pb-2 pt-3 font-mono text-xs text-foreground sm:px-6 sm:pb-4"
        >
          <button
            type="button"
            onClick={() => playerRef.current?.toggle()}
            aria-label={`${playing ? "Pause" : "Play"} ${TRACK.name} by ${TRACK.artist}`}
            className="flex w-full items-center gap-3 text-left transition-opacity duration-normal hover:opacity-60"
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-2.5 shrink-0 fill-current" strokeWidth={0} />
            ) : (
              <Play aria-hidden="true" className="size-2.5 shrink-0 fill-current" strokeWidth={0} />
            )}
            <span className="min-w-0 truncate">
              {TRACK.name}
              <span className="text-muted-foreground"> — {TRACK.artist}</span>
            </span>
            <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">
              {formatTime(time)} / {formatTime(duration)}
            </span>
          </button>

          <div
            onClick={seek}
            data-cursor="interactive"
            aria-hidden="true"
            className="cursor-pointer py-2"
          >
            <div className="relative h-px bg-border">
              <div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
