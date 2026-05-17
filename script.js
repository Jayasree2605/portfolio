// ── Navbar ───────────────────────────────────────────
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ── Contact form ─────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f      = e.target;
  const btn    = f.querySelector('.submit-btn');
  const orig   = btn.innerHTML;

  btn.disabled  = true;
  btn.textContent = 'Sending…';

  try {
    const res = await fetch('/send', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    f.name.value,
        email:   f.email.value,
        subject: f.subject.value,
        message: f.message.value,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      btn.textContent = 'Message Sent!';
      f.reset();
      setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; }, 3000);
    } else {
      btn.textContent = data.error || 'Failed. Try again.';
      setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; }, 3000);
    }
  } catch {
    btn.textContent = 'Network error. Try again.';
    setTimeout(() => { btn.disabled = false; btn.innerHTML = orig; }, 3000);
  }
});

// ── Footer year ──────────────────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ── Particle background ──────────────────────────────
(function () {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x      = Math.random() * canvas.width;
      this.y      = Math.random() * canvas.height;
      this.size   = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - dist / 150) * 0.15})`;
          ctx.lineWidth   = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();
