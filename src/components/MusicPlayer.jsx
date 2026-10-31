import { useEffect, useRef, useState } from 'react';

const VIDEO_ID  = 'LG6PANt6sM8';
const START_SEC = 90;   // 1:30
const END_SEC   = 120;  // 2:00

export default function MusicPlayer({ playing }) {
  const divRef      = useRef(null);   // anchor div that YT replaces with iframe
  const playerRef   = useRef(null);   // YT.Player instance
  const pendingPlay = useRef(false);  // play requested before player was ready
  const didInit     = useRef(false);  // StrictMode guard — init only once

  const [ready,   setReady]   = useState(false);
  const [muted,   setMuted]   = useState(false);
  const [visible, setVisible] = useState(false);

  /* ── Create the YouTube player exactly once ── */
  useEffect(() => {
    // React StrictMode double-fires effects in dev — skip the second run.
    if (didInit.current) return;
    didInit.current = true;

    const createPlayer = () => {
      // Safety: if the div is already gone or player exists, bail out.
      if (!divRef.current || playerRef.current) return;

      playerRef.current = new window.YT.Player(divRef.current, {
        videoId: VIDEO_ID,
        height: '1',
        width:  '1',
        playerVars: {
          autoplay:        0,
          start:           START_SEC,
          end:             END_SEC,
          controls:        0,
          disablekb:       1,
          fs:              0,
          iv_load_policy:  3,
          modestbranding:  1,
          rel:             0,
          loop:            1,
          playlist:        VIDEO_ID,
          // Fix postMessage origin warning in dev:
          origin:          window.location.origin,
        },
        events: {
          onReady: (e) => {
            setReady(true);
            // If play was requested before the player was ready, start now.
            if (pendingPlay.current) {
              e.target.seekTo(START_SEC, true);
              e.target.playVideo();
              pendingPlay.current = false;
            }
          },
          onStateChange: (e) => {
            // When clip reaches END_SEC the player fires ENDED (0) — loop back.
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(START_SEC, true);
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      // API already loaded (e.g. cached from another page).
      createPlayer();
    } else {
      // Queue behind any previously-set callback (safe chaining).
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        createPlayer();
      };
      // Inject the script only if not already present.
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag  = document.createElement('script');
        tag.src    = 'https://www.youtube.com/iframe_api';
        tag.async  = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      // Cleanup on real unmount — destroy the player so it can be re-created.
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      didInit.current = false;
    };
  }, []);

  /* ── Start music when invitation is opened ── */
  useEffect(() => {
    if (!playing) return;
    setVisible(true);

    if (ready && playerRef.current) {
      try {
        playerRef.current.seekTo(START_SEC, true);
        playerRef.current.playVideo();
      } catch {
        // Player not fully bootstrapped yet — mark for pending play.
        pendingPlay.current = true;
      }
    } else {
      pendingPlay.current = true;
    }
  }, [playing, ready]);

  /* ── Mute toggle ── */
  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setMuted(m => !m);
  };

  return (
    <>
      {/*
        This div is the mount-point that YouTube replaces with its <iframe>.
        It must always be in the DOM so the player survives re-renders.
      */}
      <div
        ref={divRef}
        style={{
          position:      'fixed',
          bottom:        0,
          left:          0,
          width:         1,
          height:        1,
          opacity:       0,
          pointerEvents: 'none',
          zIndex:        -1,
        }}
      />

      {/* Floating music toggle button — shown only after invitation opens */}
      {visible && (
        <button
          className={`music-btn${muted ? ' muted' : ''}`}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          title={muted ? 'Unmute music' : 'Mute music'}
        >
          <span className="music-icon">{muted ? '🔇' : '🎵'}</span>
          <span className="music-bars">
            <span /><span /><span /><span />
          </span>
        </button>
      )}
    </>
  );
}
