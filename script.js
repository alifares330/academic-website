// Interactive Logic for Dr. Ali Fares Academic Website

document.addEventListener('DOMContentLoaded', () => {
    initBgCanvas();
    initMetricCounters();
    initConsoleTabs();
    initGprCanvas();
    initRuttingCanvas();
    initFuzzyCalculator();
    initPubSearch();
    initMobileNav();
    initAppaStatus();
});

// 1. Background Particle & Wave Canvas
function initBgCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw ambient connecting lines (Multi-sensing graph network visualizer)
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Render particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.fillStyle = `rgba(0, 255, 170, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// 2. Animated Metric Counters
function initMetricCounters() {
    const metricValues = document.querySelectorAll('.metric-value');
    let animated = false;

    function checkScroll() {
        const heroSection = document.getElementById('hero');
        if (!heroSection || animated) return;

        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animated = true;
            metricValues.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'), 10);
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = current;
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

// 3. APPA Console Tabs & Crack Overlay Toggle
function initConsoleTabs() {
    const tabBtns = document.querySelectorAll('.console-tab-btn');
    const panels = document.querySelectorAll('.tool-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const toolId = btn.getAttribute('data-tool');
            const targetPanel = document.getElementById(`tool-${toolId}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // Toggle Crack Mask
    const toggleMaskBtn = document.getElementById('toggleMaskBtn');
    const crackOverlay = document.getElementById('crackOverlay');

    if (toggleMaskBtn && crackOverlay) {
        toggleMaskBtn.addEventListener('click', () => {
            if (crackOverlay.style.opacity === '0') {
                crackOverlay.style.opacity = '1';
                toggleMaskBtn.innerHTML = '<i data-lucide="sliders"></i> Hide AI Segmentation Mask';
            } else {
                crackOverlay.style.opacity = '0';
                toggleMaskBtn.innerHTML = '<i data-lucide="sliders"></i> Show AI Segmentation Mask';
            }
            if (window.lucide) lucide.createIcons();
        });
    }
}

// 4. GPR Subsurface Canvas B-Scan Wave Simulation
function initGprCanvas() {
    const canvas = document.getElementById('gprCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    function renderGpr() {
        ctx.fillStyle = '#04070e';
        ctx.fillRect(0, 0, width, height);

        // Draw GPR B-Scan reflection waves (Asphalt Layer, Base Layer, Subgrade)
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;

        // Layer 1: Surface to Asphalt Base (Depth ~60px)
        ctx.beginPath();
        ctx.moveTo(0, 60);
        for (let x = 0; x < width; x += 10) {
            const y = 60 + Math.sin(x * 0.05) * 3 + (Math.random() - 0.5) * 2;
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Layer 2: Granular Base Interfacing (Depth ~130px) with Rebar Anomaly Parabola
        ctx.strokeStyle = '#00ffaa';
        ctx.beginPath();
        ctx.moveTo(0, 130);
        for (let x = 0; x < width; x += 5) {
            // Rebar Hyperbola at x = 300
            const hyperbola = Math.sqrt(Math.pow((x - 300) * 0.8, 2) + 400);
            const y = 130 + Math.sin(x * 0.03) * 2 + (x > 200 && x < 400 ? hyperbola - 20 : 0);
            ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Hyperbola highlighting box
        ctx.strokeStyle = '#ffbd2e';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(260, 110, 80, 60);
        ctx.setLineDash([]);

        ctx.fillStyle = '#ffbd2e';
        ctx.font = '12px JetBrains Mono';
        ctx.fillText('Rebar Hyperbola Signal', 250, 100);
    }

    renderGpr();
}

// 5. 3D Rut Depth Canvas Simulation
function initRuttingCanvas() {
    const canvas = document.getElementById('ruttingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    function renderRutting() {
        ctx.fillStyle = '#04070e';
        ctx.fillRect(0, 0, width, height);

        // Draw Pavement Cross Section Line
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(20, 80);

        // Left Wheel Path Rut (Deep Dip around x=150)
        ctx.bezierCurveTo(80, 80, 120, 160, 170, 160);
        ctx.bezierCurveTo(220, 160, 250, 80, 300, 80);

        // Right Wheel Path Rut (Minor Dip around x=430)
        ctx.bezierCurveTo(360, 80, 400, 125, 430, 125);
        ctx.bezierCurveTo(460, 125, 500, 80, 580, 80);

        ctx.stroke();

        // Draw Reference Datum Line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(20, 80);
        ctx.lineTo(580, 80);
        ctx.stroke();
        ctx.setLineDash([]);

        // Annotations
        ctx.fillStyle = '#00ffaa';
        ctx.font = '11px JetBrains Mono';
        ctx.fillText('Left Rut Depth: 14.2 mm', 120, 180);
        ctx.fillText('Right Rut Depth: 8.7 mm', 390, 145);
    }

    renderRutting();
}

// 6. Interactive Fuzzy AHP & PCI Calculator
function initFuzzyCalculator() {
    const crackSlider = document.getElementById('crackSlider');
    const rutSlider = document.getElementById('rutSlider');
    const gprSlider = document.getElementById('gprSlider');

    const crackVal = document.getElementById('crackVal');
    const rutVal = document.getElementById('rutVal');
    const gprVal = document.getElementById('gprVal');

    const pciVal = document.getElementById('pciVal');
    const fuzzyVal = document.getElementById('fuzzyVal');
    const actionVal = document.getElementById('actionVal');

    if (!crackSlider) return;

    function recalculate() {
        const c = parseInt(crackSlider.value, 10);
        const r = parseInt(rutSlider.value, 10);
        const g = parseInt(gprSlider.value, 10);

        crackVal.textContent = c;
        rutVal.textContent = r;
        gprVal.textContent = g;

        // Weighted Deductive Index Calculation (Fuzzy AHP Weights: Cracking 0.45, Rutting 0.35, GPR Subsurface 0.20)
        const totalDeduction = (c * 0.45) + (r * 0.35) + (g * 0.20);
        const pci = Math.max(0, Math.min(100, (100 - totalDeduction))).toFixed(1);

        pciVal.textContent = `${pci} / 100`;

        if (pci >= 85) {
            fuzzyVal.textContent = 'Excellent (0.920 Membership)';
            fuzzyVal.style.color = '#00ffaa';
            actionVal.textContent = 'Routine Monitoring Only';
        } else if (pci >= 70) {
            fuzzyVal.textContent = 'Good (0.785 Membership)';
            fuzzyVal.style.color = '#00e5ff';
            actionVal.textContent = 'Minor Crack Sealing';
        } else if (pci >= 50) {
            fuzzyVal.textContent = 'Fair / Moderate (0.612 Membership)';
            fuzzyVal.style.color = '#ffbd2e';
            actionVal.textContent = 'Preventive Maintenance (Overlay & Sealing)';
        } else {
            fuzzyVal.textContent = 'Critical / Poor (0.340 Membership)';
            fuzzyVal.style.color = '#ff5f56';
            actionVal.textContent = 'Structural Rehabilitation / Resurfacing Required';
        }
    }

    [crackSlider, rutSlider, gprSlider].forEach(slider => {
        slider.addEventListener('input', recalculate);
    });
}

// 7. Publication Search and Filter
function initPubSearch() {
    const searchInput = document.getElementById('pubSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');

    if (!searchInput) return;

    let activeFilter = 'all';

    function filterPubs() {
        const query = searchInput.value.toLowerCase().trim();

        pubCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            const categories = card.getAttribute('data-category') || '';

            const matchesCategory = (activeFilter === 'all') || categories.includes(activeFilter);
            const matchesQuery = !query || text.includes(query);

            if (matchesCategory && matchesQuery) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterPubs);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            activeFilter = btn.getAttribute('data-filter');
            filterPubs();
        });
    });
}

