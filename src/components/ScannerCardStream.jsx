import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { Star } from 'lucide-react';

const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width, height) => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

const InnerReviewCard = ({ review }) => {
    return (
        <div className="bg-[#241a30] rounded-[15px] h-full flex flex-col p-8 w-full shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] whitespace-normal">
            <div className="flex gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={18}
                        fill={i < review.rating ? "#ffffff" : "none"}
                        className={i < review.rating ? "text-white" : "text-white/20"}
                    />
                ))}
            </div>
            <p className="text-white/90 font-medium leading-relaxed flex-1 text-sm md:text-base mb-6 font-sans">
                {review.text}
            </p>
            {review.attachedImage && (
                <div className="mb-4 w-full h-24 rounded-xl overflow-hidden shrink-0 mt-auto shadow-inner">
                    <img src={review.attachedImage} alt="Attached" className="w-full h-full object-cover" />
                </div>
            )}
            <div className={`flex items-center gap-4 ${!review.attachedImage ? 'mt-auto' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-[#a855f7] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-purple-500/20">
                    {review.author.charAt(0)}
                </div>
                <div>
                    <h4 className="font-sans font-bold text-white text-sm">
                        {review.author}
                    </h4>
                    <span className="text-xs text-white/50 font-medium">{review.role || review.date}</span>
                </div>
            </div>
        </div>
    );
};

const ScannerCardStream = ({
  reviews = [],
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  repeat = 4,
  cardGap = 60,
  friction = 0.95,
  scanEffect = 'scramble',
}) => {

  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  const cards = useMemo(() => {
    // Double the repeat to guarantee two identical sets of cards for seamless wrapping
    const totalCards = reviews.length * repeat * 2;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      review: reviews[i % reviews.length],
      ascii: generateCode(Math.floor(400 / 6.5), Math.floor(300 / 13)), // Adjusted for height 300
    }))
  }, [reviews, repeat]);

  const cardLineRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const scannerCanvasRef = useRef(null);
  const originalAscii = useRef(new Map());

  const cardStreamState = useRef({
    position: 0, velocity: initialSpeed, direction: direction, isDragging: false,
    lastMouseX: 0, lastTime: performance.now(), cardLineWidth: (400 + cardGap) * cards.length,
    friction: friction, minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });
  
  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    if (!cardLine || !particleCanvas || !scannerCanvas) return;
    
    cards.forEach(card => originalAscii.current.set(card.id, card.ascii));
    let animationFrameId;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, 150, -150, 1, 1000); // 300 height
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 300);
    renderer.setClearColor(0x000000, 0);
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100; texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d");
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, `hsl(217, 61%, 33%)`);
    gradient.addColorStop(0.25, `hsl(217, 64%, 6%)`);
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 300;
        velocities[i] = Math.random() * 60 + 30;
        alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
      fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, vertexColors: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    const ctx = scannerCanvas.getContext('2d');
    scannerCanvas.width = window.innerWidth;
    scannerCanvas.height = 300;
    let scannerParticles = [];
    const baseMaxParticles = 800;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 2500;
    const createScannerParticle = () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 3, y: Math.random() * 300, vx: Math.random() * 0.8 + 0.2, vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4, alpha: Math.random() * 0.4 + 0.6, life: 1.0, decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMaxParticles; i++) scannerParticles.push(createScannerParticle());
    
    const runScrambleEffect = (element, cardId) => {
        if (element.dataset.scrambling === 'true') return;
        element.dataset.scrambling = 'true';
        const originalText = originalAscii.current.get(cardId) || '';
        let scrambleCount = 0;
        const maxScrambles = 10;
        const interval = setInterval(() => {
            element.textContent = generateCode(Math.floor(400 / 6.5), Math.floor(300 / 13));
            scrambleCount++;
            if (scrambleCount >= maxScrambles) {
                clearInterval(interval);
                element.textContent = originalText;
                delete element.dataset.scrambling;
            }
        }, 30);
    };

    const updateCardEffects = () => {
      const scannerX = window.innerWidth / 2;
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyCardIsScanning = false;
      cardLine.querySelectorAll(".card-wrapper").forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector(".card-normal");
        const asciiCard = wrapper.querySelector(".card-ascii");
        const asciiContent = asciiCard.querySelector('pre');
        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyCardIsScanning = true;
          if (scanEffect === 'scramble' && wrapper.dataset.scanned !== 'true') {
              runScrambleEffect(asciiContent, index);
          }
          wrapper.dataset.scanned = 'true';
          const intersectLeft = Math.max(scannerLeft - rect.left, 0);
          const intersectRight = Math.min(scannerRight - rect.left, rect.width);
          normalCard.style.setProperty("--clip-right", `${(intersectLeft / rect.width) * 100}%`);
          asciiCard.style.setProperty("--clip-left", `${(intersectRight / rect.width) * 100}%`);
        } else {
          delete wrapper.dataset.scanned;
          if (rect.right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });
      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };
    
    const animate = (currentTime) => {
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;
      if (!isPaused && !cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
            cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * deltaTime;
        setSpeed(Math.round(cardStreamState.current.velocity));
      }
      const { position, cardLineWidth } = cardStreamState.current;
      const halfWidth = cardLineWidth / 2;

      // Seamless wrapping logic
      if (position <= -halfWidth) {
          cardStreamState.current.position += halfWidth;
      } else if (position > 0) {
          cardStreamState.current.position -= halfWidth;
      }

      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();
      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > window.innerWidth / 2 + 100) positions[i * 3] = -window.innerWidth / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);
      ctx.clearRect(0, 0, window.innerWidth, 300);
      const targetCount = scannerState.current.isScanning ? scanTargetMaxParticles : baseMaxParticles;
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;
      while (scannerParticles.length < currentMaxParticles) scannerParticles.push(createScannerParticle());
      while (scannerParticles.length > currentMaxParticles) scannerParticles.pop();
      scannerParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0 || p.x > window.innerWidth) Object.assign(p, createScannerParticle());
        ctx.globalAlpha = p.alpha * p.life; ctx.fillStyle = "white";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    
    return () => { cancelAnimationFrame(animationFrameId); };
  }, [isPaused, cards, cardGap, friction, scanEffect]);

  return (
    <div className="relative w-screen h-[400px] flex items-center justify-center overflow-hidden left-1/2 -translate-x-1/2">
      <style jsx global>{`
        @keyframes glitch { 0%, 16%, 50%, 100% { opacity: 1; } 15%, 99% { opacity: 0.9; } 49% { opacity: 0.8; } }
        .animate-glitch { animation: glitch 0.1s infinite linear alternate-reverse; }
        
        @keyframes scanPulse {
          0% { opacity: 0.75; transform: scaleY(1); }
          100% { opacity: 1; transform: scaleY(1.03); }
        }
        .animate-scan-pulse {
          animation: scanPulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>

      <canvas ref={particleCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-screen h-[300px] z-0 pointer-events-none" />
      <canvas ref={scannerCanvasRef} className="absolute top-1/2 left-0 -translate-y-1/2 w-screen h-[300px] z-10 pointer-events-none" />
      
      <div
        className={`
          scanner-line absolute top-1/2 left-1/2 h-[340px] w-0.5 -translate-x-1/2 -translate-y-1/2 
          bg-gradient-to-b from-transparent via-violet-500 to-transparent rounded-full
          transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse
          ${isScanning ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          boxShadow: `
            0 0 10px #a78bfa, 0 0 20px #a78bfa, 
            0 0 30px #8b5cf6, 0 0 50px #6366f1`
        }}
      />

      <div className="absolute w-screen h-[300px] flex items-center">
        <div ref={cardLineRef} className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform" style={{ gap: `${cardGap}px` }}>
          {cards.map(card => (
            <div key={card.id} className="card-wrapper relative w-[400px] h-[300px] shrink-0">
              <div className="card-normal card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                <InnerReviewCard review={card.review} />
              </div>
              <div className="card-ascii card absolute top-0 left-0 w-full h-full rounded-[15px] overflow-hidden bg-[#110a18] z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)] p-4 flex items-center justify-center">
                <pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(167,139,250,0.8)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-4 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScannerCardStream;
