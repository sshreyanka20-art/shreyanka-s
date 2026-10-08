/**
 * ============================================================================
 * SHREYANKA S. - PORTFOLIO INTERACTIVITY ENGINE
 * Core Logic: Navigation, Night Mode, AI Chat, Project Modals, Audio SFX,
 * Contact Validation, and API Integration Stubs (Prompts 1 - 15)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. WEB AUDIO API - 8-BIT RETRO SOUND EFFECTS (SYNTHESIS ENGINE)
     Provides nostalgic retro arcade blips and boops without external audio files.
     ========================================================================== */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function play8BitTone(freq, type = 'square', duration = 0.08, vol = 0.06) {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback not permitted or unavailable:', e);
    }
  }

  function playBlip() { play8BitTone(620, 'square', 0.06, 0.04); }
  function playClick() { play8BitTone(880, 'sine', 0.04, 0.05); }
  function playSuccess() {
    play8BitTone(523.25, 'triangle', 0.08, 0.06);
    setTimeout(() => play8BitTone(659.25, 'triangle', 0.08, 0.06), 90);
    setTimeout(() => play8BitTone(783.99, 'triangle', 0.14, 0.07), 180);
  }

  // Sound Toggle Control
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = document.getElementById('soundLabel');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'SFX ON';
        showToast('🔊 8-Bit Audio Effects Enabled');
        playSuccess();
      } else {
        soundIcon.textContent = '🔇';
        soundLabel.textContent = 'MUTED';
        showToast('🔇 Audio Effects Muted');
      }
    });
  }

  // Attach click sounds to interactive buttons
  document.querySelectorAll('.pixel-btn, .nav-link, .chat-chip, .avatar-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => playBlip());
  });

  /* ==========================================================================
     2. PROMPT 2: NIGHT MODE TOGGLE WITH BROWSER THEME AUTO-DETECTION
     Uses CSS media queries ('prefers-color-scheme') and manual override toggle.
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeBtn = document.getElementById('mobileThemeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  // Check saved preference or query system preference
  const savedTheme = localStorage.getItem('shreyanka_portfolio_theme');
  const prefersDarkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'Dark';
      if (mobileThemeBtn) mobileThemeBtn.textContent = '🌙';
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'Light';
      if (mobileThemeBtn) mobileThemeBtn.textContent = '☀️';
    }
  }

  if (savedTheme) {
    applyTheme(savedTheme === 'dark');
  } else {
    // Detect system default browser theme via media query
    applyTheme(prefersDarkMedia.matches);
  }

  // Listen for real-time changes in system preferences if no manual override
  prefersDarkMedia.addEventListener('change', (e) => {
    if (!localStorage.getItem('shreyanka_portfolio_theme')) {
      applyTheme(e.matches);
    }
  });

  function toggleTheme() {
    const isCurrentlyDark = document.body.classList.contains('theme-dark');
    const newTheme = !isCurrentlyDark;
    applyTheme(newTheme);
    localStorage.setItem('shreyanka_portfolio_theme', newTheme ? 'dark' : 'light');
    showToast(newTheme ? '🌙 Switched to Night Mode' : '☀️ Switched to Light Mode');
    playClick();
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

  /* ==========================================================================
     3. CRT SCANLINE EFFECT TOGGLE
     ========================================================================== */
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  if (crtToggleBtn) {
    crtToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('crt-enabled');
      const isEnabled = document.body.classList.contains('crt-enabled');
      showToast(isEnabled ? '📺 CRT Scanlines Activated' : '📺 CRT Scanlines Disabled');
      playClick();
    });
  }

  /* ==========================================================================
     4. PROMPT 3 & 13: VERTICAL NAVIGATION & MOBILE RESPONSIVE DRAWER
     Smooth scrolling, active section tracking, and mobile drawer transitions.
     ========================================================================== */
  const verticalNavbar = document.getElementById('verticalNavbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item[data-section]');
  const mobileDockMenuBtn = document.getElementById('mobileDockMenuBtn');

  function openMobileNav() {
    verticalNavbar.classList.add('open');
    navBackdrop.classList.add('open');
    playBlip();
  }

  function closeMobileNav() {
    verticalNavbar.classList.remove('open');
    navBackdrop.classList.remove('open');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMobileNav);
  if (mobileDockMenuBtn) mobileDockMenuBtn.addEventListener('click', () => {
    if (verticalNavbar.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  // Close mobile drawer upon link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 880) {
        closeMobileNav();
      }
    });
  });

  // Dock items sound and smooth scroll
  dockItems.forEach(item => {
    item.addEventListener('click', () => playBlip());
  });

  // Active section observer on scroll (Syncs both Vertical Navbar and Bottom Quick-Dock)
  const sections = document.querySelectorAll('section[id], footer[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        
        // Sync vertical navbar links
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === currentId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Sync mobile bottom dock links
        dockItems.forEach(dock => {
          if (dock.getAttribute('data-section') === currentId) {
            dock.classList.add('active');
          } else {
            dock.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  /* ==========================================================================
     5. PROMPT 4: DUAL AVATAR MODE SWITCHER (REAL PHOTO VS 8-BIT PIXEL AVATAR)
     ========================================================================== */
  const btnModeReal = document.getElementById('btnModeReal');
  const btnModePixel = document.getElementById('btnModePixel');
  const profileRealImg = document.getElementById('profileRealImg');
  const profilePixelImg = document.getElementById('profilePixelImg');

  function setAvatarMode(mode) {
    if (mode === 'real') {
      btnModeReal.classList.add('active');
      btnModePixel.classList.remove('active');
      profileRealImg.classList.add('active');
      profilePixelImg.classList.remove('active');
      showToast('📷 Showing Real Photograph');
    } else {
      btnModePixel.classList.add('active');
      btnModeReal.classList.remove('active');
      profilePixelImg.classList.add('active');
      profileRealImg.classList.remove('active');
      showToast('👾 Showing 8-Bit Pixel Art Avatar');
    }
  }

  if (btnModeReal && btnModePixel) {
    btnModeReal.addEventListener('click', () => setAvatarMode('real'));
    btnModePixel.addEventListener('click', () => setAvatarMode('pixel'));
  }

  /* ==========================================================================
     6. PROMPT 2 & 14: HERO CANVAS PIXEL STARFIELD ANIMATION
     Subtle twinkling stars background for enhanced pixel art immersion.
     ========================================================================== */
  const starsCanvas = document.getElementById('pixelStarsCanvas');
  if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    const starCount = 45;

    function resizeCanvas() {
      starsCanvas.width = starsCanvas.parentElement.clientWidth;
      starsCanvas.height = starsCanvas.parentElement.clientHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.floor(Math.random() * starsCanvas.width),
          y: Math.floor(Math.random() * starsCanvas.height * 0.7),
          size: Math.random() > 0.8 ? 3 : 2, // discrete pixel sizes
          alpha: Math.random(),
          speed: 0.01 + Math.random() * 0.02,
          color: Math.random() > 0.5 ? '#22d3ee' : '#a78bfa'
        });
      }
    }

    function animateStars() {
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      requestAnimationFrame(animateStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateStars();
  }

  /* ==========================================================================
     7. PROMPT 7: PROJECT MODAL SYSTEM (CLICKABLE THUMBNAILS)
     Detailed architecture, circuits, firmware details, and achievements.
     ========================================================================== */
  const projectDetails = {
    'gas-detector': {
      title: 'Smart Gas Leakage Detection and Automatic Ventilation System',
      category: 'HARDWARE & EMBEDDED AUTOMATION',
      summary: 'A complete life-safety prototype integrating an MQ-series gas sensor with an Arduino Uno microcontroller to continuously sample atmospheric air, identify hazardous combustible/toxic gas leaks, and activate automatic ventilation mechanisms alongside audio-visual alerts.',
      specifications: [
        { label: 'Microcontroller', value: 'Arduino Uno (ATmega328P @ 16 MHz)' },
        { label: 'Sensor Module', value: 'MQ-2 / MQ-5 Semiconductor Gas Sensor' },
        { label: 'Actuators', value: '12V High-CFM DC Exhaust Fan, Relay Module, SG90 Servo' },
        { label: 'Feedback Systems', value: '16x2 I2C Liquid Crystal Display, Piezo Buzzer, RGB Alert LEDs' },
        { label: 'Firmware Language', value: 'Embedded C / Arduino Framework' }
      ],
      features: [
        'Continuous analog gas voltage sampling with dynamic rolling average filtering.',
        'Dual threshold detection: Warning state (Amber LED + LCD alert) and Emergency state (Red LED, loud buzzer, and ventilation startup).',
        'Automatic Relay-actuated ventilation: Starts the exhaust fan immediately to disperse flammable vapors.',
        'Servo-controlled emergency airflow flap: Opens exterior duct dampers simultaneously.',
        'Failsafe reset button and system diagnostic routine.'
      ],
      circuitNotes: 'Built and tested on a breadboard with regulated 5V DC supply for the microcontroller and dedicated transistor-relay drive for the high-draw ventilation fan to avoid voltage dips.'
    },
    '3d-animation': {
      title: '3D Animated Video & Visual Communication Showcase',
      category: '3D MODELING, ANIMATION & VISUAL DESIGN',
      summary: 'A creative technical design project exploring 3D asset modeling, cinematic lighting rigs, spatial storytelling, and keyframe animation. Developed to visually communicate engineering concepts and creative narratives.',
      specifications: [
        { label: 'Core Tools', value: 'Blender 3D, Computer Graphics Pipeline' },
        { label: 'Techniques', value: 'Polygon Modeling, UV Unwrapping, PBR Shading, Rigging' },
        { label: 'Rendering', value: 'Real-time & Ray-traced Cycles rendering' },
        { label: 'Audio & Editing', value: 'Video timeline pacing, sound design sync' }
      ],
      features: [
        'Precise geometry modeling and spatial dimensioning.',
        'Three-point studio lighting and volumetric atmosphere effects.',
        'Non-linear keyframe animation curves with realistic acceleration and easing.',
        'Exported high-definition video assets demonstrating visual communication expertise.'
      ],
      circuitNotes: 'Bridges technical engineering documentation with visually engaging modern media.'
    },
    'iot-telemetry': {
      title: 'IoT Sensor Node & Environmental Telemetry',
      category: 'EMBEDDED SYSTEMS & COMMUNICATION',
      summary: 'A sensor telemetry subsystem engineered to capture analog physical signals, perform digital filtering, and transmit environmental metrics across serial and wireless communication protocols.',
      specifications: [
        { label: 'Platform', value: 'Microcontroller Node (C Firmware)' },
        { label: 'Sensing Parameters', value: 'Temperature, Humidity, Ambient Gas levels' },
        { label: 'Protocol', value: 'UART, SPI, I2C bus interfaces' },
        { label: 'Processing', value: 'Digital low-pass filtering and calibration curves' }
      ],
      features: [
        'Real-time packet transmission with checksum verification.',
        'Ultra-low power sleep states between active sampling intervals.',
        'Interfacing with external communication transceivers.',
        'Designed as a scalable modular node for smart campus monitoring.'
      ],
      circuitNotes: 'Emphasizes signal integrity, impedance considerations, and noise decoupling.'
    },
    'microcontroller-logic': {
      title: 'Microcontroller Firmware & Circuit Logic Simulator',
      category: 'DIGITAL LOGIC & EMBEDDED C',
      summary: 'Low-level procedural programming and logic circuits simulating finite state machines (FSM), digital debounce timers, and interrupt service routines for embedded controllers.',
      specifications: [
        { label: 'Language', value: 'ANSI C (C99)' },
        { label: 'Architecture', value: 'State Machine Driven Event Loop' },
        { label: 'Tooling', value: 'Circuit simulators, GCC toolchain, logic analyzer' },
        { label: 'Focus', value: 'Deterministic timing, memory footprint optimization' }
      ],
      features: [
        'Hardware timer interrupt configuration for deterministic period sampling.',
        'Software state machine ensuring smooth transitions between Idle, Monitoring, Alert, and Recovery states.',
        'Debounce logic for mechanical switch inputs.',
        'Verified in both circuit simulator and physical breadboard hardware.'
      ],
      circuitNotes: 'Demonstrates deep grounding in computer engineering fundamentals and low-level C programming.'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseFooterBtn = document.getElementById('modalCloseFooterBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalBadge.textContent = data.category;
    modalTitle.textContent = data.title;

    let specsHtml = data.specifications.map(s => `
      <div style="display:flex; justify-content:space-between; padding:0.35rem 0; border-bottom:1px solid var(--border-color); font-size:0.88rem;">
        <span style="color:var(--text-dim); font-weight:600;">${s.label}:</span>
        <span style="color:var(--text-main); font-weight:500; text-align:right;">${s.value}</span>
      </div>
    `).join('');

    let featuresHtml = data.features.map(f => `<li>${f}</li>`).join('');

    modalBody.innerHTML = `
      <p style="margin-bottom:1.2rem; font-size:1rem; color:var(--text-main);">${data.summary}</p>
      
      <h4 class="modal-section-h">⚙️ TECHNICAL SPECIFICATIONS</h4>
      <div style="background:var(--bg-secondary); padding:1rem; border-radius:6px; margin-bottom:1.2rem; border:1px solid var(--border-color);">
        ${specsHtml}
      </div>

      <h4 class="modal-section-h">🌟 KEY IMPLEMENTATION HIGHLIGHTS</h4>
      <ul class="modal-list">
        ${featuresHtml}
      </ul>

      <h4 class="modal-section-h">🔬 HARDWARE & ARCHITECTURE NOTES</h4>
      <p style="font-size:0.88rem; color:var(--text-muted);">${data.circuitNotes}</p>
    `;

    projectModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    playSuccess();
  }

  function closeProjectModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = '';
    playClick();
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project');
      openProjectModal(pId);
    });

    // Keyboard accessibility (Enter / Space to open)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pId = card.getAttribute('data-project');
        openProjectModal(pId);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.style.display === 'flex') {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     8. PROMPT 10: AI CHAT INTERFACE INTEGRATION ("SHREYANKA AI")
     Interactive message simulator with knowledge base & API integration hooks.
     ========================================================================== */
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const chatClearBtn = document.getElementById('chatClearBtn');
  const chatChips = document.querySelectorAll('.chat-chip');

  // Knowledge base containing Shreyanka S. resume facts
  const botResponses = [
    {
      keywords: ['skill', 'programming', 'language', 'tech', 'stack', 'know', 'tools'],
      response: "My core competencies include:\n• **Programming:** C Programming, Embedded C, Arduino scripting.\n• **Hardware & Electronics:** Arduino Uno, Basic Electronics, Breadboard Prototyping, MQ-2 Gas Sensors, Transducers, Relay & Fan Actuators.\n• **Domains:** Electronics & Communication Engineering, Embedded Systems, IoT, Communication Tech.\n• **Creative:** 3D Design, Modeling, and Animation Visual Communication."
    },
    {
      keywords: ['gas', 'leakage', 'ventilation', 'project', 'arduino', 'sensor', 'detector', 'smoke'],
      response: "My featured engineering project is the **Smart Gas Leakage Detection and Automatic Ventilation System**! 🚨\n\n• **Hardware:** Arduino Uno paired with an MQ gas sensor.\n• **Function:** Continuously monitors atmospheric gas levels. When threshold limits are crossed, it alerts via buzzer/LED and *automatically activates an exhaust ventilation fan* to purge the hazardous gas.\n• **Outcome:** Enhances workplace and residential gas safety through autonomous mechanical response."
    },
    {
      keywords: ['college', 'education', 'university', 'cgpa', 'ait', 'chikkamagaluru', 'degree', 'marks', 'academic', 'be', 'b.e'],
      response: "I am pursuing my **B.E. in Electronics and Communication Engineering (2025–2029)** at **Adichunchanagiri Institute of Technology (AIT), Chikkamagaluru, India**.\n\n🎓 I currently maintain an academic **CGPA of 8.3 / 10.0**!"
    },
    {
      keywords: ['contact', 'email', 'phone', 'hire', 'call', 'reach', 'resume', 'internship', 'job'],
      response: "You can easily reach me:\n• 📧 **Email:** [sshreyanka20@gmail.com](mailto:sshreyanka20@gmail.com)\n• 📱 **Phone:** [+91 7892393895](tel:+917892393895)\n• 📍 **Location:** Chikkamagaluru, Karnataka, India\n• 📄 You can also download my resume from the button in the hero or about section!"
    },
    {
      keywords: ['3d', 'animation', 'video', 'design', 'blender', 'visual'],
      response: "In addition to hardware, I created a **3D Animated Video** focusing on spatial 3D design, geometry modeling, keyframe pacing, and visual communication. I love combining engineering precision with creative visual storytelling!"
    },
    {
      keywords: ['objective', 'goal', 'about', 'who are you', 'introduce'],
      response: "I am **Shreyanka S.**, an Electronics & Communication Engineering student seeking internship and project opportunities where I can apply my skills in microcontrollers, embedded systems, and innovative engineering!"
    }
  ];

  function appendChatMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    // Format newlines and markdown-like bold
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    bubble.innerHTML = `
      <p>${formattedText}</p>
      <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot typing-msg';
    typingDiv.innerHTML = `
      <div class="msg-bubble typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  /**
   * PROMPT 10 REQUIREMENT:
   * AI Query Handler with Backend API Integration Hook.
   * Here an external API (such as OpenAI, Gemini, or a backend server endpoint)
   * can be plugged in directly via fetch().
   */
  async function handleUserQuery(queryText) {
    appendChatMessage(queryText, 'user');
    chatInput.value = '';

    const typingEl = showTypingIndicator();

    /* ========================================================================
       API INTEGRATION POINT (OPENAI / GEMINI / CLOUD ENDPOINT):
       To connect a real live AI backend, replace the local matching logic below
       with an authenticated API call:
       
       Example Integration:
       ---------------------
       try {
         const response = await fetch('https://api.openai.com/v1/chat/completions', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${YOUR_API_KEY}`
           },
           body: JSON.stringify({
             model: 'gpt-4o-mini',
             messages: [
               { role: 'system', content: 'You are AI Shreyanka S., an ECE student...' },
               { role: 'user', content: queryText }
             ]
           })
         });
         const data = await response.json();
         const reply = data.choices[0].message.content;
         typingEl.remove();
         appendChatMessage(reply, 'bot');
       } catch (err) {
         typingEl.remove();
         appendChatMessage('Sorry, connection error.', 'bot');
       }
       ======================================================================== */

    // Simulated Intelligent Local Knowledge Engine (Deterministic Fallback)
    setTimeout(() => {
      typingEl.remove();

      const lower = queryText.toLowerCase();
      let match = null;

      for (const item of botResponses) {
        if (item.keywords.some(k => lower.includes(k))) {
          match = item.response;
          break;
        }
      }

      if (!match) {
        match = "That's a great question! As an ECE student at AIT Chikkamagaluru (CGPA 8.3), I specialize in **C Programming**, **Arduino Microcontrollers**, **Gas Sensors & Automatic Ventilation**, and **3D Design**.\n\nYou can also reach out to me directly at **sshreyanka20@gmail.com** or via the contact form below!";
      }

      appendChatMessage(match, 'bot');
      playBlip();
    }, 600);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value.trim();
      if (query) {
        handleUserQuery(query);
      }
    });
  }

  // Quick Chips
  chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        handleUserQuery(prompt);
      }
    });
  });

  // Clear Chat History
  if (chatClearBtn) {
    chatClearBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-msg bot">
          <div class="msg-bubble">
            <p>Chat cleared! Ready for your next question about Shreyanka's projects or skills. 👾</p>
            <span class="msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      `;
      showToast('🗑️ Chat log reset');
      playClick();
    });
  }

  /* ==========================================================================
     9. PROMPT 11: CONTACT FORM WITH EMAIL API FUNCTIONALITY
     Client-side validation, high contrast submit, feedback toasts, and API stub.
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactSubject = document.getElementById('contactSubject');
  const contactMessage = document.getElementById('contactMessage');
  const formStatus = document.getElementById('formStatus');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      contactName.classList.remove('invalid');
      contactEmail.classList.remove('invalid');
      contactMessage.classList.remove('invalid');
      formStatus.style.display = 'none';

      // Name validation
      if (!contactName.value.trim()) {
        nameError.textContent = 'Please provide your full name.';
        contactName.classList.add('invalid');
        isValid = false;
      }

      // Email validation
      if (!contactEmail.value.trim() || !validateEmail(contactEmail.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        contactEmail.classList.add('invalid');
        isValid = false;
      }

      // Message validation
      if (!contactMessage.value.trim() || contactMessage.value.trim().length < 10) {
        messageError.textContent = 'Please write a message with at least 10 characters.';
        contactMessage.classList.add('invalid');
        isValid = false;
      }

      if (!isValid) {
        play8BitTone(220, 'sawtooth', 0.15, 0.08); // Error buzz
        return;
      }

      // Prepare payload
      const formData = {
        name: contactName.value.trim(),
        email: contactEmail.value.trim(),
        subject: contactSubject.value.trim() || 'Portfolio Inquiry',
        message: contactMessage.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Button loading state
      const originalBtnText = contactSubmitBtn.innerHTML;
      contactSubmitBtn.innerHTML = '<span>⏳ TRANSMITTING...</span>';
      contactSubmitBtn.disabled = true;

      /* ======================================================================
         PROMPT 11 REQUIREMENT: EMAIL SERVICE INTEGRATION POINT (e.g. Resend API)
         Add comments indicating where an email-sending service (such as Resend API
         or EmailJS) should occur.
         
         Example Integration with Resend API:
         -------------------------------------
         try {
           const resendResponse = await fetch('https://api.resend.com/emails', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${RESEND_API_KEY}`
             },
             body: JSON.stringify({
               from: 'Portfolio Contact <onboarding@resend.dev>',
               to: ['sshreyanka20@gmail.com'],
               reply_to: formData.email,
               subject: `[Portfolio] ${formData.subject} - from ${formData.name}`,
               html: `<p><strong>Name:</strong> ${formData.name}</p>
                      <p><strong>Email:</strong> ${formData.email}</p>
                      <p><strong>Message:</strong><br>${formData.message}</p>`
             })
           });
           const resendData = await resendResponse.json();
           console.log('Resend API Success:', resendData);
         } catch (err) {
           console.error('Email API Error:', err);
         }
         ====================================================================== */

      // Simulate network roundtrip and confirm
      setTimeout(() => {
        contactSubmitBtn.innerHTML = originalBtnText;
        contactSubmitBtn.disabled = false;

        formStatus.className = 'form-status-box success';
        formStatus.innerHTML = `
          <strong>🎉 Transmission Successful!</strong><br>
          Thank you, <strong>${formData.name}</strong>. Your message has been safely received. Shreyanka will get back to you at <em>${formData.email}</em> shortly!
        `;
        formStatus.style.display = 'block';

        contactForm.reset();
        showToast('📨 Message sent successfully!');
        playSuccess();
      }, 700);
    });
  }

  // Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Copied sshreyanka20@gmail.com to clipboard!');
        playClick();
      }).catch(() => {
        showToast('Direct email: sshreyanka20@gmail.com');
      });
    });
  }

  /* ==========================================================================
     10. INTERACTIVE TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message, duration = 3200) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
});
