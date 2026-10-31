import { useEffect, useRef } from 'react';

const PETAL_COLORS = [
  ['#f7c5d0', '#fde8ee'],
  ['#f4b8c8', '#fbd9e4'],
  ['#e8a0b5', '#f5c9d8'],
  ['#fbc9d4', '#feeaf0'],
  ['#f2afc2', '#f9d5e2'],
];

export default function RosePetals() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create petals
    const createPetal = () => ({
      x: Math.random() * window.innerWidth,
      y: -30,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 4,
      speed: 1.2 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 1.2,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.02,
      swayAmt: 20 + Math.random() * 30,
      width: 10 + Math.random() * 8,
      height: 13 + Math.random() * 8,
      colors: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      opacity: 0.6 + Math.random() * 0.35,
    });

    // Spawn initial petals
    for (let i = 0; i < 18; i++) {
      const p = createPetal();
      p.y = Math.random() * window.innerHeight;
      petalsRef.current.push(p);
    }

    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new petal occasionally
      if (Math.random() < 0.03) {
        petalsRef.current.push(createPetal());
      }

      petalsRef.current = petalsRef.current.filter(p => p.y < canvas.height + 60);

      petalsRef.current.forEach(p => {
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.8 + p.drift;
        p.y += p.speed;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Draw petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.width * 0.9, -p.height * 0.15, -p.width * 1.1, -p.height * 0.7, -p.width * 0.4, -p.height * 0.95);
        ctx.quadraticCurveTo(-p.width * 0.1, -p.height * 1.02, 0, -p.height);
        ctx.quadraticCurveTo(p.width * 0.1, -p.height * 1.02, p.width * 0.4, -p.height * 0.95);
        ctx.bezierCurveTo(p.width * 1.1, -p.height * 0.7, p.width * 0.9, -p.height * 0.15, 0, 0);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, 0, -p.height);
        grad.addColorStop(0, p.colors[0]);
        grad.addColorStop(1, p.colors[1]);
        ctx.fillStyle = grad;
        ctx.fill();

        // Vein
        ctx.beginPath();
        ctx.moveTo(0, -p.height * 0.1);
        ctx.quadraticCurveTo(p.width * 0.08, -p.height * 0.5, 0, -p.height * 0.85);
        ctx.strokeStyle = 'rgba(200,140,160,0.25)';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="petals-canvas" />;
}
