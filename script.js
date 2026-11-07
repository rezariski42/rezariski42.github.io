/* ============================================================
   ANTI-SLOP TECHNICAL PORTFOLIO SCRIPTS
   Candidate: Muhammad Yusuf Reyzha Rizky Alatas (@rezariski)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSkillFilters();
  initTerminal();
  initCertificateRoller();
});

// 1. Skill Filters
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 2. Email Copy Handler
function copyContactEmail() {
  const email = 'rezariski42@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('Email rezariski42@gmail.com berhasil disalin!');
    const copyText = document.getElementById('copy-text');
    if (copyText) {
      const orig = copyText.textContent;
      copyText.textContent = 'Disalin!';
      setTimeout(() => { copyText.textContent = orig; }, 2000);
    }
  }).catch(() => {
    showToast('Silakan hubungi: rezariski42@gmail.com');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// 3. Interactive Terminal Console
function initTerminal() {
  const input = document.getElementById('term-input');
  const history = document.getElementById('term-history');
  const body = document.getElementById('term-body');

  if (!input || !history || !body) return;

  const commands = {
    help: `Perintah yang tersedia:
  • skills      : Tampilkan spesialisasi teknis (Routing, OS, Tools)
  • certs       : Tampilkan lisensi resmi & sertifikasi terverifikasi
  • projects    : Ringkasan proyek lapangan & implementasi ISP
  • cv          : Tautan unduh Curriculum Vitae (PDF)
  • contact     : Saluran komunikasi langsung (Email, WA, LinkedIn)
  • ping <host> : Tes konektivitas latensi jaringan
  • whoami      : Identitas kandidat
  • clear       : Bersihkan layar terminal`,

    skills: `[SPESIALISASI UTAMA]
  1. NETWORKING:
     - MikroTik RouterOS v6/v7 (Routing Static, OSPF, VLAN 802.1Q)
     - Traffic Engineering: Queue Tree, PCQ, Firewall Filter, NAT
     - Subnetting: IPv4 (VLSM/CIDR), DHCP Server/Relay, DNS Caching
     - Physical: UTP Cat5e/6 crimping, FO drop cable, Ubiquiti P2P
  2. IT OPERATIONS & HARDWARE:
     - Diagnostik Hardware PC/Laptop, RAM/SSD swap, thermal paste
     - Multi-OS: Linux (Debian, Arch, Ubuntu Server) & Windows 10/11
     - Remote Support: AnyDesk, TeamViewer, RDP, ticketing SOP
  3. COMMERCIAL & SALES:
     - Account Executive MyRepublic: survei ODP, konsultasi broadband`,

    certs: `[SERTIFIKASI TERVERIFIKASI]
  ✓ CCEP (Certified Cybersecurity Educator Professional) - Red Team Leaders (Nov 2026)
  ✓ MTCNA (MikroTik Certified Network Associate) - CitraWeb (Okt 2022)
  ✓ Subnetting Skill Certification (Score 82%) - Cybrary (2016)
  ✓ Uji Kompetensi Komputer MS Office 2016 - Polije (Jun 2023)
  ✓ Juara 3 Nasional Ide Karya Terbaik III (Robotik) - Kemendikbud RI (2019)
  ✓ Diploma (D3) Teknik Komputer - Politeknik Negeri Jember (2024)`,

    projects: `[DEPLOYMENT LAPANGAN]
  1. RT/RW Net Banjar Sengon: Arsitektur MikroTik + PCQ untuk 50+ drop client.
  2. Diskominfo Bondowoso: Intranet backbone pemda & monitoring site tower.
  3. MyRepublic Jember: Penetrasi fiber broadband & survei rute ODP.
  4. KKSI Kemendikbud: Autonomous robotics platform (Juara 3 Nasional).
  5. Ixsland Distribution: Standalone packaging Linux x64 & Windows Setup.exe.`,

    cv: `Unduh berkas CV:
  - Master CV: cv/cv-muhammad-yusuf-rezariski.pdf
  - Network Engineer (ISP): cv/cv-cbn-network-engineer.pdf
  - IT Support Specialist: cv/cv-camline-it-support.pdf
  - IT Operation Support: cv/cv-akulaku-it-support.pdf`,

    contact: `[SALURAN KOMUNIKASI]
  • Email    : rezariski42@gmail.com
  • WhatsApp : +62 851 1718 1529
  • LinkedIn : https://id.linkedin.com/in/muhammad-yusuf-reyzha-rizky-alatas-account-executive-my-republic-5777aa157
  • GitHub   : https://github.com/rezariski
  • Domisili : Jember, Jawa Timur, Indonesia`,

    whoami: `Muhammad Yusuf Reyzha Rizky Alatas (@rezariski)
Network Engineer & IT Operations Specialist
Alumni D3 Teknik Komputer, Politeknik Negeri Jember.`
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';

      if (!raw) return;

      const linePrompt = document.createElement('div');
      linePrompt.className = 'term-line-output';
      linePrompt.innerHTML = `<span style="color:var(--accent-emerald)">rezariski@systems:~$</span> ${escapeHtml(raw)}`;
      history.appendChild(linePrompt);

      const parts = raw.split(' ');
      const cmd = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      if (cmd === 'clear') {
        history.innerHTML = '';
        return;
      }

      const resLine = document.createElement('div');
      resLine.className = 'term-line-output';

      if (cmd === 'ping') {
        const target = arg || '8.8.8.8';
        resLine.innerHTML = `PING ${escapeHtml(target)} (56 bytes data):
64 bytes from ${escapeHtml(target)}: icmp_seq=1 ttl=118 time=14.2 ms
64 bytes from ${escapeHtml(target)}: icmp_seq=2 ttl=118 time=13.8 ms
64 bytes from ${escapeHtml(target)}: icmp_seq=3 ttl=118 time=14.1 ms
--- ${escapeHtml(target)} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, rtt min/avg/max = 13.8/14.0/14.2 ms`;
      } else if (commands[cmd]) {
        resLine.textContent = commands[cmd];
      } else {
        resLine.innerHTML = `<span style="color:#ef4444">zsh: command not found: ${escapeHtml(cmd)}</span>. Ketik <span style="color:var(--accent-amber)">help</span> untuk bantuan.`;
      }

      history.appendChild(resLine);
      body.scrollTop = body.scrollHeight;
    }
  });

  // Focus input on click anywhere in terminal body
  body.addEventListener('click', () => {
    input.focus();
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 4. Interactive 3D Certificate Roller / Coverflow Slider (Horizontal Cycle)
function initCertificateRoller() {
  const viewport = document.getElementById('cert-roller-viewport');
  const track = document.getElementById('cert-roller-track');
  const prevBtn = document.getElementById('roller-prev');
  const nextBtn = document.getElementById('roller-next');
  const dotsContainer = document.getElementById('roller-dots');

  if (!viewport || !track) return;

  const cards = Array.from(track.querySelectorAll('.roller-card'));
  if (cards.length === 0) return;

  let activeIndex = 0;
  let isTicking = false;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let hasDragged = false;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `roller-dot ${i === activeIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Pilih Sertifikat ${i + 1}`);
      dot.addEventListener('click', () => {
        scrollToCard(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.roller-dot')) : [];

  function updateCardTransforms() {
    isTicking = false;
    const viewportCenter = viewport.scrollLeft + (viewport.clientWidth / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + (card.clientWidth / 2);
      const distance = cardCenter - viewportCenter;
      const absDist = Math.abs(distance);
      const normalized = distance / (card.clientWidth * 0.9);

      if (absDist < minDistance) {
        minDistance = absDist;
        closestIndex = i;
      }

      // 3D Cycle curve calculation:
      // Center card is big (scale: 1.12), left/right cards are smaller (scale: ~0.8)
      const scale = Math.max(0.78, 1.12 - Math.min(Math.abs(normalized) * 0.34, 0.34));
      
      // Cycle curvature (curves like a carousel drum facing the viewer)
      const rotateY = Math.max(-22, Math.min(22, normalized * -18));
      
      // Depth perspective (center comes forward, sides push back)
      const translateZ = Math.max(-80, 50 - Math.abs(normalized) * 90);
      
      // Fading for side cards
      const opacity = Math.max(0.42, 1 - Math.min(Math.abs(normalized) * 0.58, 0.58));

      card.style.transform = `scale(${scale}) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      card.style.opacity = opacity;
      card.style.zIndex = Math.round(50 - Math.min(absDist / 8, 45));

      if (Math.abs(normalized) < 0.35) {
        card.classList.add('active');
        card.style.borderColor = 'var(--accent-amber)';
        card.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 28px rgba(245, 158, 11, 0.28)';
      } else {
        card.classList.remove('active');
        card.style.borderColor = 'var(--border-subtle)';
        card.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.45)';
      }
    });

    if (activeIndex !== closestIndex) {
      activeIndex = closestIndex;
      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  function onScroll() {
    if (!isTicking) {
      requestAnimationFrame(updateCardTransforms);
      isTicking = true;
    }
  }

  viewport.addEventListener('scroll', onScroll, { passive: true });

  function scrollToCard(index, smooth = true) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    const card = cards[index];
    if (!card) return;
    const targetScroll = card.offsetLeft - (viewport.clientWidth / 2) + (card.clientWidth / 2);
    viewport.scrollTo({
      left: targetScroll,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  function snapToClosest() {
    const viewportCenter = viewport.scrollLeft + (viewport.clientWidth / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + (card.clientWidth / 2);
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    });

    scrollToCard(closestIndex, true);
  }

  // Intercept vertical mouse wheel and translate directly to horizontal cycling
  viewport.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const canScrollRight = e.deltaY > 0 && viewport.scrollLeft < maxScroll - 4;
      const canScrollLeft = e.deltaY < 0 && viewport.scrollLeft > 4;

      if (canScrollRight || canScrollLeft) {
        e.preventDefault();
        viewport.scrollLeft += e.deltaY * 1.15;
      }
    }
  }, { passive: false });

  // Mouse Drag to cycle
  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('a') || e.target.closest('button')) return;
    isDragging = true;
    hasDragged = false;
    startX = e.pageX - viewport.offsetLeft;
    scrollStart = viewport.scrollLeft;
    viewport.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.35;
    if (Math.abs(walk) > 4) {
      hasDragged = true;
    }
    viewport.scrollLeft = scrollStart - walk;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    viewport.classList.remove('is-dragging');
    if (hasDragged) {
      snapToClosest();
    }
  });

  // Click card to scroll to center
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (activeIndex !== idx) {
        e.preventDefault();
        scrollToCard(idx);
      }
    });
  });

  // Prev / Next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const target = (activeIndex > 0) ? activeIndex - 1 : cards.length - 1;
      scrollToCard(target);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const target = (activeIndex < cards.length - 1) ? activeIndex + 1 : 0;
      scrollToCard(target);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const rect = viewport.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.key === 'ArrowLeft') {
      const target = (activeIndex > 0) ? activeIndex - 1 : cards.length - 1;
      scrollToCard(target);
    } else if (e.key === 'ArrowRight') {
      const target = (activeIndex < cards.length - 1) ? activeIndex + 1 : 0;
      scrollToCard(target);
    }
  });

  // Window resize & orientation change
  window.addEventListener('resize', () => {
    scrollToCard(activeIndex, false);
    updateCardTransforms();
  });

  // Initial center position on load
  setTimeout(() => {
    scrollToCard(0, false);
    updateCardTransforms();
  }, 100);
}
