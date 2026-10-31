import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

const EVENTS = [
  {
    title: "Bride's Haldi",
    when: 'Thu 19 Nov · 7:00 AM – 11:00 AM',
    where: 'Narganahalli (V), Kodigenahalli (H)\nMadhugiri (Tq)',
    accent: '#e6d2ae',
    mapUrl: null,
    calUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bride%27s+Haldi+-+Gowthami+%26+Mohith&dates=20261119T013000Z/20261119T053000Z&location=Narganahalli,+Kodigenahalli,+Madhugiri',
  },
  {
    title: "Groom's Haldi",
    when: 'Thu 19 Nov · 7:00 AM – 11:00 AM',
    where: 'S.Sadlapalli, Hindupur\nLandmark: Balaji Flour Mills',
    accent: '#b8d4c8',
    mapUrl: 'https://maps.app.goo.gl/o2Cfxfoi8V6GfBhA9',
    calUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Groom%27s+Haldi+-+Gowthami+%26+Mohith&dates=20261119T013000Z/20261119T053000Z&location=S.Sadlapalli,+Hindupur',
  },
  {
    title: 'Reception',
    when: 'Thu 19 Nov · 7:30 PM – 10:00 PM',
    where: 'Sri Tirumala Kalyana Mantapam\nViduraswatha, Gowribidanur (Tq)',
    accent: '#c0a0ad',
    mapUrl: 'https://maps.app.goo.gl/Cbefvev79VrRK7uaA',
    calUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reception+-+Gowthami+%26+Mohith&dates=20261119T140000Z/20261119T163000Z&location=Sri+Tirumala+Kalyana+Mantapam,+Viduraswatha,+Gowribidanur',
  },
  {
    title: 'Wedding Ceremony',
    when: 'Fri 20 Nov · 9:30 AM – 10:15 AM',
    where: 'Sri Tirumala Kalyana Mantapam\nViduraswatha, Gowribidanur (Tq)',
    accent: '#d4b8c0',
    mapUrl: 'https://maps.app.goo.gl/Cbefvev79VrRK7uaA',
    calUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Ceremony+-+Gowthami+%26+Mohith&dates=20261120T040000Z/20261120T044500Z&location=Sri+Tirumala+Kalyana+Mantapam,+Viduraswatha,+Gowribidanur',
  },
];

const cardVariants = {
  hidden: (i) => ({ opacity: 0, x: i % 2 === 0 ? -46 : 46 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] },
  },
};

function EventCard({ event, index }) {
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      className={`event-card${inView ? ' in-view' : ''}`}
      style={{ '--accent': event.accent }}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <h3>{event.title}</h3>
      <div className="event-when">{event.when}</div>
      <div className="event-where" style={{ whiteSpace: 'pre-line' }}>
        {event.where}
      </div>
      <div className="event-btns">
        {event.mapUrl && (
          <a
            className="event-btn filled"
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Open in Maps
          </a>
        )}
        <a
          className="event-btn"
          href={event.calUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          📅 Add to Calendar
        </a>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [titleRef, titleInView] = useInView();

  return (
    <section id="events">
      <div className="wrap">
        <div ref={titleRef}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            Join the celebration
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 14 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            The Events
          </motion.h2>
          <div className="rule">✦</div>
        </div>

        {EVENTS.map((ev, i) => (
          <EventCard key={ev.title} event={ev} index={i} />
        ))}
      </div>
    </section>
  );
}
