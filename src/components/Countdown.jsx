import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

// Wedding date: Friday, 20 November 2026, 9:30 AM IST
const WEDDING_DATE = new Date('2026-11-20T04:00:00Z'); // 9:30 AM IST = 04:00 UTC

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n) { return String(n).padStart(2, '0'); }

const boxVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.85 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());
  const [ref, inView] = useInView();

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', val: pad(time.d) },
    { label: 'Hours', val: pad(time.h) },
    { label: 'Mins', val: pad(time.m) },
    { label: 'Secs', val: pad(time.s) },
  ];

  return (
    <section id="countdown">
      <div className="wrap reveal" ref={ref}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          Counting down to
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          The Big Day
        </motion.h2>
        <div className="rule">✦</div>

        <div className="countdown-grid">
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              className="countdown-box"
              custom={i}
              variants={boxVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <span className="countdown-num">{u.val}</span>
              <span className="countdown-label">{u.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="countdown-sub"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          Muhurtham · 9:30 AM
        </motion.p>
      </div>
    </section>
  );
}