// 8. Mobile Navigation Toggle
function initMobileNav() {
    const btn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#0b0f19';
            navLinks.style.padding = '1.5rem';
            navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });
}


/* ---------------------------------------------------------------------------
   9. APPA live status
   ---------------------------------------------------------------------------
   The console runs on a lab machine, so it is not always up. Rather than ship a
   button that 404s whenever the server is off, ask the backend and render the
   truth: green and clickable when it answers, amber with a contact line when it
   does not. No upkeep — the day the server comes online the page says so itself.

   Two things to know when you move it to the lab server:
     * this page is HTTPS, so APPA_URL must be HTTPS too. A browser silently
       blocks an http:// request from an https:// page, and a self-signed
       certificate fails the same way. Let's Encrypt is free.
     * the backend already sends permissive CORS and exposes /api/health, so
       nothing needs changing on the APPA side.
   Set APPA_URL to '' to hide the link and show only the contact message.
--------------------------------------------------------------------------- */
const APPA_URL = 'https://sequence-retrieval-purely.ngrok-free.dev';
const APPA_EMAIL = 'ali-i.fares@connect.polyu.hk';

async function initAppaStatus() {
    const dot = document.getElementById('appa-dot');
    const btn = document.getElementById('appa-btn');
    const label = document.getElementById('appa-label');
    const note = document.getElementById('appa-note');
    if (!dot || !btn || !label || !note) return;

    const offline = (why) => {
        dot.style.background = '#f0b429';
        dot.style.boxShadow = '0 0 0 4px rgba(240,180,41,.16)';
        label.textContent = 'Console offline';
        btn.removeAttribute('href');
        btn.setAttribute('aria-disabled', 'true');
        // Do NOT just dim it: btn-primary is a bright gradient, and lowering
        // opacity turns the label into an unreadable smear. Strip the gradient
        // and use an explicit muted style so the text stays legible.
        btn.style.background = 'transparent';
        btn.style.backgroundImage = 'none';
        btn.style.boxShadow = 'none';
        btn.style.border = '1px solid rgba(255,255,255,.22)';
        btn.style.color = '#cbd5e1';
        btn.style.opacity = '1';
        btn.style.cursor = 'default';
        btn.style.pointerEvents = 'none';
        note.style.color = '#94a3b8';
        note.innerHTML = why +
            ` <a href="mailto:${APPA_EMAIL}?subject=APPA%20demo%20access"` +
            ' style="color:#5eead4;text-decoration:underline;">Email me</a> for a demo or access.';
    };

    const url = (APPA_URL || '').replace(/\/+$/, '');
    if (!url) { offline('The console runs on a lab server.'); return; }

    try {
        // AbortController rather than a fetch timeout: wider browser support, and
        // an unreachable host would otherwise hang for the full TCP timeout.
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 5000);
        const res = await fetch(url + '/api/health', {
            signal: ctrl.signal, mode: 'cors', cache: 'no-store',
            headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(res.status);

        dot.style.background = '#22c55e';
        dot.style.boxShadow = '0 0 0 4px rgba(34,197,94,.20)';
        label.textContent = 'Launch APPA Console';
        btn.setAttribute('href', url);
        btn.setAttribute('target', '_blank');
        btn.setAttribute('rel', 'noopener');
        btn.removeAttribute('aria-disabled');
        note.textContent = 'Live now';
    } catch (err) {
        offline('The console is not reachable at the moment.');
    }
}
