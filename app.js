// ============================================================
// SAP EA Certification Workspace - App Shell Script
// ============================================================

(function() {
    'use strict';

    const DEFAULT_SHEET = 'sheet-00';

    function slugify(text) {
        return text.toLowerCase().trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 60);
    }

    // ------------------------------------------------------------------
    // Sheet + heading index (derived from the DOM - not duplicated data)
    // ------------------------------------------------------------------
    function buildSheetIndex() {
        const sheets = [...document.querySelectorAll('.sheet')].map(el => ({
            id: el.id,
            title: el.dataset.title || el.id,
            group: el.dataset.group || '',
            code: el.dataset.code || '',
            el
        }));

        // Assign deterministic, URL-safe anchor IDs to in-sheet headings
        // (h2/h3/h4) so search can jump to a subsection and links stay stable.
        sheets.forEach(sheet => {
            sheet.headings = [];
            sheet.el.querySelectorAll('h2, h3, h4').forEach(h => {
                if (!h.id) {
                    const slug = slugify(h.textContent);
                    if (slug) h.id = `${sheet.id}-${slug}`;
                }
                if (h.id) sheet.headings.push({ id: h.id, text: h.textContent.trim(), el: h });
            });
        });

        return sheets;
    }

    // ------------------------------------------------------------------
    // Progress Tracker (Sheet 12 checklist) - drives context bar %
    // ------------------------------------------------------------------
    const trackerKey = 'sapEaProgress';

    function loadProgress() {
        try {
            const saved = localStorage.getItem(trackerKey);
            if (saved) return JSON.parse(saved);
        } catch (e) { console.log('Error loading progress:', e); }
        return {
            foundation: false, framework: false, vision: false, business: false,
            dataTech: false, defense: false, practice: false, readiness: false
        };
    }

    function saveProgress(data) {
        try { localStorage.setItem(trackerKey, JSON.stringify(data)); }
        catch (e) { console.log('Error saving progress:', e); }
    }

    function progressStats() {
        const progress = loadProgress();
        const total = Object.keys(progress).length;
        const completed = Object.values(progress).filter(v => v === true).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, percentage };
    }

    function updateProgressDisplays() {
        const { total, completed, percentage } = progressStats();
        const progressDisplay = document.getElementById('progressDisplay');
        if (progressDisplay) progressDisplay.textContent = `${completed}/${total} (${percentage}%)`;
        const ctxProgressValue = document.getElementById('ctxProgressValue');
        if (ctxProgressValue) ctxProgressValue.textContent = `${percentage}%`;
    }

    // ------------------------------------------------------------------
    // Quiz Progress (persisted score, shown in tracker + practice sheet)
    // ------------------------------------------------------------------
    const quizProgressKey = 'sapEaQuizProgress';

    function trackQuizProgress(score) {
        try {
            const current = JSON.parse(localStorage.getItem(quizProgressKey) || '{}');
            current.lastScore = score;
            current.attempts = (current.attempts || 0) + 1;
            current.lastAttempt = new Date().toISOString();
            localStorage.setItem(quizProgressKey, JSON.stringify(current));
        } catch (e) { console.log('Error tracking quiz progress:', e); }
    }

    function getQuizProgress() {
        try {
            const data = localStorage.getItem(quizProgressKey);
            return data ? JSON.parse(data) : null;
        } catch (e) { console.log('Error getting quiz progress:', e); return null; }
    }

    function displayQuizProgress() {
        const progress = getQuizProgress();
        const text = progress
            ? `📊 Quiz: ${progress.lastScore || 0}% (${progress.attempts || 0} attempt${progress.attempts === 1 ? '' : 's'})`
            : '📊 Quiz: Not started yet';
        document.querySelectorAll('.js-quiz-progress-display').forEach(el => { el.textContent = text; });
    }

    // ------------------------------------------------------------------
    // Scenario Quiz Logic (Practice sheet)
    // ------------------------------------------------------------------
    const quizState = { answered: {}, correct: {} };

    function totalQuizQuestions() {
        return document.querySelectorAll('.quiz-options').length;
    }

    function updateLiveQuizTally() {
        const tally = document.getElementById('quizLiveTally');
        if (!tally) return;
        const total = totalQuizQuestions();
        const answeredCount = Object.keys(quizState.answered).length;
        const correctCount = Object.values(quizState.correct).filter(Boolean).length;
        if (answeredCount === 0) {
            tally.textContent = `Answer questions below to track your score (0/${total} answered)`;
        } else {
            const pct = Math.round((correctCount / answeredCount) * 100);
            tally.textContent = `${answeredCount}/${total} answered · ${correctCount} correct (${pct}%)`;
        }
    }

    function checkAnswer(questionName, correctAnswer, feedbackId) {
        const selected = document.querySelector(`input[name="${questionName}"]:checked`);
        const feedback = document.getElementById(feedbackId);
        const options = document.querySelectorAll(`input[name="${questionName}"]`);

        if (!selected) { alert('Please select an answer first.'); return; }

        options.forEach(opt => opt.closest('label').classList.remove('selected', 'correct', 'wrong'));
        feedback.classList.add('show');

        options.forEach(opt => {
            const label = opt.closest('label');
            if (opt.value === correctAnswer) label.classList.add('correct');
            else if (opt.checked && opt.value !== correctAnswer) label.classList.add('wrong');
        });

        document.getElementById(feedbackId).closest('.quiz-card').querySelector('.quiz-submit').disabled = true;

        quizState.answered[questionName] = true;
        quizState.correct[questionName] = selected.value === correctAnswer;
        updateLiveQuizTally();

        const total = totalQuizQuestions();
        if (Object.keys(quizState.answered).length === total && total > 0) {
            const correctCount = Object.values(quizState.correct).filter(Boolean).length;
            trackQuizProgress(Math.round((correctCount / total) * 100));
            displayQuizProgress();
        }
    }

    function resetAllQuizzes() {
        if (!confirm('Reset all quiz answers? Your progress will be cleared.')) return;

        document.querySelectorAll('.quiz-card').forEach(card => {
            card.querySelectorAll('input[type="radio"]').forEach(input => {
                input.checked = false;
                input.closest('label').classList.remove('selected', 'correct', 'wrong');
            });
            card.querySelectorAll('.feedback-text').forEach(fb => fb.classList.remove('show'));
            const submitBtn = card.querySelector('.quiz-submit');
            if (submitBtn) submitBtn.disabled = false;
        });

        quizState.answered = {};
        quizState.correct = {};
        updateLiveQuizTally();

        const quizzesSection = document.getElementById('quizzes');
        if (quizzesSection) quizzesSection.scrollIntoView({ behavior: 'smooth' });
    }

    window.checkAnswer = checkAnswer;
    window.resetAllQuizzes = resetAllQuizzes;

    // ------------------------------------------------------------------
    // Study Desk: per-sheet notes, resize, collapse
    // ------------------------------------------------------------------
    const notesKey = 'sapEaNotes';
    const studyDeskStateKey = 'sapEaStudyDeskState';

    function loadNotes() {
        try { return JSON.parse(localStorage.getItem(notesKey) || '{}'); }
        catch (e) { return {}; }
    }

    function saveNote(sheetId, text) {
        try {
            const notes = loadNotes();
            if (text) notes[sheetId] = text; else delete notes[sheetId];
            localStorage.setItem(notesKey, JSON.stringify(notes));
        } catch (e) { console.log('Error saving note:', e); }
    }

    function hasNote(sheetId) {
        const notes = loadNotes();
        return !!(notes[sheetId] && notes[sheetId].trim());
    }

    function noteExcerpt(text) {
        const oneLine = text.trim().replace(/\s+/g, ' ');
        return oneLine.length > 90 ? oneLine.slice(0, 90) + '…' : oneLine;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function loadStudyDeskState() {
        try { return JSON.parse(localStorage.getItem(studyDeskStateKey) || '{}'); }
        catch (e) { return {}; }
    }

    function saveStudyDeskState(state) {
        try { localStorage.setItem(studyDeskStateKey, JSON.stringify(state)); }
        catch (e) { console.log('Error saving study desk state:', e); }
    }

    // ------------------------------------------------------------------
    // Bookmarks (per sheet, shown as the context bar star)
    // ------------------------------------------------------------------
    const bookmarksKey = 'sapEaBookmarks';

    function loadBookmarks() {
        try { return JSON.parse(localStorage.getItem(bookmarksKey) || '{}'); }
        catch (e) { return {}; }
    }

    function saveBookmarks(data) {
        try { localStorage.setItem(bookmarksKey, JSON.stringify(data)); }
        catch (e) { console.log('Error saving bookmarks:', e); }
    }

    // ------------------------------------------------------------------
    // Last visited sheet (drives "Continue Studying" in Review)
    // ------------------------------------------------------------------
    const lastVisitedKey = 'sapEaLastVisited';
    const REVIEW_SHEET_ID = 'sheet-review';

    function saveLastVisited(sheetId) {
        try { localStorage.setItem(lastVisitedKey, sheetId); }
        catch (e) { console.log('Error saving last-visited sheet:', e); }
    }

    function getLastVisitedSheet() {
        try { return localStorage.getItem(lastVisitedKey); }
        catch (e) { return null; }
    }

    // ------------------------------------------------------------------
    // Review Hub: derives its state from the same sheet index, bookmarks,
    // notes and quiz progress everything else already uses - no second
    // list of sheets, no fabricated metrics.
    // ------------------------------------------------------------------
    function getBookmarkedSheets(sheetIndex) {
        const bookmarks = loadBookmarks();
        return sheetIndex.filter(s => s.id !== REVIEW_SHEET_ID && bookmarks[s.id]);
    }

    function getNotedSheets(sheetIndex) {
        const notes = loadNotes();
        return sheetIndex
            .filter(s => s.id !== REVIEW_SHEET_ID && notes[s.id] && notes[s.id].trim())
            .map(s => ({ sheet: s, excerpt: noteExcerpt(notes[s.id]) }));
    }

    function renderReviewSection(title, count, bodyHtml) {
        const badge = count === null ? '' : `<span class="review-section__count">${count}</span>`;
        return `<section class="review-section">
            <h2 class="review-section__title">${title}${badge}</h2>
            <div class="review-section__body">${bodyHtml}</div>
        </section>`;
    }

    function renderReviewItem(sheet, metaHtml, ctaHtml) {
        return `<a class="review-item" href="#${sheet.id}">
            <span class="review-item__code">${escapeHtml(sheet.code)}</span>
            <span class="review-item__body">
                <span class="review-item__title">${escapeHtml(sheet.title)}</span>
                ${metaHtml}
            </span>
            ${ctaHtml || ''}
        </a>`;
    }

    function renderReviewHub(sheetIndex, filter) {
        const container = document.getElementById('reviewHubContent');
        if (!container) return;

        const bookmarked = getBookmarkedSheets(sheetIndex);
        const noted = getNotedSheets(sheetIndex);
        const practice = getQuizProgress();
        const lastVisitedId = getLastVisitedSheet();
        const lastVisited = lastVisitedId ? sheetIndex.find(s => s.id === lastVisitedId) : null;

        const showAll = filter === 'all';
        const isEmpty = bookmarked.length === 0 && noted.length === 0 && !practice;
        let html = '';

        if (lastVisited) {
            html += `<div class="review-continue">
                <span class="review-continue__label">Continue Studying</span>
                <a class="review-continue__link" href="#${lastVisited.id}">
                    <span class="review-item__code">${escapeHtml(lastVisited.code)}</span> ${escapeHtml(lastVisited.title)}
                    <span class="review-continue__cta">Continue where you left off →</span>
                </a>
            </div>`;
        }

        if (isEmpty) {
            html += `<div class="review-empty-state">
                <p><strong>Nothing here yet.</strong></p>
                <p>Bookmark a sheet or add a Study Desk note while studying and it will appear here.</p>
            </div>`;
        } else {
            if (showAll || filter === 'bookmarked') {
                const body = bookmarked.length
                    ? bookmarked.map(s => renderReviewItem(
                        s,
                        `<span class="review-item__meta">★ Bookmarked${hasNote(s.id) ? ' <span class="review-item__flag">✎ Has notes</span>' : ''}</span>`
                    )).join('')
                    : '<p class="review-empty">No bookmarks yet — star a sheet while studying to add it here.</p>';
                html += renderReviewSection('Bookmarked', bookmarked.length, body);
            }

            if (showAll || filter === 'notes') {
                const body = noted.length
                    ? noted.map(n => renderReviewItem(
                        n.sheet,
                        `<span class="review-item__note">"${escapeHtml(n.excerpt)}"</span>`
                    )).join('')
                    : '<p class="review-empty">No notes yet — jot something in the Study Desk while studying.</p>';
                html += renderReviewSection('Your Notes', noted.length, body);
            }

            if (showAll || filter === 'practice') {
                const body = practice
                    ? `<a class="review-item" href="#sheet-practice">
                        <span class="review-item__body">
                            <span class="review-item__title">Live Defense</span>
                            <span class="review-item__meta">Last attempt: ${practice.lastScore}% · ${practice.attempts} attempt${practice.attempts === 1 ? '' : 's'}</span>
                        </span>
                        <span class="review-item__cta">Continue →</span>
                    </a>`
                    : '<p class="review-empty">No practice attempts yet.</p><a class="review-item-link" href="#sheet-practice">Start practice →</a>';
                html += renderReviewSection('Practice', null, body);
            }
        }

        container.innerHTML = html;
    }

    // ------------------------------------------------------------------
    // App shell wiring
    // ------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function() {
        const sheetIndex = buildSheetIndex();
        const sheetsById = new Map(sheetIndex.map(s => [s.id, s]));

        const contentCanvas = document.getElementById('contentCanvas');
        const ctxTitle = document.getElementById('ctxTitle');
        const ctxPath = document.getElementById('ctxPath');
        const bookmarkToggle = document.getElementById('bookmarkToggle');
        const studyDeskEditor = document.getElementById('studyDeskEditor');
        const studyDeskScope = document.getElementById('studyDeskScope');
        const studyDeskSaved = document.getElementById('studyDeskSaved');
        const readingProgress = document.getElementById('readingProgress');

        let currentSheetId = null;

        function validSheetId(id) {
            return id && sheetsById.has(id) ? id : DEFAULT_SHEET;
        }

        // Real, derived signal only: which nav items have a saved note
        function refreshNoteIndicators() {
            document.querySelectorAll('.nav-item').forEach(a => {
                const id = (a.getAttribute('href') || '').replace(/^#/, '');
                a.classList.toggle('has-note', hasNote(id));
            });
        }

        let currentReviewFilter = 'all';
        function refreshReviewHubIfVisible() {
            if (currentSheetId === REVIEW_SHEET_ID) renderReviewHub(sheetIndex, currentReviewFilter);
        }

        function updateReadingProgress() {
            if (!readingProgress || !contentCanvas) return;
            const scrollable = contentCanvas.scrollHeight - contentCanvas.clientHeight;
            const pct = scrollable > 0 ? Math.min(100, Math.max(0, (contentCanvas.scrollTop / scrollable) * 100)) : 0;
            readingProgress.style.width = `${pct}%`;
        }

        function showSheet(id, opts) {
            opts = opts || {};
            const target = validSheetId(id);
            const targetHeadingId = opts.headingId || null;
            if (target === currentSheetId && !opts.force && !targetHeadingId) return;
            currentSheetId = target;
            const meta = sheetsById.get(target);

            sheetIndex.forEach(s => s.el.classList.toggle('is-active', s.id === target));

            // Context bar
            if (ctxTitle) ctxTitle.textContent = meta.title;
            if (ctxPath) ctxPath.textContent = meta.group;
            document.title = `${meta.title} · SAP EA Certification Workspace`;

            // Sidebar active state
            document.querySelectorAll('.nav-item').forEach(a => {
                a.classList.toggle('is-active', a.getAttribute('href') === `#${target}`);
            });

            // Bookmark star - bookmarking the Review hub itself isn't meaningful
            const bookmarks = loadBookmarks();
            const isBookmarked = !!bookmarks[target];
            if (bookmarkToggle) {
                bookmarkToggle.hidden = target === REVIEW_SHEET_ID;
                bookmarkToggle.textContent = isBookmarked ? '★' : '☆';
                bookmarkToggle.classList.toggle('is-active', isBookmarked);
                bookmarkToggle.setAttribute('aria-pressed', String(isBookmarked));
            }

            // Track the last real sheet visited (Review's own "Continue Studying")
            if (target !== REVIEW_SHEET_ID) saveLastVisited(target);

            // Study Desk's "review queue" link only makes sense off the review sheet
            const reviewLink = document.getElementById('studyDeskReviewLink');
            if (reviewLink) reviewLink.hidden = target === REVIEW_SHEET_ID;

            if (target === REVIEW_SHEET_ID) renderReviewHub(sheetIndex, currentReviewFilter);

            // Study Desk scope + note
            if (studyDeskScope) studyDeskScope.textContent = `Notes for ${meta.code ? meta.code + ' · ' : ''}${meta.title}`;
            if (studyDeskEditor) {
                const notes = loadNotes();
                studyDeskEditor.value = notes[target] || '';
            }
            if (studyDeskSaved) studyDeskSaved.textContent = '';

            if (contentCanvas && !opts.skipScroll) {
                if (targetHeadingId) {
                    const headingEl = document.getElementById(targetHeadingId);
                    if (headingEl) headingEl.scrollIntoView({ block: 'start' });
                } else {
                    contentCanvas.scrollTop = 0;
                }
            }
            updateReadingProgress();

            // Close mobile nav drawer after navigating
            document.body.classList.remove('nav-open');
        }

        function routeFromHash() {
            const id = (location.hash || '').replace(/^#/, '');
            showSheet(id);
        }

        window.addEventListener('hashchange', routeFromHash);
        routeFromHash();
        if (!location.hash) showSheet(DEFAULT_SHEET, { force: true });

        // --- Bookmark toggle ---
        if (bookmarkToggle) {
            bookmarkToggle.addEventListener('click', function() {
                const bookmarks = loadBookmarks();
                bookmarks[currentSheetId] = !bookmarks[currentSheetId];
                if (!bookmarks[currentSheetId]) delete bookmarks[currentSheetId];
                saveBookmarks(bookmarks);
                const isBookmarked = !!bookmarks[currentSheetId];
                this.textContent = isBookmarked ? '★' : '☆';
                this.classList.toggle('is-active', isBookmarked);
                this.setAttribute('aria-pressed', String(isBookmarked));
            });
        }

        // --- Review Hub filters ---
        const reviewFilters = document.querySelectorAll('.review-filter');
        reviewFilters.forEach(btn => {
            btn.addEventListener('click', function() {
                currentReviewFilter = this.dataset.filter;
                reviewFilters.forEach(b => {
                    b.classList.toggle('is-active', b === this);
                    b.setAttribute('aria-pressed', String(b === this));
                });
                renderReviewHub(sheetIndex, currentReviewFilter);
            });
        });

        // --- Study Desk: note autosave (debounced) ---
        if (studyDeskEditor) {
            let saveTimeout;
            studyDeskEditor.addEventListener('input', function() {
                const sheetId = currentSheetId;
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    saveNote(sheetId, studyDeskEditor.value);
                    refreshNoteIndicators();
                    if (studyDeskSaved) {
                        studyDeskSaved.textContent = 'Saved';
                        setTimeout(() => { if (studyDeskSaved.textContent === 'Saved') studyDeskSaved.textContent = ''; }, 1500);
                    }
                }, 400);
            });
        }

        // --- Study Desk: collapse / expand ---
        const studyDesk = document.getElementById('studyDesk');
        const studyDeskToggle = document.getElementById('studyDeskToggle');
        const studyDeskResizeHandle = document.getElementById('studyDeskResizeHandle');

        function applyStudyDeskState() {
            const state = loadStudyDeskState();
            if (state.height) {
                document.documentElement.style.setProperty('--study-desk-height', `${state.height}px`);
            }
            if (state.collapsed) {
                studyDesk.classList.add('is-collapsed');
                if (studyDeskToggle) {
                    studyDeskToggle.textContent = 'Expand ↑';
                    studyDeskToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }

        if (studyDesk && studyDeskToggle) {
            applyStudyDeskState();

            studyDeskToggle.addEventListener('click', function() {
                const collapsed = studyDesk.classList.toggle('is-collapsed');
                this.textContent = collapsed ? 'Expand ↑' : 'Collapse ↓';
                this.setAttribute('aria-expanded', String(!collapsed));
                const state = loadStudyDeskState();
                state.collapsed = collapsed;
                saveStudyDeskState(state);
                if (window.innerWidth <= 767) {
                    document.body.classList.toggle('study-desk-open', !collapsed);
                }
            });

            // On mobile, Study Desk starts closed regardless of saved desktop state
            if (window.innerWidth <= 767) {
                studyDesk.classList.remove('is-collapsed');
                document.body.classList.remove('study-desk-open');
                studyDeskToggle.textContent = 'Collapse ↓';
                studyDeskToggle.setAttribute('aria-expanded', 'false');
            }
        }

        if (studyDeskResizeHandle) {
            let dragging = false;
            let startY = 0;
            let startHeight = 0;

            studyDeskResizeHandle.addEventListener('pointerdown', function(e) {
                if (window.innerWidth <= 767 || studyDesk.classList.contains('is-collapsed')) return;
                dragging = true;
                startY = e.clientY;
                startHeight = studyDesk.getBoundingClientRect().height;
                studyDeskResizeHandle.setPointerCapture(e.pointerId);
            });

            studyDeskResizeHandle.addEventListener('pointermove', function(e) {
                if (!dragging) return;
                const delta = startY - e.clientY;
                const newHeight = Math.min(Math.max(startHeight + delta, 120), Math.round(window.innerHeight * 0.7));
                document.documentElement.style.setProperty('--study-desk-height', `${newHeight}px`);
            });

            function endDrag() {
                if (!dragging) return;
                dragging = false;
                const height = studyDesk.getBoundingClientRect().height;
                const state = loadStudyDeskState();
                state.height = Math.round(height);
                saveStudyDeskState(state);
            }

            studyDeskResizeHandle.addEventListener('pointerup', endDrag);
            studyDeskResizeHandle.addEventListener('pointercancel', endDrag);
        }

        // --- Mobile nav drawer ---
        const navDrawerToggle = document.getElementById('navDrawerToggle');
        const navBackdrop = document.getElementById('navBackdrop');

        function setNavOpen(open) {
            document.body.classList.toggle('nav-open', open);
            if (navDrawerToggle) navDrawerToggle.setAttribute('aria-expanded', String(open));
        }

        if (navDrawerToggle) {
            navDrawerToggle.addEventListener('click', () => {
                setNavOpen(!document.body.classList.contains('nav-open'));
            });
        }
        if (navBackdrop) {
            navBackdrop.addEventListener('click', () => setNavOpen(false));
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setNavOpen(false);
        });

        // --- Reading position (reflects real scroll within the active sheet) ---
        if (contentCanvas) {
            let scrollTimeout;
            contentCanvas.addEventListener('scroll', function() {
                if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
                scrollTimeout = requestAnimationFrame(updateReadingProgress);
            });
        }

        // --- Progress Tracker checkboxes (Sheet 12) ---
        const checkboxes = document.querySelectorAll('.progress-checkbox');
        const resetButton = document.getElementById('resetProgress');

        function applyProgressState() {
            const progress = loadProgress();
            checkboxes.forEach(checkbox => {
                const key = checkbox.dataset.trackerKey;
                if (key && progress.hasOwnProperty(key)) checkbox.checked = progress[key];
            });
            updateProgressDisplays();
        }

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const key = this.dataset.trackerKey;
                if (key) {
                    const progress = loadProgress();
                    progress[key] = this.checked;
                    saveProgress(progress);
                    updateProgressDisplays();
                }
            });
        });

        if (resetButton) {
            resetButton.addEventListener('click', function() {
                if (confirm('Reset all progress? This cannot be undone.')) {
                    const resetProgressData = {};
                    checkboxes.forEach(cb => {
                        const key = cb.dataset.trackerKey;
                        if (key) { resetProgressData[key] = false; cb.checked = false; }
                    });
                    saveProgress(resetProgressData);
                    updateProgressDisplays();
                }
            });
        }

        applyProgressState();
        displayQuizProgress();
        updateLiveQuizTally();
        refreshNoteIndicators();

        // --- Search dialog (command palette: sheets + in-sheet headings) ---
        const searchDialog = document.getElementById('searchDialog');
        const searchTrigger = document.getElementById('searchTrigger');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        let selectedIndex = 0;
        let currentMatches = [];

        function buildSearchEntries(query) {
            const q = query.trim().toLowerCase();
            const entries = [];
            sheetIndex.forEach(s => {
                const sheetMatches = !q || (s.title + ' ' + s.group).toLowerCase().includes(q);
                if (sheetMatches) {
                    entries.push({ type: 'sheet', sheetId: s.id, code: s.code, title: s.title, group: s.group });
                }
                if (q) {
                    s.headings.forEach(h => {
                        if (h.text.toLowerCase().includes(q)) {
                            entries.push({ type: 'heading', sheetId: s.id, code: s.code, sheetTitle: s.title, title: h.text, headingId: h.id });
                        }
                    });
                }
            });
            return entries;
        }

        function renderSearchResults(query) {
            currentMatches = buildSearchEntries(query);
            selectedIndex = 0;

            if (currentMatches.length === 0) {
                searchResults.innerHTML = '<li class="search-dialog__empty">No matches. Try a different term.</li>';
                return;
            }

            searchResults.innerHTML = currentMatches.map((m, i) => {
                const cls = `search-dialog__result${m.type === 'heading' ? ' search-dialog__result--heading' : ''}${i === 0 ? ' is-selected' : ''}`;
                const code = m.code ? `<span class="search-dialog__result-code">${m.code}</span>` : '';
                if (m.type === 'sheet') {
                    return `<li class="${cls}" data-index="${i}">${code}<span class="search-dialog__result-title">${m.title}</span></li>`;
                }
                return `<li class="${cls}" data-index="${i}"><span class="search-dialog__result-title">${m.title}</span></li>`;
            }).join('');
        }

        function highlightSelected() {
            [...searchResults.children].forEach((li, i) => li.classList.toggle('is-selected', i === selectedIndex));
        }

        function openSearch() {
            if (!searchDialog) return;
            searchInput.value = '';
            renderSearchResults('');
            searchDialog.showModal();
            searchInput.focus();
        }

        function closeSearch() {
            if (searchDialog && searchDialog.open) searchDialog.close();
        }

        function goToMatch(index) {
            const match = currentMatches[index];
            if (!match) return;
            if (match.type === 'heading') {
                showSheet(match.sheetId, { headingId: match.headingId, force: currentSheetId === match.sheetId });
                if (location.hash !== `#${match.sheetId}`) {
                    history.replaceState(null, '', `#${match.sheetId}`);
                }
            } else {
                location.hash = `#${match.sheetId}`;
            }
            closeSearch();
        }

        if (searchTrigger) searchTrigger.addEventListener('click', openSearch);

        document.addEventListener('keydown', function(e) {
            const isK = e.key === 'k' || e.key === 'K';
            if ((e.metaKey || e.ctrlKey) && isK) {
                e.preventDefault();
                openSearch();
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', () => renderSearchResults(searchInput.value));
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, currentMatches.length - 1);
                    highlightSelected();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, 0);
                    highlightSelected();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    goToMatch(selectedIndex);
                }
            });
        }

        if (searchResults) {
            searchResults.addEventListener('click', function(e) {
                const li = e.target.closest('.search-dialog__result');
                if (li) goToMatch(Number(li.dataset.index));
            });
        }
    });

})();
