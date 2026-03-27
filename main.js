document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor - Smooth and instant, optimized for rapid movement
    document.addEventListener('mousemove', (e) => {
        // Direct update for zero-latency tracking
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        
        if (cursor.style.opacity !== '1') {
            cursor.style.opacity = '1';
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // ─── Favicon ─────────────────────────────────────────────────────────────
    function updateFavicon(isLight) {
        // Remove all existing favicon links
        document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(l => l.remove());

        // Use a cache-busting timestamp
        const t = Date.now();

        if (isLight) {
            const a = Object.assign(document.createElement('link'), { rel: 'icon', type: 'image/svg+xml', href: `favicon-light.svg?t=${t}`, id: 'favicon-svg' });
            const b = Object.assign(document.createElement('link'), { rel: 'shortcut icon', href: `favicon-light.svg?t=${t}`, id: 'favicon-shortcut' });
            document.head.append(a, b);
        } else {
            const a = Object.assign(document.createElement('link'), { rel: 'icon', type: 'image/svg+xml', href: `favicon.svg?t=${t}`, id: 'favicon-svg' });
            a.sizes = 'any';
            const b = Object.assign(document.createElement('link'), { rel: 'icon', href: `favicon.ico?t=${t}`, id: 'favicon-ico' });
            b.sizes = '32x32';
            const c = Object.assign(document.createElement('link'), { rel: 'shortcut icon', href: `favicon.svg?t=${t}`, id: 'favicon-shortcut' });
            document.head.append(a, b, c);
        }
        // No link-touching setTimeout — favicon switches instantly
    }

    // ─── Theme ────────────────────────────────────────────────────────────────
    const html = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            html.classList.add('light-mode');
            if (themeToggleBtn) themeToggleBtn.textContent = 'dark';
            updateFavicon(true);
        } else {
            html.classList.remove('light-mode');
            if (themeToggleBtn) themeToggleBtn.textContent = 'light';
            updateFavicon(false);
        }
        
        // Enable transitions after initial state is settled
        requestAnimationFrame(() => {
            html.classList.remove('no-transitions');
        });
    }

    initializeTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            html.classList.toggle('light-mode');
            const isLight = html.classList.contains('light-mode');
            updateFavicon(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            themeToggleBtn.textContent = isLight ? 'dark' : 'light';
        });
    }

    // ─── Clock ────────────────────────────────────────────────────────────────
    function updateTime() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }
    setInterval(updateTime, 1000);
    updateTime();
});
