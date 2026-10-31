import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

// Wedding Muhurtham date: Friday, 20 November 2026, 9:30 AM IST (04:00 UTC)
const WEDDING_DATE = new Date('2026-11-20T04:00:00Z');

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, completed: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    completed: false,
  };
}

function pad(n) { return String(n).padStart(2, '0'); }

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', val: pad(time.d), subtitle: 'Solar Days' },
    { label: 'Hours', val: pad(time.h), subtitle: 'Hours' },
    { label: 'Minutes', val: pad(time.m), subtitle: 'Minutes' },
    { label: 'Seconds', val: pad(time.s), subtitle: 'Seconds', isLive: true },
  ];

  return (
    <section id="countdown">
      <div className="wrap">
        {/* Decorative Top Flourish */}
        <motion.div
          className="countdown-badge"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-flourish">✦</span>
          <span>Auspicious Muhurtham</span>
          <span className="badge-flourish">✦</span>
        </motion.div>

        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Counting Down Every Moment
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          The Sacred Muhurtham
        </motion.h2>

        <div className="rule ornate-rule">
          <span className="rule-dot"></span>
          <span className="rule-symbol">❖</span>
          <span className="rule-dot"></span>
        </div>

        {/* Ornate Glassmorphic Countdown Frame */}
        <div className="countdown-royal-card">
          <div className="royal-corner-decor tl"></div>
          <div className="royal-corner-decor tr"></div>
          <div className="royal-corner-decor bl"></div>
          <div className="royal-corner-decor br"></div>

          <div className="countdown-grid">
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                className={`countdown-box ${u.isLive ? 'is-live-unit' : ''}`}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              >
                <div className="box-inner-glow"></div>
                <div className="num-wrapper">
                  <span className="countdown-num">{u.val}</span>
                  {u.isLive && <span className="pulse-indicator" title="Ticking live"></span>}
                </div>
                <span className="countdown-label">{u.label}</span>
                <span className="countdown-sublabel">{u.subtitle}</span>
              </motion.div>
            ))}
          </div>

          {/* Muhurtham Details Plaque */}
          <motion.div
            className="muhurtham-plaque"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="plaque-icon">🪔</div>
            <div className="plaque-content">
              <span className="plaque-title">Sumuhurtham · శుభ ముహూర్తం</span>
              <p className="plaque-time">
                Friday, 20 November 2026 &nbsp;|&nbsp; <strong>9:30 AM – 10:15 AM</strong>
              </p>
              <p className="plaque-venue">
                Sri Tirumala Kalyana Mantapam · Viduraswatha, Gowribidanur
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
