// --- SECTION NAVIGATION ---
function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById(id);
  target.classList.add('active');
  target.scrollTop = 0; // scroll ke atas di dalam section
  if (btn) btn.classList.add('active');
  if (id === 'skills') initSkills();
  revealSection(id);
}

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
