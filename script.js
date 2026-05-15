// --- FLOATING ORNAMENTS ---
function spawnOrbs() {
  const starChars = ['✦', '✧', '⋆', '✺', '◈', '◇', '✴'];

  // Bintang berkedip
  for (let i = 0; i < 25; i++) {
    const star = document.createElement('span');
    star.className = 'star-particle';
    star.textContent = starChars[Math.floor(Math.random() * starChars.length)];
    star.style.left = Math.random() * 90 + 'vw';
    star.style.top = Math.random() * 90 + 'vh';
    star.style.fontSize = (0.5 + Math.random() * 1.2) + 'rem';
    star.style.animationDuration = (2 + Math.random() * 4) + 's';
    star.style.animationDelay = (Math.random() * 5) + 's';
    document.body.appendChild(star);
  }

  // Bulatan kecil melayang
  for (let i = 0; i < 6; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    const size = 20 + Math.random() * 50;
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    orb.style.left = Math.random() * 85 + 'vw';
    orb.style.top = (80 + Math.random() * 40) + 'vh';
    orb.style.animationDuration = (10 + Math.random() * 14) + 's';
    orb.style.animationDelay = (Math.random() * 8) + 's';
    document.body.appendChild(orb);
  }
}
spawnOrbs();

// --- CUSTOM CURSOR ---
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

const trail = document.createElement('div');
trail.id = 'cursor-trail';
document.body.appendChild(trail);

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Trail ngikutin dengan delay
function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Efek klik — cursor membesar sebentar
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%,-50%) scale(2)';
  cursor.style.background = 'var(--yellow-light)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  cursor.style.background = 'var(--yellow)';
});

// Hover di elemen clickable — trail membesar
document.querySelectorAll('button, a, .portfolio-item, .about-card, .cv-side-section, .cv-right-section, .nav-btn, .navbar-wrapper, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    trail.style.width = '48px';
    trail.style.height = '48px';
    trail.style.borderColor = 'var(--yellow-light)';
    trail.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    trail.style.width = '28px';
    trail.style.height = '28px';
    trail.style.borderColor = 'var(--yellow)';
    trail.style.opacity = '0.5';
  });
});


function showSection(id, btn) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (!btn) {
    btn = document.querySelector(`.nav-btn[onclick="showSection('${id}',this)"]`);
  }
  if (btn) btn.classList.add('active');
  const target = document.getElementById(id);
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (id === 'skills') initSkills();
  revealSection(id);
}

function updateActiveNavOnScroll() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;
  let currentId = sections[0].id;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPosition) {
      currentId = section.id;
    }
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    const targetId = btn.getAttribute('onclick')?.match(/showSection\('(.+?)',this\)/)?.[1];
    btn.classList.toggle('active', targetId === currentId);
  });
}

function observeSections() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const sectionId = entry.target.id;
        document.querySelectorAll('.nav-btn').forEach(btn => {
          const targetId = btn.getAttribute('onclick')?.match(/showSection\('(.+?)',this\)/)?.[1];
          btn.classList.toggle('active', targetId === sectionId);
        });
        if (sectionId === 'skills' && !skillsInited) {
          initSkills();
        }
      }
    });
  }, {
    rootMargin: '0px 0px -30% 0px',
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));
}

window.addEventListener('scroll', () => {
  updateActiveNavOnScroll();
});

window.addEventListener('resize', () => {
  updateActiveNavOnScroll();
});

observeSections();
updateActiveNavOnScroll();

// --- TYPING ANIMATION ---
const typingEl = document.getElementById('typing-text');
const fullText = 'Hai! Aku Indri Rochmandari, anak SIJA yang bisa desain dikit-dikit dan lagi kepo banget sama jaringan, jadi sekarang lagi belajar biar ngerti cara kerjanya, sambil pelan-pelan ningkatin skill desain juga.';
let i = 0, typingStarted = false;

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  typingEl.textContent = '';
  i = 0;
  function type() {
    if (i < fullText.length) {
      typingEl.textContent += fullText[i++];
      setTimeout(type, 28);
    }
  }
  setTimeout(type, 600);
}
startTyping();

// --- SKILLS ANIMATION ---
// Reset setiap kali section skills dibuka supaya animasi jalan ulang
let skillsInited = false;

function initSkills() {
  // Reset dulu
  document.querySelectorAll('.skill-item').forEach(item => {
    const bar = item.querySelector('.skill-bar');
    const label = item.querySelector('.skill-pct');
    bar.style.width = '0%';
    label.textContent = '0%';
  });

  skillsInited = false;

  // Jalankan animasi dengan sedikit delay
  setTimeout(() => {
    document.querySelectorAll('.skill-item').forEach((item, index) => {
      const pct = parseInt(item.dataset.pct);
      const bar = item.querySelector('.skill-bar');
      const label = item.querySelector('.skill-pct');
      let current = 0;

      setTimeout(() => {
        bar.style.width = pct + '%';
        const interval = setInterval(() => {
          if (current >= pct) { clearInterval(interval); return; }
          current++;
          label.textContent = current + '%';
        }, 12);
      }, index * 120); // stagger tiap skill
    });
    skillsInited = true;
  }, 200);
}

// --- MODAL ---
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalBg(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// --- LIGHTBOX ---
// Klik gambar di modal → buka lightbox full screen
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });
});

function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  // Kalau ada modal yang masih open, jangan kembalikan scroll
  const anyModalOpen = document.querySelector('.modal-bg.open');
  if (!anyModalOpen) document.body.style.overflow = '';
}

// --- KEYBOARD CLOSE ---
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Tutup lightbox dulu kalau terbuka
    const lb = document.getElementById('lightbox');
    if (lb.classList.contains('open')) {
      closeLightbox();
      return;
    }
    // Baru tutup modal
    document.querySelectorAll('.modal-bg.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// --- SCROLL REVEAL ---
// Semua card di-reset dulu ke hidden
function resetReveal(sectionId) {
  const section = document.getElementById(sectionId);
  section.querySelectorAll('.about-card,.cv-card,.portfolio-item,.skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'none';
  });
}

// Reveal card satu per satu dengan stagger saat section dibuka
function revealSection(sectionId) {
  const section = document.getElementById(sectionId);
  const els = section.querySelectorAll('.about-card,.cv-card,.portfolio-item,.skill-item');
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'none';
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.38s ease, border-color 0.38s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80 + i * 80);
  });
}

// Jalankan reveal untuk home saat pertama load
revealSection('home');
