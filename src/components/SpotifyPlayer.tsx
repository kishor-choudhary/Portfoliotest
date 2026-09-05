import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Config — Kishor's Spotify playlist                                 */
/* ------------------------------------------------------------------ */
const PLAYLIST_ID = "3fTcnpBj72vxkEbYh7O37u";
const PLAYLIST_SI = "279b47d9a6b142fa";
const PLAYLIST_TITLE = "fav of all time";

const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}?si=${PLAYLIST_SI}`;
const EMBED_URL = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;

/* 300x300 mosaic cover supplied by Spotify's oEmbed thumbnail endpoint */
const COVER_URL =
  "https://mosaic.scdn.co/300/ab67616d00001e0213b3e37318a0c247b550bccdab67616d00001e0281f04c407e0ec68e3dea6b2cab67616d00001e02925b6102fc5edac08ec995b5ab67616d00001e02b09403f05bc0c306cf96990f";

/* Spotify brand glyph (simple-icons path) */
function SpotifyGlyph({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export default function SpotifyPlayer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, type: "spring", damping: 26, stiffness: 220 }}
      className="fixed z-40 left-3 right-3 bottom-3 sm:left-6 sm:bottom-6 sm:right-auto sm:w-[364px] font-sans select-none"
    >
      <div
        className={`rounded-2xl overflow-hidden border shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
          expanded
            ? "border-purple-500/30 bg-black/90 shadow-purple-950/40"
            : "border-white/10 bg-black/85 shadow-black/60"
        }`}
      >
        {/* thin purple -> spotify-green accent hairline */}
        <div className="h-px bg-gradient-to-r from-purple-500/70 via-green-400/50 to-transparent" />

        {/* ---------------- Collapsed pill / header ---------------- */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} Spotify playlist player: ${PLAYLIST_TITLE}`}
          onClick={() => setExpanded((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setExpanded((v) => !v);
            }
          }}
          className="flex items-center gap-3 p-3 cursor-pointer group"
        >
          {/* Album mosaic cover */}
          <div className="relative shrink-0">
            <img
              src={COVER_URL}
              alt={`${PLAYLIST_TITLE} playlist cover`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-lg object-cover border border-white/10 group-hover:border-purple-400/40 transition-colors duration-300"
            />
            <div className="absolute -inset-1 -z-10 bg-purple-500/25 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* subtle play chip */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 rounded-lg opacity-0 group-hover:opacity-100 group-hover:bg-black/45 transition-all duration-300">
              <span className="w-6 h-6 rounded-full bg-[#1DB954] text-black flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 ml-0.5">
                  <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.54-6.86a1.04 1.04 0 0 0 0-1.76L9.56 4.26A1.04 1.04 0 0 0 8 5.14z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.18em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse shadow-[0_0_6px_rgba(29,185,84,0.8)]" />
              <span className="text-zinc-500">Audio Stream</span>
              <span className="text-purple-300">// Now Playing</span>
            </div>
            <div className="font-display font-semibold text-sm text-white truncate mt-0.5 group-hover:text-purple-200 transition-colors">
              {PLAYLIST_TITLE}
            </div>
            <div className="flex items-center gap-1 font-mono text-[9px] text-zinc-500 tracking-wider uppercase mt-0.5">
              <SpotifyGlyph className="w-2.5 h-2.5 text-[#1DB954]" />
              <span>Spotify Playlist</span>
            </div>
          </div>

          {/* Equalizer + external link + expand chevron */}
          <div className="flex items-center gap-2 shrink-0">
            {/* animated equalizer */}
            <div
              className="hidden md:flex items-end gap-[3px] h-4 mr-1"
              aria-hidden="true"
            >
              <span className="eq-bar w-[3px] h-full rounded-full bg-[#1DB954]/80" />
              <span className="eq-bar w-[3px] h-full rounded-full bg-purple-400/80" />
              <span className="eq-bar w-[3px] h-full rounded-full bg-[#1DB954]/80" />
            </div>

            <a
              href={PLAYLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Open playlist in Spotify"
              title="Open in Spotify"
              className="w-7 h-7 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-[#1DB954]/60 hover:bg-[#1DB954]/10 flex items-center justify-center transition-all active:scale-90"
            >
              <ExternalLink size={12} />
            </a>

            <span
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 ${
                expanded
                  ? "border-purple-400/50 text-purple-300 bg-purple-500/10 rotate-180"
                  : "border-white/10 text-zinc-400 group-hover:text-white group-hover:border-white/30"
              }`}
              aria-hidden="true"
            >
              <ChevronDown size={14} />
            </span>
          </div>
        </div>

        {/* ---------------- Expandable Spotify embed ---------------- */}
        {/* kept mounted so playback continues when the drawer collapses */}
        <div
          className={`transition-all duration-500 ease-out ${
            expanded ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 pb-3">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src={EMBED_URL}
                width="100%"
                height="352"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title={`${PLAYLIST_TITLE} — Spotify playlist player`}
                className="block w-full bg-black"
              />
            </div>
            {/* footer row */}
            <div className="flex items-center justify-between pt-2.5 px-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                music_node :: playlist
              </span>
              <a
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-500 hover:text-[#1DB954] transition-colors"
              >
                <SpotifyGlyph className="w-2.5 h-2.5" />
                Open on Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
