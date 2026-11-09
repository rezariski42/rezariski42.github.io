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
  • GitHub   : https://github.com/rezariski4242
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

// 4. Interactive 3D Certificate Roller / Coverflow Slider (180° Busur Infinite Arc)
function initCertificateRoller() {
  const stage = document.getElementById('cert-roller-stage');
  const prevBtn = document.getElementById('roller-prev');
  const nextBtn = document.getElementById('roller-next');
  const dotsContainer = document.getElementById('roller-dots');

  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll('.roller-card'));
  if (cards.length === 0) return;

  const N = cards.length;
  const stepDeg = 360 / N; // ~51.4286 deg per card

  let currentAngle = 0;
  let targetAngle = 0;
  let activeIndex = 0;
  let isAnimating = false;
  let isDragging = false;
  let startX = 0;
  let dragStartAngle = 0;
  let dragMoved = false;
  let wheelTimeout = null;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `roller-dot ${i === activeIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Pilih Sertifikat ${i + 1}`);
      dot.addEventListener('click', () => {
        rotateToCard(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.roller-dot')) : [];

  function updateDots(activeIdx) {
    dots.forEach((dot, idx) => {
      if (idx === activeIdx) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // 3D Semicircular Arc (0° - 180° busur fanned out in space)
  function apply3DTransforms(rotAngle) {
    const stageWidth = stage.clientWidth || 1100;
    const isMobile = stageWidth < 768;

    // Radii of the cylindrical arc
    const Rx = isMobile ? Math.min(190, stageWidth * 0.44) : Math.min(460, stageWidth * 0.40);
    const Rz = isMobile ? 130 : 220;

    let minAngleDist = Infinity;
    let closestIndex = 0;

    cards.forEach((card, idx) => {
      // Relative angular offset from front zenith [0, 360)
      let rawAngle = (idx * stepDeg - rotAngle) % 360;
      if (rawAngle < 0) rawAngle += 360;

      // Signed angle in [-180, +180]
      let signedAngle = rawAngle > 180 ? rawAngle - 360 : rawAngle;
      const absAngle = Math.abs(signedAngle);

      if (absAngle < minAngleDist) {
        minAngleDist = absAngle;
        closestIndex = idx;
      }

      const rad = (signedAngle * Math.PI) / 180;

      // Depth normalization: 1.0 at front (0 deg), 0.0 at back (180 deg)
      const normDepth = (Math.cos(rad) + 1) / 2;

      // 3D coordinates
      const x = Math.sin(rad) * Rx;
      const z = (Math.cos(rad) - 1) * Rz; // 0px front, -2*Rz at deepest back

      // Arena elevation: back cards are raised slightly so their header/badge peeks out clearly
      const y = -(1 - normDepth) * (isMobile ? 22 : 36);

      // Tangent rotation: curves smoothly along the 180° busur
      const rotY = -Math.sin(rad) * (isMobile ? 32 : 40);

      // Dynamic scale: enlarged at front center (1.12), scaled down gracefully at back (0.74)
      const scale = (isMobile ? 0.76 : 0.74) + normDepth * (isMobile ? 0.30 : 0.38);

      // Opacity: ALL cards behind remain clearly visible (0.60 to 1.0)
      const opacity = 0.60 + normDepth * 0.40;

      // Z-index: strictly depth based
      const zIndex = Math.round(10 + normDepth * 80);

      card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.zIndex = zIndex;

      // Active state on front center card
      if (absAngle < stepDeg * 0.45) {
        card.classList.add('active');
        card.style.pointerEvents = 'auto';
      } else {
        card.classList.remove('active');
        card.style.pointerEvents = 'auto'; // allow clicking background cards to bring forward
      }
    });

    if (closestIndex !== activeIndex) {
      activeIndex = closestIndex;
      updateDots(activeIndex);
    }
  }

  // Animation render loop (smooth spring easing)
  function render() {
    const diff = targetAngle - currentAngle;
    if (Math.abs(diff) > 0.05) {
      currentAngle += diff * 0.14;
      apply3DTransforms(currentAngle);
      requestAnimationFrame(render);
      isAnimating = true;
    } else {
      currentAngle = targetAngle;
      apply3DTransforms(currentAngle);
      isAnimating = false;
    }
  }

  function requestRender() {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(render);
    }
  }

  function rotateByStep(direction) {
    const currentStep = Math.round(targetAngle / stepDeg);
    targetAngle = (currentStep + direction) * stepDeg;
    requestRender();
  }

  function rotateToCard(index) {
    const currentStep = Math.round(targetAngle / stepDeg);
    let currentIdx = currentStep % N;
    if (currentIdx < 0) currentIdx += N;

    let stepDiff = (index - currentIdx) % N;
    if (stepDiff < 0) stepDiff += N;
    if (stepDiff > N / 2) stepDiff -= N;

    targetAngle = (currentStep + stepDiff) * stepDeg;
    requestRender();
  }

  function snapToNearest() {
    const currentStep = Math.round(targetAngle / stepDeg);
    targetAngle = currentStep * stepDeg;
    requestRender();
  }

  // Mouse Wheel (Direct rotation without scrolling the page)
  stage.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
      e.preventDefault();
      if (wheelTimeout) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const dir = delta > 0 ? 1 : -1;
      rotateByStep(dir);
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null;
      }, 160);
    }
  }, { passive: false });

  // Mouse Drag Interaction
  stage.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragMoved = false;
    startX = e.clientX;
    dragStartAngle = targetAngle;
    stage.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 4) {
      dragMoved = true;
    }
    const degDelta = (deltaX / (stage.clientWidth || 800)) * 180;
    targetAngle = dragStartAngle - degDelta;
    currentAngle = targetAngle;
    apply3DTransforms(currentAngle);
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    stage.classList.remove('is-dragging');
    if (dragMoved) {
      snapToNearest();
    }
  });

  // Touch Swipe Interaction
  stage.addEventListener('touchstart', (e) => {
    isDragging = true;
    dragMoved = false;
    startX = e.touches[0].clientX;
    dragStartAngle = targetAngle;
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 4) {
      dragMoved = true;
    }
    const degDelta = (deltaX / window.innerWidth) * 190;
    targetAngle = dragStartAngle - degDelta;
    currentAngle = targetAngle;
    apply3DTransforms(currentAngle);
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    if (dragMoved) {
      snapToNearest();
    }
  });

  // Click on cards
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (dragMoved) {
        e.preventDefault();
        return;
      }
      // If clicked on active center card links, allow normal PDF download/open
      if (card.classList.contains('active') && e.target.closest('a')) {
        return;
      }
      e.preventDefault();
      rotateToCard(idx);
    });
  });

  // Fixed Navigation Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateByStep(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateByStep(1);
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const rect = stage.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.key === 'ArrowLeft') {
      rotateByStep(-1);
    } else if (e.key === 'ArrowRight') {
      rotateByStep(1);
    }
  });

  // Window resize
  window.addEventListener('resize', () => {
    apply3DTransforms(currentAngle);
  });

  // Initial draw
  apply3DTransforms(0);
}
