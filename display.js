// ------------------------------------------------------------------
// Display settings: theme (Auto / Light / Dark) and reading text size.
//
// Loaded synchronously in <head> on every page so the saved theme and
// size are applied before first paint - no flash of the wrong theme.
//
// "Auto" means automatic for BOTH: the theme follows the OS light/dark
// setting and the text size follows the screen width. A- / A+ switch
// the size to a manual step; choosing Theme: Auto hands it back to the
// screen. Settings are shared by the workspace and the document window,
// and a change in one updates the other live.
// ------------------------------------------------------------------
(function() {
    'use strict';

    const KEY = 'sapEaDisplay';
    const THEMES = ['auto', 'light', 'dark'];
    const THEME_LABELS = { auto: 'Auto', light: 'Light', dark: 'Dark' };
    const STEPS = [0.85, 0.92, 1, 1.1, 1.2, 1.35, 1.5];
    const root = document.documentElement;
    const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function load() {
        let saved = null;
        try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
        const theme = saved && THEMES.indexOf(saved.theme) !== -1 ? saved.theme : 'auto';
        const size = saved && STEPS.indexOf(saved.size) !== -1 ? saved.size : 'auto';
        return { theme: theme, size: size };
    }

    let prefs = load();

    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) { /* private mode: settings last for this page only */ }
    }

    // Reading size tuned to the screen. Phones and ordinary laptops read
    // at 100% (their layouts are already sized for them); wider monitors
    // step up so the fixed-width reading column doesn't shrink to a strip.
    function autoZoom() {
        const w = window.innerWidth || root.clientWidth || 1280;
        if (w >= 2200) return 1.35;
        if (w >= 1800) return 1.2;
        if (w >= 1440) return 1.1;
        return 1;
    }

    function resolvedTheme() {
        if (prefs.theme !== 'auto') return prefs.theme;
        return darkQuery && darkQuery.matches ? 'dark' : 'light';
    }

    function currentZoom() {
        return prefs.size === 'auto' ? autoZoom() : prefs.size;
    }

    function apply() {
        const theme = resolvedTheme();
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        root.style.setProperty('--reading-zoom', String(currentZoom()));
        updateControls();
    }

    function updateControls() {
        const smaller = document.getElementById('displaySmaller');
        const larger = document.getElementById('displayLarger');
        const themeBtn = document.getElementById('displayTheme');
        if (!themeBtn) return;

        const zoom = currentZoom();
        const pct = Math.round(zoom * 100) + '%';
        const sizeNote = prefs.size === 'auto' ? pct + ', automatic for this screen' : pct;
        const idx = STEPS.indexOf(zoom);

        if (smaller) {
            smaller.disabled = idx === 0;
            smaller.title = 'Smaller text (now ' + sizeNote + ')';
            smaller.setAttribute('aria-label', 'Decrease text size, currently ' + sizeNote);
        }
        if (larger) {
            larger.disabled = idx === STEPS.length - 1;
            larger.title = 'Larger text (now ' + sizeNote + ')';
            larger.setAttribute('aria-label', 'Increase text size, currently ' + sizeNote);
        }

        const label = themeBtn.querySelector('.display-theme__value');
        if (label) label.textContent = THEME_LABELS[prefs.theme];
        themeBtn.title = prefs.theme === 'auto'
            ? 'Theme: Auto — follows your device theme, and text size follows your screen (' + pct + '). Click to switch.'
            : 'Theme: ' + THEME_LABELS[prefs.theme] + ' — click to switch. Choose Auto to follow your device and screen again.';
        themeBtn.setAttribute('aria-label', 'Theme ' + THEME_LABELS[prefs.theme] + ', text size ' + sizeNote + '. Activate to change theme.');
    }

    function stepSize(direction) {
        const zoom = currentZoom();
        let idx = STEPS.indexOf(zoom);
        if (idx === -1) idx = STEPS.indexOf(1);
        const next = Math.max(0, Math.min(STEPS.length - 1, idx + direction));
        prefs.size = STEPS[next];
        save();
        apply();
    }

    function cycleTheme() {
        const next = THEMES[(THEMES.indexOf(prefs.theme) + 1) % THEMES.length];
        prefs.theme = next;
        // Auto is automatic for size too: hand the size back to the screen.
        if (next === 'auto') prefs.size = 'auto';
        save();
        apply();
    }

    // Apply immediately (we're in <head>, before the body paints).
    apply();

    function wire() {
        const smaller = document.getElementById('displaySmaller');
        const larger = document.getElementById('displayLarger');
        const themeBtn = document.getElementById('displayTheme');
        if (smaller) smaller.addEventListener('click', function() { stepSize(-1); });
        if (larger) larger.addEventListener('click', function() { stepSize(1); });
        if (themeBtn) themeBtn.addEventListener('click', cycleTheme);
        updateControls();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wire);
    } else {
        wire();
    }

    // Auto size tracks the window; Auto theme tracks the OS setting.
    let resizeTimer = null;
    window.addEventListener('resize', function() {
        if (prefs.size !== 'auto') return;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(apply, 120);
    });

    if (darkQuery) {
        const onScheme = function() { if (prefs.theme === 'auto') apply(); };
        if (darkQuery.addEventListener) darkQuery.addEventListener('change', onScheme);
        else if (darkQuery.addListener) darkQuery.addListener(onScheme);
    }

    // Keep the workspace and the document window in step.
    window.addEventListener('storage', function(e) {
        if (e.key !== KEY) return;
        prefs = load();
        apply();
    });
})();
