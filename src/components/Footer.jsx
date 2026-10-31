import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

export default function Footer() {
  const [ref, inView] = useInView();

  return (
    <footer id="footer">
      <div className="wrap" ref={ref}>
        <motion.p
          className="footer-script script"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          We can't wait to celebrate with you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(236,210,218,0.6), transparent)',
            margin: '20px auto',
            maxWidth: '200px',
          }}
        />

        <motion.p
          className="footer-hash"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          #GowthamiWedsMohith
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.8 }}
          style={{
            marginTop: '28px',
            fontSize: '11px',
            color: 'rgba(220, 201, 210, 0.7)',
            letterSpacing: '0.06em',
          }}
        >
          20 · November · 2026 &nbsp;·&nbsp; Gowribidanur, Karnataka
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.0 }}
          style={{
            marginTop: '16px',
            fontSize: '12px',
            color: 'rgba(220, 201, 210, 0.85)',
            letterSpacing: '0.06em',
          }}
        >
          📞 <a href="tel:8374020400" style={{ color: 'inherit', textDecoration: 'none' }}>8374020400</a>
        </motion.p>

        {/* Floating hearts */}
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={inView ? {
              opacity: [0, 0.8, 0],
              y: -60,
              x: (i - 2) * 20,
            } : {}}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            style={{
              position: 'absolute',
              fontSize: '16px',
              display: 'inline-block',
              pointerEvents: 'none',
            }}
          >
            🌸
          </motion.span>
        ))}
      </div>
    </footer>
  );
}
