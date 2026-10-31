import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const ITEMS = [
  {
    id: 1,
    wide: true,
    src: '/assets/WhatsApp Image 2026-10-31 at 13.48.16.jpeg',
    label: 'Gowthami & Mohith',
    delay: 0,
  },
  {
    id: 2,
    wide: false,
    src: '/assets/WhatsApp Image 2026-10-31 at 13.48.27.jpeg',
    label: 'The Couple',
    delay: 0.14,
  },
  {
    id: 3,
    wide: false,
    src: '/assets/WhatsApp Image 2026-10-31 at 13.48.40.jpeg',
    label: 'Together',
    delay: 0.28,
  },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: (delay) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function Gallery() {
  const [titleRef, titleInView] = useInView();
  const [gridRef, gridInView] = useInView();

  return (
    <section id="gallery">
      <div className="wrap">
        <div ref={titleRef}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            Moments
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Gallery
          </motion.h2>
          <div className="rule">✦</div>
        </div>

        <div className="gallery-grid" ref={gridRef}>
          {ITEMS.map((item) => (
            <motion.div
              key={item.id}
              className={`gallery-item${item.wide ? ' wide' : ''}`}
              custom={item.delay}
              variants={itemVariants}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
            >
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
