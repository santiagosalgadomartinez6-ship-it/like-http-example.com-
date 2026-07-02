/* ================= SCROLL ANIMATIONS ================= */
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.joke-chip').forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.7,
    delay: i * 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 90%' }
  });
});

gsap.utils.toArray('.postcard').forEach((card) => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 85%' }
  });
});

gsap.from('#gallery .section-title, #gallery .section-sub', {
  opacity: 0,
  y: 25,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: { trigger: '#gallery', start: 'top 88%' }
});

/* ================= POLAROID GALLERY ================= */
const photoFiles = [
  'WhatsApp Image 2026-06-17 at 8.14.58 PM.jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.34 PM (1).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.34 PM (2).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.34 PM (3).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.34 PM (4).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.34 PM (5).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.34 PM (6).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.35 PM.jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.35 PM (1).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.35 PM (2).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.35 PM (3).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.35 PM (4).jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.36 PM.jpeg',
  'WhatsApp Image 2026-06-17 at 8.17.36 PM (1).jpeg'
];

const polaroidStrip = document.getElementById('polaroidStrip');
photoFiles.forEach((file, idx) => {
  const card = document.createElement('div');
  card.className = 'polaroid';

  const img = document.createElement('img');
  img.src = file;
  img.alt = `Recuerdo con Gretel ${idx + 1}`;
  img.loading = 'lazy';

  card.appendChild(img);
  polaroidStrip.appendChild(card);
});

/* ================= GOJO STICKER WALL ================= */
const gojoFiles = [
  'Gojo/OIP.jfif',
  'Gojo/OIP (1).jfif',
  'Gojo/OIP (2).jfif',
  'Gojo/OIP (3).jfif',
  'Gojo/OIP (4).jfif',
  'Gojo/OIP (5).jfif',
  'Gojo/OIP (6).jfif',
  'Gojo/OIP (7).jfif',
  'Gojo/OIP (8).jfif',
  'Gojo/OIP (9).jfif',
  'Gojo/OIP (10).jfif',
  'Gojo/OIP (11).jfif',
  'Gojo/OIP (12).jfif',
  'Gojo/OIP (13).jfif'
];

const stickerWall = document.getElementById('stickerWall');
gojoFiles.forEach((file) => {
  const img = document.createElement('img');
  img.src = file;
  img.alt = 'Gojo Satoru';
  img.loading = 'lazy';
  const rot = (Math.random() * 24 - 12).toFixed(1);
  img.style.transform = `rotate(${rot}deg)`;
  stickerWall.appendChild(img);
});

/* ================= CONFETTI BURST ================= */
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiActive = false;

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeConfettiCanvas();
window.addEventListener('resize', resizeConfettiCanvas);

const confettiColors = ['#4fd2ff', '#8fe3ff', '#1e6fff', '#ffcf5c', '#ffffff'];

function spawnConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 160; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 200,
      size: 4 + Math.random() * 6,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speedY: 2 + Math.random() * 4,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10
    });
  }
}

function confettiLoop() {
  if (!confettiActive) return;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  let stillFalling = false;
  confettiParticles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotSpeed;
    if (p.y < confettiCanvas.height + 30) stillFalling = true;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  if (stillFalling) {
    requestAnimationFrame(confettiLoop);
  } else {
    confettiActive = false;
    confettiCanvas.style.display = 'none';
  }
}

function fireConfetti() {
  confettiCanvas.style.display = 'block';
  spawnConfetti();
  confettiActive = true;
  confettiLoop();
}

document.getElementById('ctaBtn').addEventListener('click', (e) => {
  fireConfetti();
  gsap.fromTo(e.target, { scale: 1 }, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' });
});

/* ================= GIFT GATE ================= */
const giftGate = document.getElementById('giftGate');
const openGiftBtn = document.getElementById('openGiftBtn');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const giftLid = document.querySelector('.gift-lid');
const giftBow = document.querySelector('.gift-bow');
const giftBase = document.querySelector('.gift-base');
const giftPeek = document.querySelector('.gift-peek');

openGiftBtn.addEventListener('click', () => {
  bgMusic.volume = 0.7;
  bgMusic.play().catch(() => {});

  const tl = gsap.timeline({
    onComplete: () => {
      giftGate.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }
  });

  tl.to([giftLid, giftBow], { y: -60, rotate: -18, opacity: 0, duration: 0.5, ease: 'power2.in' })
    .to(giftPeek, { scale: 1.15, y: -18, duration: 0.4, ease: 'back.out(2)' }, '<')
    .to(giftBase, { scaleY: 0.85, opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.15')
    .to(giftGate, { opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.1');

  fireConfetti();
  musicToggle.classList.add('visible', 'playing');
});

musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicToggle.classList.add('playing');
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
  }
});
