import { useEffect, useRef, useState } from 'react';

const VIDEO_ID = 'LG6PANt6sM8';
const START_SEC = 90;  // 1:30
const END_SEC   = 120; // 2:00

export default function MusicPlayer({ playing }) {
  const containerRef  = useRef(null);
  const playerRef     = useRef(null);
  const pendingPlay   = useRef(false);
  const [ready,  setReady]  = useState(false);
  const [muted,  setMuted]  = useState(false);
  const [visible, setVisible] = useState(false);

  /* ── Bootstrap YouTube IFrame API once ── */
  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 0,
          start: START_SEC,
          end:   END_SEC,
          controls:      0,
          disablekb:     1,
          fs:            0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel:           0,
          // loop=1 + playlist trick for single-video looping
          loop:          1,
          playlist:      VIDEO_ID,
        },
        events: {
          onReady: () => {
            setReady(true);
            if (pendingPlay.current) {
              playerRef.current.seekTo(START_SEC, true);
              playerRef.current.playVideo();
              pendingPlay.current = false;
            }
          },
          onStateChange: (e) => {
            const S = window.YT.PlayerState;
            // When clip ends, loop back to 1:30 manually
            if (e.data === S.ENDED || e.data === 0) {
              playerRef.current.seekTo(START_SEC, true);
              playerRef.current.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Chain with any existing callback (e.g. from other libs)
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        initPlayer();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src   = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }
  }, []);

  /* ── Start/stop whenever `playing` changes ── */
  useEffect(() => {
    if (!playing) return;
    setVisible(true);
    if (ready && playerRef.current) {
      playerRef.current.seekTo(START_SEC, true);
      playerRef.current.playVideo();
    } else {
      pendingPlay.current = true;
    }
  }, [playing, ready]);

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
      {/* Invisible 1×1 iframe anchor — must always be in DOM */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          bottom: 0,
          left: 0,
        }}
      />

      {/* Floating music toggle — appears after invitation is opened */}
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

