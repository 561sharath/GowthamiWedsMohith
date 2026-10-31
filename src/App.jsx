import { useState, useEffect } from 'react';
import Invitation from './components/Invitation';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import RosePetals from './components/RosePetals';
import MusicPlayer from './components/MusicPlayer';
import './index.css';

function App() {
  const [opened, setOpened] = useState(false);
  const [invGone, setInvGone] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    document.body.style.overflow = 'auto';
    setTimeout(() => setInvGone(true), 1600);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="app-root">
      <MusicPlayer playing={opened} />
      {!invGone && <Invitation opened={opened} onOpen={handleOpen} />}
      <div className={`main-content${opened ? ' visible' : ''}`}>
        <RosePetals />
        <Hero />
        <Countdown />
        <Events />
        <Gallery />
        <Footer />
      </div>
    </div>
  );
}

export default App;
