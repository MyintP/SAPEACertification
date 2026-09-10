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
    // Markdown -> HTML (same parser as docs.js) - lets a domain sheet
    // inline its own deep-dive .md file directly, so "read the summary,
    // then click through to a separate page for the real content" isn't
    // a step the user has to take at all.
    // ------------------------------------------------------------------
    function mdEscapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function mdRenderInline(rawText) {
        const codeSpans = [];
        let text = rawText.replace(/`([^`]+)`/g, function(m, code) {
            codeSpans.push(mdEscapeHtml(code));
            return '@@CODE' + (codeSpans.length - 1) + '@@';
        });
        text = mdEscapeHtml(text);
        text = text.replace(/@@CODE(\d+)@@/g, function(m, i) {
            return '<code>' + codeSpans[Number(i)] + '</code>';
        });
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, label, url) {
            const external = /^https?:\/\//.test(url);
            return '<a href="' + url + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
        });
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
        return text;
    }

    function mdIsTableSeparator(line) {
        return /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(line);
    }

    function mdSplitRow(line) {
        let l = line.trim();
        if (l.charAt(0) === '|') l = l.slice(1);
        if (l.charAt(l.length - 1) === '|') l = l.slice(0, -1);
        return l.split('|').map(function(c) { return c.trim(); });
    }

    function mdCalloutClass(text) {
        if (text.indexOf('⚠') !== -1) return 'callout callout--warning';
        if (text.indexOf('💡') !== -1 || text.indexOf('🎯') !== -1) return 'callout callout--accent';
        return 'callout callout--soft';
    }

    function mdIsBlockStartLine(line) {
        const trimmed = line.trim();
        return /^BLOCK\d+$/.test(trimmed) ||
            /^(#{1,4})\s+/.test(line) ||
            /^(---+|\*\*\*+|___+)\s*$/.test(trimmed) ||
            /^>\s?/.test(line) ||
            /^\s*[-*]\s+/.test(line) ||
            /^\s*\d+\.\s+/.test(line) ||
            line.indexOf('|') !== -1;
    }

    function parseMarkdownToHtml(md) {
        md = md.replace(/\r\n?/g, '\n');
        const codeBlocks = [];
        md = md.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, function(m, code) {
            codeBlocks.push(code.replace(/\n$/, ''));
            return '\nBLOCK' + (codeBlocks.length - 1) + '\n';
        });

        const lines = md.split('\n');
        let html = '';
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();

            if (trimmed === '') { i++; continue; }

            const blockMatch = trimmed.match(/^BLOCK(\d+)$/);
            if (blockMatch) {
                html += '<pre><code>' + mdEscapeHtml(codeBlocks[Number(blockMatch[1])]) + '</code></pre>\n';
                i++; continue;
            }

            if (/^(---+|\*\*\*+|___+)\s*$/.test(trimmed)) {
                html += '<hr class="sheet-divider">\n';
                i++; continue;
            }

            const headerMatch = line.match(/^(#{1,4})\s+(.*)$/);
            if (headerMatch) {
                const level = headerMatch[1].length;
                html += '<h' + level + '>' + mdRenderInline(headerMatch[2].trim()) + '</h' + level + '>\n';
                i++; continue;
            }

            if (line.indexOf('|') !== -1 && lines[i + 1] && mdIsTableSeparator(lines[i + 1])) {
                const headerCells = mdSplitRow(line);
                i += 2;
                const rows = [];
                while (i < lines.length && lines[i].indexOf('|') !== -1 && lines[i].trim() !== '') {
                    rows.push(mdSplitRow(lines[i]));
                    i++;
                }
                html += '<div class="table-scroll"><table class="table-standard"><thead><tr>';
                headerCells.forEach(function(c) { html += '<th>' + mdRenderInline(c) + '</th>'; });
                html += '</tr></thead><tbody>';
                rows.forEach(function(r) {
                    html += '<tr>';
                    r.forEach(function(c) { html += '<td>' + mdRenderInline(c) + '</td>'; });
                    html += '</tr>';
                });
                html += '</tbody></table></div>\n';
                continue;
            }

            if (/^>\s?/.test(line)) {
                const quoteLines = [];
                while (i < lines.length && /^>\s?/.test(lines[i])) {
                    quoteLines.push(lines[i].replace(/^>\s?/, ''));
                    i++;
                }
                const text = quoteLines.join(' ');
                html += '<div class="' + mdCalloutClass(text) + '"><p>' + mdRenderInline(text) + '</p></div>\n';
                continue;
            }

            if (/^\s*[-*]\s+/.test(line)) {
                const items = [];
                while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
                    items.push(mdRenderInline(lines[i].replace(/^\s*[-*]\s+/, '')));
                    i++;
                }
                html += '<ul>' + items.map(function(it) { return '<li>' + it + '</li>'; }).join('') + '</ul>\n';
                continue;
            }

            if (/^\s*\d+\.\s+/.test(line)) {
                const items = [];
                while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
                    items.push(mdRenderInline(lines[i].replace(/^\s*\d+\.\s+/, '')));
                    i++;
                }
                html += '<ol>' + items.map(function(it) { return '<li>' + it + '</li>'; }).join('') + '</ol>\n';
                continue;
            }

            const paraLines = [line];
            i++;
            while (i < lines.length && lines[i].trim() !== '' && !mdIsBlockStartLine(lines[i])) {
                paraLines.push(lines[i]);
                i++;
            }
            html += '<p>' + mdRenderInline(paraLines.join(' ')) + '</p>\n';
        }

        return html;
    }

    function loadInlineDeepDive(containerId, mdPath, sheetId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        fetch(mdPath)
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function(text) {
                container.innerHTML = parseMarkdownToHtml(text);
                refreshHeadingsForSheetId(sheetId);
            })
            .catch(function(err) {
                container.innerHTML = '<div class="pattern pattern--important"><span class="pattern__label">Couldn\'t load</span><p>' +
                    mdEscapeHtml(err.message) + ' — <a href="docs.html?file=' + mdPath + '" target="_blank" rel="noopener">open it directly →</a></p></div>';
            });
    }

    // ------------------------------------------------------------------
    // Sheet + heading index (derived from the DOM - not duplicated data)
    // ------------------------------------------------------------------
    let liveSheetIndex = null; // populated once by buildSheetIndex(); re-scanned per-sheet after async content (e.g. inline deep-dives) loads

    // Assign deterministic, URL-safe anchor IDs to a sheet's headings
    // (h2/h3/h4) so search can jump to a subsection and links stay stable.
    // Exported as its own function so content added after initial page
    // load (e.g. a fetched deep-dive) can be folded into the same index.
    function scanHeadingsForSheet(sheet) {
        sheet.headings = [];
        sheet.el.querySelectorAll('h2, h3, h4').forEach(h => {
            if (!h.id) {
                const slug = slugify(h.textContent);
                if (slug) h.id = `${sheet.id}-${slug}`;
            }
            if (h.id) sheet.headings.push({ id: h.id, text: h.textContent.trim(), el: h });
        });
    }

    function buildSheetIndex() {
        const sheets = [...document.querySelectorAll('.sheet')].map(el => ({
            id: el.id,
            title: el.dataset.title || el.id,
            group: el.dataset.group || '',
            code: el.dataset.code || '',
            el
        }));

        sheets.forEach(scanHeadingsForSheet);
        liveSheetIndex = sheets;
        return sheets;
    }

    // Called once a sheet's content has changed asynchronously (inline
    // deep-dive fetch resolved) - re-scans just that sheet's headings so
    // search picks up the new content without a full index rebuild.
    function refreshHeadingsForSheetId(sheetId) {
        if (!liveSheetIndex) return;
        const sheet = liveSheetIndex.find(s => s.id === sheetId);
        if (sheet) scanHeadingsForSheet(sheet);
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
        const trackerGauge = document.getElementById('trackerGauge');
        if (trackerGauge) trackerGauge.innerHTML = svgGauge(percentage, { size: 56, stroke: 6 });
    }

    // ------------------------------------------------------------------
    // Quiz Progress (persisted score, shown in tracker + practice sheet)
    // ------------------------------------------------------------------
    const quizProgressKey = 'sapEaQuizProgress';

    // Derived from the live quizState rather than counting "attempts" - an
    // attempt counter incremented per answer would inflate meaninglessly now
    // that progress is recorded on every question rather than once at the end.
    function trackQuizProgress() {
        try {
            const answered = Object.keys(quizState.answered).length;
            const correct = Object.values(quizState.correct).filter(Boolean).length;
            localStorage.setItem(quizProgressKey, JSON.stringify({
                answered: answered,
                correct: correct,
                total: totalQuizQuestions(),
                pct: answered > 0 ? Math.round((correct / answered) * 100) : 0,
                updatedAt: new Date().toISOString()
            }));
        } catch (e) { console.log('Error tracking quiz progress:', e); }
    }

    function getQuizProgress() {
        try {
            const data = localStorage.getItem(quizProgressKey);
            const parsed = data ? JSON.parse(data) : null;
            return parsed && parsed.answered ? parsed : null;
        } catch (e) { console.log('Error getting quiz progress:', e); return null; }
    }

    function displayQuizProgress() {
        const p = getQuizProgress();
        const text = p
            ? `📊 Quiz: ${p.answered}/${p.total} answered · ${p.correct} correct (${p.pct}%)`
            : '📊 Quiz: Not started yet';
        document.querySelectorAll('.js-quiz-progress-display').forEach(el => { el.textContent = text; });
    }

    // ------------------------------------------------------------------
    // Scenario Quiz Logic (Practice sheet)
    //
    // quizState is persisted, not just in-memory: which questions you got
    // wrong is the most useful thing a quiz produces, and losing it on
    // refresh made the Review Queue structurally unable to resurface them.
    // `picked` and `answer` are stored alongside so the marked-up state of
    // every answered card can be rebuilt exactly on the next visit.
    // ------------------------------------------------------------------
    const quizStateKey = 'sapEaQuizState';
    const quizState = { answered: {}, correct: {}, picked: {}, answer: {} };

    function saveQuizState() {
        try { localStorage.setItem(quizStateKey, JSON.stringify(quizState)); }
        catch (e) { console.log('Error saving quiz state:', e); }
    }

    function restoreQuizState() {
        let saved;
        try { saved = JSON.parse(localStorage.getItem(quizStateKey) || 'null'); }
        catch (e) { saved = null; }
        if (!saved) return;

        quizState.answered = saved.answered || {};
        quizState.correct = saved.correct || {};
        quizState.picked = saved.picked || {};
        quizState.answer = saved.answer || {};

        // Rebuild the visual state of every previously answered card. The
        // feedback element is found via the card rather than by id, because
        // feedback ids follow three different conventions across the sheet.
        Object.keys(quizState.answered).forEach(function(name) {
            const inputs = document.querySelectorAll(`input[name="${name}"]`);
            if (!inputs.length) return;
            const correctAnswer = quizState.answer[name];
            const picked = quizState.picked[name];

            // picked/answer are a single letter for radio questions and an
            // array of letters for the multi-select assessment - normalise
            // both to arrays so one code path restores either.
            const pickedList = Array.isArray(picked) ? picked : [picked];
            const answerList = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];

            inputs.forEach(function(opt) {
                const label = opt.closest('label');
                if (!label) return;
                if (pickedList.indexOf(opt.value) !== -1) opt.checked = true;
                label.classList.remove('selected', 'correct', 'wrong');
                if (answerList.indexOf(opt.value) !== -1) label.classList.add('correct');
                else if (pickedList.indexOf(opt.value) !== -1) label.classList.add('wrong');
            });

            const card = inputs[0].closest('.quiz-card');
            if (!card) return;
            const fb = card.querySelector('.feedback-text');
            if (fb) fb.classList.add('show');
            const btn = card.querySelector('.quiz-submit');
            if (btn) btn.disabled = true;
        });
    }

    // Every question you answered and got wrong, with its text pulled from
    // the DOM so this works for the generated domain bank, the SBA drill and
    // the hand-authored scenario cards alike.
    function getWrongAnswers() {
        return Object.keys(quizState.answered)
            .filter(function(name) { return quizState.correct[name] === false; })
            .map(function(name) {
                const input = document.querySelector(`input[name="${name}"]`);
                if (!input) return null;
                const card = input.closest('.quiz-card');
                const qEl = card ? card.querySelector('.quiz-question') : null;
                return { name: name, text: qEl ? qEl.textContent.trim() : name };
            })
            .filter(Boolean);
    }

    // Multi-select scoring: correct only if every right option is selected
    // AND no wrong one is. Partial credit would misrepresent readiness.
    function checkMultiAnswer(questionName, correctCsv, feedbackId) {
        const correctSet = correctCsv.split(',');
        const inputs = document.querySelectorAll(`input[name="${questionName}"]`);
        if (!inputs.length) return;
        const picked = [].slice.call(inputs).filter(function(i) { return i.checked; }).map(function(i) { return i.value; });

        if (!picked.length) { alert('Select at least one answer first.'); return; }

        const isCorrect = picked.length === correctSet.length &&
            picked.every(function(p) { return correctSet.indexOf(p) !== -1; });

        inputs.forEach(function(opt) {
            const label = opt.closest('label');
            if (!label) return;
            label.classList.remove('selected', 'correct', 'wrong');
            if (correctSet.indexOf(opt.value) !== -1) label.classList.add('correct');
            else if (opt.checked) label.classList.add('wrong');
        });

        const fb = document.getElementById(feedbackId);
        if (fb) fb.classList.add('show');
        const card = inputs[0].closest('.quiz-card');
        if (card) {
            const btn = card.querySelector('.quiz-submit');
            if (btn) btn.disabled = true;
        }

        quizState.answered[questionName] = true;
        quizState.correct[questionName] = isCorrect;
        quizState.picked[questionName] = picked;
        quizState.answer[questionName] = correctSet;
        saveQuizState();

        updateLiveQuizTally();
        updateDomainQuizScoreLine();
        trackQuizProgress();
        displayQuizProgress();
    }

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
        quizState.picked[questionName] = selected.value;
        quizState.answer[questionName] = correctAnswer;
        saveQuizState();

        updateLiveQuizTally();
        updateDomainQuizScoreLine();

        // Record progress on every answer, not only once all questions are
        // answered in a single sitting - which, with state now persisted
        // across sessions, would otherwise almost never fire.
        trackQuizProgress();
        displayQuizProgress();
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
        quizState.picked = {};
        quizState.answer = {};
        saveQuizState();
        try { localStorage.removeItem(quizProgressKey); } catch (e) { /* storage unavailable */ }

        updateLiveQuizTally();
        updateDomainQuizScoreLine();
        displayQuizProgress();

        const quizzesSection = document.getElementById('quizzes');
        if (quizzesSection) quizzesSection.scrollIntoView({ behavior: 'smooth' });
    }

    window.checkAnswer = checkAnswer;
    window.resetAllQuizzes = resetAllQuizzes;

    // ------------------------------------------------------------------
    // Domain Knowledge Checks: content-as-data quiz bank (Practice sheet)
    // 60 questions generated from data rather than hand-authored per card -
    // this is what makes the domain filter and the score gauge possible
    // without duplicating the same markup 60 times.
    // ------------------------------------------------------------------
    const DOMAIN_META = {
        d1: { label: 'Domain 1 — SAP EA Framework & Toolset', short: 'Domain 1', sheet: 'sheet-03', sheetLabel: '03 Framework & Toolset', deepDive: 'domains/01-framework-toolset.md' },
        d2: { label: 'Domain 2 — Architecture Vision & Roadmap', short: 'Domain 2', sheet: 'sheet-04', sheetLabel: '04 Vision & Roadmap', deepDive: 'domains/02-vision-roadmap.md' },
        d3: { label: 'Domain 3 — Business Architecture', short: 'Domain 3', sheet: 'sheet-05', sheetLabel: '05 Business Architecture', deepDive: 'domains/03-business-architecture.md' },
        d4: { label: 'Domain 4 — Data, Application & Technology Architecture', short: 'Domain 4', sheet: 'sheet-06', sheetLabel: '06 Data / App / Tech', deepDive: 'domains/04-data-app-tech.md' }
    };

    const DOMAIN_QUIZ_BANK = [
        { id: 'd1q1', domain: 'd1', q: "Which of the following best describes the relationship between TOGAF and the SAP EA Methodology?", choices: ["A) SAP EA replaces TOGAF entirely with a proprietary approach", "B) SAP EA is built on TOGAF and tailors it for SAP-specific contexts", "C) TOGAF and SAP EA are parallel frameworks with no relationship", "D) SAP EA is a simplified subset of TOGAF with fewer phases"], correct: 'B', explain: "SAP EA is built on TOGAF and tailors it — it does not replace it." },
        { id: 'd1q2', domain: 'd1', q: "An organisation is planning an architecture engagement primarily focused on their upcoming cloud migration. Which Metro Map variant would be most appropriate?", choices: ["A) Business-Centric Metro Map", "B) Holistic Metro Map", "C) IT-Centric Metro Map", "D) Standard TOGAF ADM"], correct: 'C', explain: "Cloud migration is an IT-driven engagement, which calls for the IT-Centric Metro Map." },
        { id: 'd1q3', domain: 'd1', q: "A company has just hired their first enterprise architect and has no formal EA governance in place. Which EA organisational model best describes this situation?", choices: ["A) Informal", "B) Separated", "C) Federated", "D) Centralised"], correct: 'A', explain: "No dedicated EA team and no formalised EA skills describes the Informal model." },
        { id: 'd1q4', domain: 'd1', q: "Which SAP tool would you use to analyse the performance of business processes and identify areas of improvement using built-in metrics?", choices: ["A) SAP LeanIX", "B) SAP Cloud ALM", "C) SAP Signavio", "D) SAP Business Accelerator Hub"], correct: 'C', explain: "Signavio handles process analysis, with 1,000+ built-in metrics and a live 24-hour system connection." },
        { id: 'd1q5', domain: 'd1', q: 'In the SAP EA integrated toolchain, what happens in Step 4 — the "Plan" step?', choices: ["A) SAP Signavio connects to the live SAP system to extract process data", "B) SAP LeanIX ingests the current system landscape from Cloud ALM", "C) Roadmaps defined in LeanIX are handed over to Cloud ALM, generating implementation projects", "D) Process designs in Signavio are approved and transferred for execution"], correct: 'C', explain: "Step 4 is where LeanIX roadmaps are handed to Cloud ALM, which generates implementation projects." },
        { id: 'd1q6', domain: 'd1', q: "Which of the following is NOT one of the five SAP EA Framework building blocks?", choices: ["A) Methodology", "B) Reference Architecture Content", "C) Tooling", "D) Governance"], correct: 'D', explain: "The five blocks are Methodology, Reference Architecture Content, Tooling, Practice and Services. Governance sits inside Practice — it isn't a block of its own." },
        { id: 'd1q7', domain: 'd1', q: "An architect is assessing an organisation's EA maturity. They notice that architecture deliverables are comprehensive, use reference models, and follow standards, but EA rarely influences actual investment decisions. Which two maturity dimensions are most relevant here?", choices: ["A) Business-IT Alignment and Stakeholder Involvement", "B) Architecture Development and Action &amp; Impact", "C) Communication and People Enablement", "D) Organisation &amp; Governance and Architecture Process"], correct: 'B', explain: "Comprehensive deliverables map to Architecture Development; not influencing investment decisions maps to Action &amp; Impact." },
        { id: 'd1q8', domain: 'd1', q: "Which statement about the ADM is correct?", choices: ["A) The ADM is a sequential waterfall process that must be followed in order", "B) The ADM is iterative within phases, between phases, and between full cycles", "C) The ADM requires completing all phases in every architecture engagement", "D) The ADM phases can be skipped if the stakeholder does not require them"], correct: 'B', explain: "The ADM is iterative — within phases, between phases, and between full cycles. Never a one-pass waterfall." },
        { id: 'd1q9', domain: 'd1', q: "What is the primary purpose of the Preliminary Phase in the SAP EA Methodology?", choices: ["A) To develop the Architecture Vision and obtain stakeholder buy-in", "B) To set the ground for the architecture engagement by selecting and tailoring the ADM", "C) To conduct a gap analysis between the baseline and target architectures", "D) To create the roadmap and implementation plan"], correct: 'B', explain: "The Preliminary Phase is setup — selecting and tailoring the ADM before any real architecture work begins." },
        { id: 'd1q10', domain: 'd1', q: "A company has multiple divisions with very different business models and architectures that operate largely independently. Which EA organisational model is MOST appropriate?", choices: ["A) Informal", "B) Separated", "C) Federated", "D) Centralised"], correct: 'B', explain: "Loosely coupled divisions with genuinely different architectures describes the Separated model." },
        { id: 'd1q11', domain: 'd1', q: "The SAP EA Framework was officially launched in which year?", choices: ["A) 1995", "B) 2001", "C) 2007", "D) 2015"], correct: 'C', explain: "SAP introduced the Enterprise Architecture Framework at Sapphire in 2007, as an extension of TOGAF." },
        { id: 'd1q12', domain: 'd1', q: "An architect is selecting which Metro Map artifacts to include in an engagement. What should be the PRIMARY driver for artifact selection?", choices: ["A) Covering all architecture domains for completeness", "B) Following the full Metro Map to ensure methodology compliance", "C) The needs and concerns of the stakeholders involved", "D) The timeline and budget available for the engagement"], correct: 'C', explain: "Artifacts are selected for the stakeholders who need them — never for architectural completeness." },
        { id: 'd1q13', domain: 'd1', q: "What is the difference between Initial Risk and Residual Risk?", choices: ["A) Initial Risk is documented, Residual Risk is undocumented", "B) Initial Risk is before mitigation, Residual Risk is after mitigation", "C) Initial Risk applies to business domains, Residual Risk applies to IT domains", "D) Initial Risk is high impact, Residual Risk is low impact"], correct: 'B', explain: "Initial Risk is assessed before mitigation; Residual Risk is what remains after mitigation actions are applied." },
        { id: 'd1q14', domain: 'd1', q: "Which unique value proposition of the SAP integrated toolchain describes the ability to understand the effect of an architectural change on business processes?", choices: ["A) Enabling continuous adoption and operational stability", "B) Connecting business process models to real-world execution", "C) Linking applications and processes for better impact analysis", "D) Integration of planning and implementation views across tools"], correct: 'C', explain: '"Linking applications and processes for better impact analysis" is the toolchain value proposition that matches.' },
        { id: 'd1q15', domain: 'd1', q: "Architecture Decision Records (ADRs) should be created at which point in the decision-making process?", choices: ["A) After the decision has been made and approved by leadership", "B) During implementation to document decisions made by the project team", "C) Before significant decisions are made, to inform and influence them", "D) After the architecture engagement is complete, as a historical record"], correct: 'C', explain: "ADRs must be created before decisions are taken, to inform them — documenting after the fact is too late to serve their purpose." },

        { id: 'd2q1', domain: 'd2', q: "An enterprise architect has just been engaged by a new client. The CEO has provided a high-level strategy document outlining the company's goals for the next five years. What is the FIRST artifact the architect should produce?", choices: ["A) Business Capability Map", "B) Stakeholder Map", "C) Statement of Architecture Work", "D) Business Model Canvas"], correct: 'B', explain: "Always start with a Stakeholder Map — you need to know who matters before producing anything else." },
        { id: 'd2q2', domain: 'd2', q: "A CFO has serious concerns about the proposed architecture transformation and has the authority to cancel the project. Which stakeholder quadrant do they fall into, and what is the recommended action?", choices: ["A) Resisters — Monitor and respond", "B) Opponents — Satisfy", "C) Enthusiasts — Inform", "D) Opponents — Actively engage"], correct: 'B', explain: "High influence plus negative attitude places them in Opponents — the recommended action is to Satisfy, not fight or ignore." },
        { id: 'd2q3', domain: 'd2', q: 'In the Business Model Canvas, which block comes IMMEDIATELY after "Customer Segments"?', choices: ["A) Revenue Streams", "B) Key Resources", "C) Channels", "D) Customer Relationships"], correct: 'C', explain: "The BMC sequence runs Value Proposition → Customer Segments → Channels → Customer Relationships." },
        { id: 'd2q4', domain: 'd2', q: 'What is the SAP EA term for what TOGAF calls a "Driver"?', choices: ["A) Business Goal", "B) Value Driver", "C) Strategic Priority", "D) Architecture Objective"], correct: 'C', explain: "SAP EA maps TOGAF's \"Driver\" to \"Strategic Priority\" — a common terminology swap trap." },
        { id: 'd2q5', domain: 'd2', q: "An architect has just completed the Architecture Principles workshop. The team has produced 35 principles covering every possible scenario. What should the architect do?", choices: ["A) Accept all 35 — comprehensive coverage reduces risk", "B) Reduce to 10–20 principles — too many limits architectural flexibility", "C) Submit for leadership approval before reducing", "D) Convert the extra principles into requirements"], correct: 'B', explain: "10–20 principles is the practical ceiling. More principles means less architectural flexibility, not less risk." },
        { id: 'd2q6', domain: 'd2', q: "Which of the following statements about the Statement of Architecture Work is CORRECT?", choices: ["A) It is produced at the end of Phase B after the Business Architecture is complete", "B) It is a living document that evolves throughout all ADM phases", "C) It is produced at the end of Phase A and must be approved before Phase B begins", "D) It is an optional artifact for smaller engagements"], correct: 'C', explain: "The Statement of Architecture Work is the output of Phase A and must be approved before Phase B can begin." },
        { id: 'd2q7', domain: 'd2', q: 'A stakeholder looks at the Solution Context Diagram and says "I\'ve been staring at this for 15 minutes and I still don\'t understand what we\'re building." What should the architect do?', choices: ["A) Provide additional training to the stakeholder", "B) Simplify the diagram — it has failed the 10-minute test", "C) Replace it with a Solution Concept Diagram", "D) Schedule a walkthrough session to explain the complexity"], correct: 'B', explain: "The 10-minute rule: if a stakeholder can't understand a diagram in 10 minutes, it's too complex — simplify it." },
        { id: 'd2q8', domain: 'd2', q: "Which component of an Architecture Principle explains WHY the principle benefits the business?", choices: ["A) Name", "B) Statement", "C) Rationale", "D) Implications"], correct: 'C', explain: "Rationale is the component that explains the business benefit of adhering to the principle." },
        { id: 'd2q9', domain: 'd2', q: "A business roadmap shows initiatives, capabilities, and outcomes mixed together across a 5-year timeline. What is wrong with this approach?", choices: ["A) The time horizon is too long — roadmaps should be 1–2 years", "B) Roadmaps should use calendar years, not fiscal years", "C) Only one entity type should be used per roadmap — don't mix", "D) Nothing is wrong — mixing entity types gives richer context"], correct: 'C', explain: "A roadmap should use one entity type consistently — don't mix Initiatives, Capabilities, and Outcomes on the same view." },
        { id: 'd2q10', domain: 'd2', q: "What is the PRIMARY difference between a Solution Context Diagram and a Solution Concept Diagram?", choices: ["A) Solution Context is for technical stakeholders; Solution Concept is for business stakeholders", "B) Solution Context shows organisational relationships; Solution Concept shows technical building blocks", "C) Solution Context is produced in Phase B; Solution Concept is produced in Phase A", "D) Solution Context is mandatory; Solution Concept is optional"], correct: 'B', explain: 'Context shows organisational relationships; Concept is the technical "pencil sketch" of building blocks.' },
        { id: 'd2q11', domain: 'd2', q: 'In the Business Strategy Map, which level sits directly below "Value Drivers"?', choices: ["A) Strategic Priorities", "B) Business Goals", "C) Business Capabilities", "D) Initiatives"], correct: 'C', explain: "The Strategy Map runs Strategic Priority → Goals → Value Drivers → Business Capabilities → Initiatives." },
        { id: 'd2q12', domain: 'd2', q: "An application has high technical quality but provides very little functional value to the business. According to the TIME model, what category does this fall into?", choices: ["A) Invest", "B) Migrate", "C) Tolerate", "D) Eliminate"], correct: 'C', explain: "High technical fit combined with low functional fit is exactly the Tolerate quadrant." },
        { id: 'd2q13', domain: 'd2', q: "Which of the following is a Transition Architecture?", choices: ["A) The final desired state of the enterprise architecture", "B) A formally defined intermediate state between Baseline and Target architectures", "C) A high-level vision of the architecture produced in Phase A", "D) The architecture at the point of go-live"], correct: 'B', explain: "A Transition Architecture is a formally defined intermediate state on the journey to the Target." },
        { id: 'd2q14', domain: 'd2', q: "An architect is creating Architecture Principles with the team. Which attendee is MOST critical to ensure business alignment?", choices: ["A) Head of Solutions Development", "B) Head of IT Operations", "C) Chief Information Officer (CIO)", "D) External SAP Consultant"], correct: 'C', explain: "The CIO is critical here — they bridge business and IT at the executive level." },
        { id: 'd2q15', domain: 'd2', q: "Which roadmap entity type is described as MOST effective for business stakeholder engagement?", choices: ["A) Initiative-based", "B) Capability-based", "C) Outcome-based", "D) Application-based"], correct: 'C', explain: "Outcome-based roadmaps resonate best with business stakeholders — they speak in results, not deliverables." },

        { id: 'd3q1', domain: 'd3', q: "Which statement BEST distinguishes a Business Capability from a Business Process?", choices: ["A) Business Capabilities describe HOW the business operates; Business Processes describe WHAT it must do", "B) Business Capabilities describe WHAT the business must be able to do; Business Processes describe HOW it does it", "C) Business Capabilities are owned by IT; Business Processes are owned by the business", "D) Business Capabilities change frequently; Business Processes are stable"], correct: 'B', explain: "Capabilities are WHAT (stable). Processes are HOW (continually improved)." },
        { id: 'd3q2', domain: 'd3', q: 'A company\'s Business Capability Map includes "Sales," "Marketing," and "Customer Service" all as Level 1 items under the same domain. An architect notices that "Customer Service" partially overlaps with "Sales" in terms of the capabilities it contains. Which principle has been violated?', choices: ["A) APQC PCF compliance", "B) MECE — Mutually Exclusive condition", "C) MECE — Collectively Exhaustive condition", "D) Business Footprint alignment"], correct: 'B', explain: "Overlap between capabilities violates the Mutually Exclusive half of MECE." },
        { id: 'd3q3', domain: 'd3', q: "Which of the following is the CORRECT naming convention for a Level 2 Business Process Module?", choices: ['A) "Manage Customer Relationships"', 'B) "Customer to Cash"', 'C) "Sales Process Segment"', 'D) "Plan to Optimise Sales"'], correct: 'B', explain: 'Level 2 modules follow an "&lt;A&gt; to &lt;B&gt;" pattern, e.g. "Customer to Cash." Level 1 uses phrasing like "Plan to Optimise…".' },
        { id: 'd3q4', domain: 'd3', q: "A Business Architect is conducting a heat mapping exercise. Which party should PRIMARILY own and name the business capabilities?", choices: ["A) The enterprise architect", "B) The IT department", "C) The business stakeholders", "D) The SAP implementation partner"], correct: 'C', explain: "Business stakeholders own and name capabilities — the naming has to resonate with the business, not IT." },
        { id: 'd3q5', domain: 'd3', q: 'The Business Footprint Diagram is described as a "cross-domain X-ray." What makes it unique compared to other Business Architecture artifacts?', choices: ["A) It is the only artifact that uses colour coding", "B) It links strategic objectives, capabilities, solution components, and technology in a single view", "C) It is the only mandatory artifact in Phase B", "D) It replaces both the Capability Map and the Process Model"], correct: 'B', explain: "The Business Footprint is the only artifact that links strategy → capabilities → solutions → technology in one view." },
        { id: 'd3q6', domain: 'd3', q: "Which approach to Business Architecture should be used when the architecture engagement is driven by a new SAP S/4HANA implementation covering multiple business functions?", choices: ["A) Experience-Based", "B) Process-Centric", "C) Capability-Centric", "D) Technology-Centric"], correct: 'C', explain: "A new implementation spanning multiple functions calls for the Capability-Centric approach." },
        { id: 'd3q7', domain: 'd3', q: 'A Level 3 Business Process Segment for "Customer Management" shares its name with a Business Area in the Business Capability Map. An architect questions whether this is an error. What is the correct response?', choices: ["A) It is an error — they must have different names to avoid confusion", "B) It is intentional — the shared naming creates synergy between capability and process models", "C) It is acceptable practice but not recommended by SAP", "D) The process segment should be renamed to reflect the solution, not the business"], correct: 'B', explain: "This is intentional — shared naming across capability and process models creates synergy, even though the objects are distinct." },
        { id: 'd3q8', domain: 'd3', q: "Which SAP tool provides access to the Reference Business Architecture process content?", choices: ["A) SAP LeanIX", "B) SAP Cloud ALM", "C) SAP Signavio Process Explorer", "D) SAP Business Application Studio"], correct: 'C', explain: "SAP Signavio Process Explorer is the entry point to RBA process content." },
        { id: 'd3q9', domain: 'd3', q: "In the Business Process Model, at which level are all entries stored in ONE central repository?", choices: ["A) Level 1 — E2E Business Process", "B) Level 2 — Business Process Module", "C) Level 3 — Business Process Segment", "D) Level 4 — Business Activity"], correct: 'D', explain: "Level 4 Business Activities all sit in one central Business Activity Repository." },
        { id: 'd3q10', domain: 'd3', q: "An architect produces an Organisation Map showing the reporting lines between the CEO, regional directors, and department heads. A colleague says this is not an Organisation Map in the SAP EA sense. Why?", choices: ["A) Organisation Maps should only show external stakeholders", "B) Organisation Maps show networks of working relationships, not hierarchical reporting lines", "C) Organisation Maps are not produced until Phase C", "D) Organisation Maps should be based on the Business Capability structure"], correct: 'B', explain: "An EA Organisation Map shows a network of working relationships — it is explicitly not a hierarchical org chart." },
        { id: 'd3q11', domain: 'd3', q: "Which of the following is the PRIMARY purpose of the Business Data Catalog?", choices: ["A) To document the database schema of the target SAP system", "B) To summarise business-relevant information objects and their relationships", "C) To define data migration requirements from legacy systems", "D) To map solution data objects to infrastructure storage locations"], correct: 'B', explain: "The Business Data Catalog summarises business-relevant information objects and how they relate — not database schema." },
        { id: 'd3q12', domain: 'd3', q: "What does the APQC PCF provide in the context of SAP Business Architecture?", choices: ["A) A technology reference model for SAP infrastructure", "B) A process classification framework used as the basis for the Business Process Model", "C) A capability maturity assessment framework", "D) A set of SAP-specific integration patterns"], correct: 'B', explain: "The APQC Process Classification Framework is the industry-standard basis for the SAP Business Process Model." },
        { id: 'd3q13', domain: 'd3', q: "Which of the following BEST describes the bottom-up approach to Business Capability Assessment?", choices: ["A) Start from strategic goals and link them to capabilities via the Strategy Map", "B) Start from the current state and use heat mapping to identify gaps and priorities", "C) Start from the SAP Reference Business Architecture and map to current capabilities", "D) Start from identified IT investments and trace them back to business capabilities"], correct: 'B', explain: "Bottom-up starts from the current state and heat-maps gaps; top-down starts from strategy instead." },
        { id: 'd3q14', domain: 'd3', q: 'In which domain of the four Enterprise Domains would "Financial Planning and Analysis" most likely be classified?', choices: ["A) Product &amp; Services", "B) Customer", "C) Supply", "D) Corporate"], correct: 'D', explain: "Financial Planning and Analysis sits in the Corporate domain, alongside finance, HR, legal, IT and risk." },
        { id: 'd3q15', domain: 'd3', q: "A Business Architect is mapping business capabilities to solution capabilities. They find that a Business Capability has no corresponding Solution Capability in the target architecture. What does this represent?", choices: ["A) A requirement to customise the SAP solution", "B) A gap — this capability must be addressed in the roadmap", "C) A capability that should be eliminated from the Business Capability Map", "D) A non-functional requirement to be added to the Requirements Catalog"], correct: 'B', explain: "A missing Solution Capability is a gap that has to be addressed in the architecture roadmap." },

        { id: 'd4q1', domain: 'd4', q: "An architect needs to show how solution components communicate with each other statically — what systems exist, what they connect to, and through which channels. Which diagram should they use?", choices: ["A) Solution Process Flow Diagram", "B) Solution Value Flow Diagram", "C) Solution Component Diagram", "D) Application Architecture Overview"], correct: 'C', explain: "The Solution Component Diagram is the static STRUCTURE view of systems and their connections." },
        { id: 'd4q2', domain: 'd4', q: "A company runs SAP S/4HANA on their own hardware in their own data centre, with no cloud involvement. What deployment type is this?", choices: ["A) Private Cloud", "B) Public Cloud", "C) On-Premise", "D) Hybrid Cloud"], correct: 'C', explain: "Own hardware in an owned data centre, with no cloud involvement, is On-Premise." },
        { id: 'd4q3', domain: 'd4', q: "In a SaaS deployment, what does the customer control?", choices: ["A) The operating system and storage", "B) The deployed applications and middleware", "C) Only user-specific configuration", "D) The physical hardware layer"], correct: 'C', explain: "In SaaS, the customer controls only user-specific configuration — everything else is the provider's responsibility." },
        { id: 'd4q4', domain: 'd4', q: "A business user needs to extend SAP S/4HANA functionality without writing any code and without affecting the standard SAP delivery. Which Clean Core extension type should they use?", choices: ["A) Developer Extensibility", "B) Side-by-Side Extension", "C) Key User Extensibility", "D) ABAP Custom Code"], correct: 'C', explain: "Key User Extensibility is no-code, in-app, and leaves the standard S/4HANA delivery untouched." },
        { id: 'd4q5', domain: 'd4', q: "A company wants to build a complex mobile application that integrates with S/4HANA but runs completely separately to avoid any impact on the core system. Which extension approach is recommended?", choices: ["A) Key User Extensibility — low risk, in-app", "B) Developer Extensibility — ABAP on S/4HANA", "C) Side-by-Side Extension on SAP BTP", "D) Core modification with SAP support approval"], correct: 'C', explain: "A complex, separately-running app is exactly what Side-by-Side Extension on SAP BTP is for." },
        { id: 'd4q6', domain: 'd4', q: "The Software Distribution Diagram belongs to which ADM phase?", choices: ["A) Phase B — Business Architecture", "B) Phase C — Application &amp; Data Architecture", "C) Phase D — Technology Architecture", "D) Phase E — Opportunities &amp; Solutions"], correct: 'B', explain: "The Software Distribution Diagram belongs to Phase C, Application Architecture." },
        { id: 'd4q7', domain: 'd4', q: "Which diagram in Technology Architecture evolves from the Software Distribution Diagram by adding physical data centre locations and network connectivity?", choices: ["A) Network and Communications Diagram", "B) Application Architecture Overview", "C) Environments and Location Diagram", "D) Solution Component Diagram"], correct: 'C', explain: "The Environments &amp; Location Diagram evolves from the Software Distribution Diagram as the engagement moves into Phase D." },
        { id: 'd4q8', domain: 'd4', q: "A company operates SAP infrastructure in a cloud environment that is used exclusively by them, managed by a third-party provider, and accessed via VPN. What deployment type is this?", choices: ["A) On-Premise", "B) Public Cloud", "C) Private Cloud", "D) Community Cloud"], correct: 'C', explain: "Exclusive use, third-party managed, and VPN access together describe a Private Cloud." },
        { id: 'd4q9', domain: 'd4', q: "Which of the four ISA-M integration domains covers the connection between operational systems and reporting/analytics platforms?", choices: ["A) Process Integration", "B) Data Integration", "C) Analytics Integration", "D) IoT Integration"], correct: 'C', explain: "Analytics Integration is the ISA-M domain that connects operational data to analytics and reporting." },
        { id: 'd4q10', domain: 'd4', q: "A company is migrating from SAP ECC to S/4HANA. They want maximum standardisation and are willing to re-configure everything from scratch, discarding all legacy customisations. Which transformation strategy is appropriate?", choices: ["A) Brownfield", "B) Selective Data Transition", "C) Greenfield", "D) Lift and Shift"], correct: 'C', explain: "Maximum standardisation with a fresh start is the definition of Greenfield." },
        { id: 'd4q11', domain: 'd4', q: "Which SAP product serves as the canonical data model defining the structure of Solution Data Objects?", choices: ["A) SAP Master Data Governance (MDG)", "B) SAP One Domain Model (ODM)", "C) SAP Data Intelligence", "D) SAP HANA Cloud"], correct: 'B', explain: "SAP One Domain Model (ODM) is the unified, canonical model for business objects shared across SAP applications — published on the SAP Business Accelerator Hub." },
        { id: 'd4q12', domain: 'd4', q: 'In the Solution Component Diagram, what is a "Communication Channel"?', choices: ["A) A business process that flows between two organisational units", "B) A data transfer mechanism between two Deployment Units", "C) An API endpoint published on SAP Business Accelerator Hub", "D) A network connection described in the Environments &amp; Location Diagram"], correct: 'B', explain: "A Communication Channel is the data-transfer mechanism between two Deployment Units." },
        { id: 'd4q13', domain: 'd4', q: "An architect is producing the Conceptual Data Diagram. After defining entities, what is the NEXT step?", choices: ["A) Define relationships between entities", "B) Define attributes of each entity", "C) Map entities to solution components", "D) Create the Solution Data Flow Diagram"], correct: 'B', explain: "The sequence is Entities → Attributes → Relationships." },
        { id: 'd4q14', domain: 'd4', q: "In an IaaS deployment, what does the customer control that they do NOT control in PaaS?", choices: ["A) Deployed applications", "B) Platform middleware", "C) The operating system", "D) User-specific configuration"], correct: 'C', explain: "In IaaS the customer controls the OS (plus storage and apps); in PaaS the provider manages the OS." },
        { id: 'd4q15', domain: 'd4', q: "Which of the following BEST describes the purpose of the Product Map in Application Architecture?", choices: ["A) A BPMN diagram showing step-by-step product delivery processes", "B) A bill of materials showing recommended SAP products per Business Domain or Area", "C) A landscape diagram showing all currently deployed SAP products", "D) A roadmap showing planned SAP product upgrades over time"], correct: 'B', explain: "The Product Map is a bill of materials recommending SAP products per Business Domain or Area." }
    ];

    function renderDomainQuizBank() {
        const container = document.getElementById('domainQuizList');
        if (!container) return;

        const html = ['d1', 'd2', 'd3', 'd4'].map(function(domainKey) {
            const meta = DOMAIN_META[domainKey];
            const items = DOMAIN_QUIZ_BANK.filter(function(q) { return q.domain === domainKey; });
            const cards = items.map(function(q, i) {
                const num = i + 1;
                const total = items.length;
                const pct = Math.round((num / total) * 1000) / 10;
                const optionsHtml = q.choices.map(function(choice) {
                    const letter = choice.charAt(0);
                    return `<label><input type="radio" name="${q.id}" value="${letter}"> ${choice}</label>`;
                }).join('');
                return `<div class="quiz-card" data-domain="${domainKey}">
                    <div class="quiz-progress"><span>${meta.short} · Question ${num} of ${total}</span><div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width: ${pct}%;"></div></div></div>
                    <div class="quiz-question">${q.q}</div>
                    <div class="quiz-options">${optionsHtml}</div>
                    <button class="quiz-submit" onclick="checkAnswer('${q.id}', '${q.correct}', 'fb-${q.id}')">Submit Answer</button>
                    <div id="fb-${q.id}" class="feedback-text"><strong>✅ Correct answer: ${q.correct}</strong><br><em>Why:</em> ${q.explain}</div>
                </div>`;
            }).join('');
            return `<div class="quiz-domain-block" data-domain="${domainKey}">
                <h3>${meta.label}</h3>
                <p class="sheet-footnote">Tests <a href="#${meta.sheet}">${meta.sheetLabel}</a> · <a href="docs.html?file=${meta.deepDive}" target="_blank" rel="noopener">full deep-dive →</a></p>
                ${cards}
            </div>`;
        }).join('');

        container.innerHTML = html;
    }

    function updateDomainQuizScoreLine() {
        const lineEl = document.getElementById('domainQuizScoreLine');
        const gaugeEl = document.getElementById('domainQuizGauge');
        if (!lineEl) return;
        const filterEl = document.getElementById('domainQuizFilter');
        const val = filterEl ? filterEl.value : 'all';
        const items = val === 'all' ? DOMAIN_QUIZ_BANK : DOMAIN_QUIZ_BANK.filter(function(q) { return q.domain === val; });
        const attempted = items.filter(function(q) { return quizState.answered[q.id]; }).length;
        const correct = items.filter(function(q) { return quizState.correct[q.id]; }).length;
        const pct = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
        lineEl.textContent = `Score: ${correct}/${attempted} attempted · ${items.length} in view`;
        if (gaugeEl) gaugeEl.innerHTML = svgGauge(attempted > 0 ? Math.round((correct / items.length) * 100) : 0, { size: 44, stroke: 5 });
    }

    function applyDomainQuizFilter() {
        const filterEl = document.getElementById('domainQuizFilter');
        const val = filterEl ? filterEl.value : 'all';
        document.querySelectorAll('.quiz-domain-block').forEach(function(block) {
            block.hidden = val !== 'all' && block.dataset.domain !== val;
        });
        updateDomainQuizScoreLine();
    }

    // ------------------------------------------------------------------
    // Circular progress gauge (inline SVG) - shared by the domain quiz
    // score line and the Tracker sheet's checklist percentage.
    // ------------------------------------------------------------------
    function svgGauge(pct, opts) {
        opts = opts || {};
        const size = opts.size || 56;
        const stroke = opts.stroke || 6;
        const r = (size - stroke) / 2;
        const c = 2 * Math.PI * r;
        const clamped = Math.max(0, Math.min(100, pct || 0));
        const offset = c - (clamped / 100) * c;
        const cx = size / 2, cy = size / 2;
        return `<svg class="gauge-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${clamped}% complete">
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--paper-border)" stroke-width="${stroke}"></circle>
            <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${offset.toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"></circle>
        </svg>`;
    }

    // ------------------------------------------------------------------
    // Generic keyed checklist store (id->bool, keyed by a storage key) -
    // used by the case rubric self-scores AND the study schedule, so any
    // number of arbitrary checkboxes can be added anywhere without a new
    // storage scheme each time.
    // ------------------------------------------------------------------
    const caseChecklistKey = 'sapEaCaseChecklist';
    const scheduleChecklistKey = 'sapEaSchedule';

    function loadChecklist(storageKey) {
        try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
        catch (e) { return {}; }
    }

    function toggleChecklistItem(storageKey, itemId, checked) {
        try {
            const state = loadChecklist(storageKey);
            state[itemId] = checked;
            localStorage.setItem(storageKey, JSON.stringify(state));
        } catch (e) { console.log('Error saving checklist:', storageKey, e); }
    }

    function applyChecklistState(storageKey, selector) {
        const state = loadChecklist(storageKey);
        document.querySelectorAll(selector).forEach(function(cb) {
            if (state[cb.dataset.checkId]) cb.checked = true;
        });
    }

    function applyCaseChecklistState() {
        applyChecklistState(caseChecklistKey, '.case-checklist input[type="checkbox"]');
    }

    function toggleCaseChecklistItem(itemId, checked) {
        toggleChecklistItem(caseChecklistKey, itemId, checked);
    }

    window.toggleCaseChecklistItem = toggleCaseChecklistItem;

    // ------------------------------------------------------------------
    // Study Schedule: the 6-week plan from docs/study-plan.md as a
    // self-paced (not calendar-anchored) checklist. "Next" is always
    // just the first unchecked day - skip a day, fall behind a real
    // calendar and it doesn't matter, you pick up exactly where you left off.
    // ------------------------------------------------------------------
    const SCHEDULE = [
        { id: 'w1-mon', week: 1, day: 'Mon', task: 'Read Domain 1 fully - Framework & Toolset. Take notes on anything unclear.', link: '#sheet-03' },
        { id: 'w1-tue', week: 1, day: 'Tue', task: 'Watch/review the IEA10 course: Module 1 - Framework & Toolset.', link: 'https://learning.sap.com/courses/intelligent-enterprise-architecture-fundamentals' },
        { id: 'w1-wed', week: 1, day: 'Wed', task: 'Flashcard drill: 5 Building Blocks, ADM Phases, Metro Map variants.', link: '#sheet-03' },
        { id: 'w1-thu', week: 1, day: 'Thu', task: 'Flashcard drill: 4 Org Models, 8 Maturity Dimensions, Toolchain steps.', link: '#sheet-03' },
        { id: 'w1-fri', week: 1, day: 'Fri', task: 'Take the Domain 1 quiz - target 13+/15.', link: '#sheet-practice' },
        { id: 'w1-sat', week: 1, day: 'Sat', task: 'Review any wrong answers. Re-read the relevant sections.', link: '#sheet-practice' },
        { id: 'w1-sun', week: 1, day: 'Sun', task: 'Rest, or a light review of Domain 1 glossary terms.', link: 'docs.html?file=resources/glossary.md' },

        { id: 'w2-mon', week: 2, day: 'Mon', task: 'Read Domain 2 fully - Architecture Vision & Roadmap.', link: '#sheet-04' },
        { id: 'w2-tue', week: 2, day: 'Tue', task: 'Watch/review the IEA10 course: Module 2 - Architecture Vision.', link: 'https://learning.sap.com/courses/intelligent-enterprise-architecture-fundamentals' },
        { id: 'w2-wed', week: 2, day: 'Wed', task: 'Flashcard drill: Stakeholder Map quadrants + actions, BMC 9 blocks in sequence.', link: '#sheet-04' },
        { id: 'w2-thu', week: 2, day: 'Thu', task: 'Flashcard drill: Architecture Principle components, Statement of Architecture Work.', link: '#sheet-04' },
        { id: 'w2-fri', week: 2, day: 'Fri', task: 'Take the Domain 2 quiz - target 13+/15.', link: '#sheet-practice' },
        { id: 'w2-sat', week: 2, day: 'Sat', task: 'Review wrong answers. Read the book notes, Chapter 2 section.', link: 'docs.html?file=resources/book-notes.md' },
        { id: 'w2-sun', week: 2, day: 'Sun', task: 'Rest, or review the TOGAF → SAP EA term mapping.', link: 'docs.html?file=artifacts/togaf-to-sap-mapping.md' },

        { id: 'w3-mon', week: 3, day: 'Mon', task: 'Read Domain 3 fully - Business Architecture.', link: '#sheet-05' },
        { id: 'w3-tue', week: 3, day: 'Tue', task: 'Watch/review the IEA10 course: Module 3 - Business Architecture.', link: 'https://learning.sap.com/courses/intelligent-enterprise-architecture-fundamentals' },
        { id: 'w3-wed', week: 3, day: 'Wed', task: 'Flashcard drill: BCM levels, 4 Enterprise Domains, MECE.', link: '#sheet-05' },
        { id: 'w3-thu', week: 3, day: 'Thu', task: 'Flashcard drill: Business Process Model 4 levels + naming conventions.', link: '#sheet-05' },
        { id: 'w3-fri', week: 3, day: 'Fri', task: 'Take the Domain 3 quiz - target 13+/15.', link: '#sheet-practice' },
        { id: 'w3-sat', week: 3, day: 'Sat', task: 'Review wrong answers. Spend extra time on the Business Footprint Diagram.', link: '#sheet-05' },
        { id: 'w3-sun', week: 3, day: 'Sun', task: 'Rest, or review the RBA → RSA mapping.', link: 'docs.html?file=domains/rba-deep-dive.md' },

        { id: 'w4-mon', week: 4, day: 'Mon', task: 'Read Domain 4 fully - Data, Application & Technology Architecture.', link: '#sheet-06' },
        { id: 'w4-tue', week: 4, day: 'Tue', task: 'Watch/review the IEA10 course: Module 4 - Data, App & Tech Architecture.', link: 'https://learning.sap.com/courses/intelligent-enterprise-architecture-fundamentals' },
        { id: 'w4-wed', week: 4, day: 'Wed', task: 'Flashcard drill: 6 Application diagrams, deployment types, cloud service models.', link: '#sheet-06' },
        { id: 'w4-thu', week: 4, day: 'Thu', task: 'Flashcard drill: Clean Core extension types, ISA-M domains, S/4HANA strategies.', link: '#sheet-clean-core-tool' },
        { id: 'w4-fri', week: 4, day: 'Fri', task: 'Take the Domain 4 quiz - target 13+/15.', link: '#sheet-practice' },
        { id: 'w4-sat', week: 4, day: 'Sat', task: 'Review wrong answers. Focus on Structure vs. Behaviour diagram confusion.', link: '#sheet-06' },
        { id: 'w4-sun', week: 4, day: 'Sun', task: 'Rest, or review the Software Distribution → Environments & Location flow.', link: '#sheet-06' },

        { id: 'w5-mon', week: 5, day: 'Mon', task: 'Read the artifact cheatsheet in full. Map every artifact to its phase.', link: 'docs.html?file=artifacts/artifact-cheatsheet.md' },
        { id: 'w5-tue', week: 5, day: 'Tue', task: 'Read all 31 exam traps. Mark any you didn’t know.', link: 'docs.html?file=resources/exam-traps.md' },
        { id: 'w5-wed', week: 5, day: 'Wed', task: 'Read the Wanderlust Case Hub in full.', link: '#sheet-wanderlust' },
        { id: 'w5-thu', week: 5, day: 'Thu', task: 'Work through the Wanderlust prep questions while keeping case notes open.', link: 'docs.html?file=quiz/wanderlust-prep.md' },
        { id: 'w5-fri', week: 5, day: 'Fri', task: 'Re-read the case with an architect’s eye - annotate per domain.', link: '#sheet-wanderlust' },
        { id: 'w5-sat', week: 5, day: 'Sat', task: 'Cross-domain connections: trace a full ADM cycle using the cheatsheet.', link: 'docs.html?file=artifacts/artifact-cheatsheet.md' },
        { id: 'w5-sun', week: 5, day: 'Sun', task: 'Re-take all 4 domain quizzes (60 questions total).', link: '#sheet-practice' },

        { id: 'w6-mon', week: 6, day: 'Mon', task: 'Re-read exam traps. Focus on the ones you’ve been getting wrong.', link: 'docs.html?file=resources/exam-traps.md' },
        { id: 'w6-tue', week: 6, day: 'Tue', task: 'Full knowledge mock (all 60 domain questions), then say a full 9-step defense out loud against the clock.', link: '#sheet-practice' },
        { id: 'w6-wed', week: 6, day: 'Wed', task: 'Review the glossary for any terms still unclear.', link: 'docs.html?file=resources/glossary.md' },
        { id: 'w6-thu', week: 6, day: 'Thu', task: 'Re-read the connected case study - final read.', link: '#sheet-wanderlust' },
        { id: 'w6-fri', week: 6, day: 'Fri', task: 'Light review only. No new content. Rest.', link: '#sheet-review' },
        { id: 'w6-sat', week: 6, day: 'Sat', task: 'Exam day (or final revision if your exam is booked later).', link: '#sheet-11' }
    ];

    const WEEK_TITLES = {
        1: 'Domain 1 — Framework & Toolset', 2: 'Domain 2 — Vision & Roadmap',
        3: 'Domain 3 — Business Architecture', 4: 'Domain 4 — Data / App / Tech',
        5: 'Revision & Case-Study Practice', 6: 'Final Preparation'
    };

    function getScheduleState() { return loadChecklist(scheduleChecklistKey); }
    function isDayDone(id) { return !!getScheduleState()[id]; }
    function getNextScheduleItem() {
        return SCHEDULE.find(function(item) { return !isDayDone(item.id); }) || null;
    }

    // A link that stays inside this app (a #sheet-x anchor) navigates the
    // current tab - it's just moving around the hub. Anything else (an
    // official SAP page, or even docs.html for the raw file) is "the
    // second window": it must open in a new tab so the hub stays put and
    // doesn't get replaced by the material it's pointing at.
    function scheduleLinkAttrs(link) {
        return link.charAt(0) === '#' ? '' : ' target="_blank" rel="noopener"';
    }

    function renderTodayFocus() {
        const card = document.getElementById('todayFocusCard');
        if (!card) return;
        const state = getScheduleState();
        const doneCount = SCHEDULE.filter(function(item) { return state[item.id]; }).length;
        const next = getNextScheduleItem();

        if (!next) {
            card.innerHTML = `<p class="today-focus__label">🎉 Schedule complete</p>
                <p class="today-focus__task">All ${SCHEDULE.length} days checked off. Spend today on your <a href="#sheet-review">Review Queue</a> and a full mock defense.</p>`;
            return;
        }

        const dayNumber = SCHEDULE.indexOf(next) + 1;
        const linkHtml = next.link ? `<a class="btn btn-primary" href="${next.link}"${scheduleLinkAttrs(next.link)}>Start this →</a>` : '';
        card.innerHTML = `
            <p class="today-focus__label">Week ${next.week} · ${next.day} · Day ${dayNumber} of ${SCHEDULE.length}</p>
            <p class="today-focus__task">${next.task}</p>
            <div class="today-focus__actions">
                ${linkHtml}
                <button type="button" class="btn btn-secondary" id="markDayDoneBtn" data-day-id="${next.id}">✓ Mark done</button>
            </div>
            <p class="today-focus__progress">${doneCount}/${SCHEDULE.length} days complete · <a href="#sheet-schedule">see full plan →</a></p>`;
    }

    function renderScheduleSheet() {
        const container = document.getElementById('scheduleList');
        if (!container) return;
        const weeks = {};
        SCHEDULE.forEach(function(item) { (weeks[item.week] = weeks[item.week] || []).push(item); });

        const html = Object.keys(weeks).map(function(weekNum) {
            const items = weeks[weekNum];
            const doneInWeek = items.filter(function(item) { return isDayDone(item.id); }).length;
            const rows = items.map(function(item) {
                const linkHtml = item.link ? ` <a href="${item.link}"${scheduleLinkAttrs(item.link)}>open →</a>` : '';
                return `<label class="tracker-item schedule-checklist"><input type="checkbox" data-check-id="${item.id}"><span><strong>${item.day}</strong> — ${item.task}${linkHtml}</span></label>`;
            }).join('');
            return `<details class="schedule-week"${Number(weekNum) === 1 ? ' open' : ''}>
                <summary class="schedule-week__summary">Week ${weekNum} — ${WEEK_TITLES[weekNum]} <span class="schedule-week__count">${doneInWeek}/7</span></summary>
                <div class="schedule-week__days">${rows}</div>
            </details>`;
        }).join('');

        container.innerHTML = html;
    }

    // ------------------------------------------------------------------
    // Foundations Assessment: parsed live from
    // quiz/discovering-sap-ea-assessment.md rather than re-typed into JS,
    // so the questions, answers and explanations have exactly one source of
    // truth and can't drift apart. 11 single-answer, 19 multi-select.
    // ------------------------------------------------------------------
    function parseAssessmentMarkdown(md) {
        return md.replace(/\r\n?/g, '\n').split(/^### /m).slice(1).map(function(block) {
            const lines = block.split('\n');
            const heading = lines[0] || '';
            const idMatch = heading.match(/^Q(\d+)/);
            if (!idMatch) return null;

            const multi = heading.indexOf('✦✦') !== -1;
            let question = '';
            let why = '';
            const options = [];

            lines.forEach(function(line) {
                const t = line.trim();
                const opt = t.match(/^-\s*\[([ xX])\]\s*(.*)$/);
                if (opt) {
                    options.push({
                        correct: opt[1].toLowerCase() === 'x',
                        text: opt[2].replace(/\*\*/g, '').trim()
                    });
                    return;
                }
                if (!question && /^\*\*.+\*\*$/.test(t)) {
                    question = t.replace(/^\*\*/, '').replace(/\*\*$/, '');
                    return;
                }
                if (!why && /^\*\*Why correct:\*\*/.test(t)) {
                    why = t.replace(/^\*\*Why correct:\*\*\s*/, '').replace(/\*\*/g, '');
                }
            });

            if (!question || options.length < 2 || !options.some(function(o) { return o.correct; })) return null;
            return { id: 'asmt' + idMatch[1], num: idMatch[1], multi: multi, question: question, options: options, why: why };
        }).filter(Boolean);
    }

    function renderAssessment(items) {
        const container = document.getElementById('assessmentList');
        if (!container) return;
        if (!items.length) {
            container.innerHTML = '<p class="sheet-footnote">Could not parse the assessment source file.</p>';
            return;
        }

        container.innerHTML = items.map(function(q, i) {
            const type = q.multi ? 'checkbox' : 'radio';
            const correctLetters = [];
            const opts = q.options.map(function(o, idx) {
                const letter = String.fromCharCode(65 + idx);
                if (o.correct) correctLetters.push(letter);
                return `<label><input type="${type}" name="${q.id}" value="${letter}"> ${letter}) ${escapeHtml(o.text)}</label>`;
            }).join('');

            const pct = Math.round(((i + 1) / items.length) * 1000) / 10;
            const handler = q.multi
                ? `checkMultiAnswer('${q.id}', '${correctLetters.join(',')}', 'fb-${q.id}')`
                : `checkAnswer('${q.id}', '${correctLetters[0]}', 'fb-${q.id}')`;

            return `<div class="quiz-card">
                <div class="quiz-progress"><span>Question ${q.num} of ${items.length}${q.multi ? ' · select all that apply' : ''}</span><div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width: ${pct}%;"></div></div></div>
                <div class="quiz-question">${escapeHtml(q.question)}</div>
                <div class="quiz-options">${opts}</div>
                <button class="quiz-submit" onclick="${handler}">Submit Answer</button>
                <div id="fb-${q.id}" class="feedback-text"><strong>✅ Correct: ${correctLetters.join(', ')}</strong><br><em>Why:</em> ${escapeHtml(q.why)}</div>
            </div>`;
        }).join('');
    }

    function loadAssessment() {
        const container = document.getElementById('assessmentList');
        if (!container) return;
        fetch('quiz/discovering-sap-ea-assessment.md')
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function(text) {
                renderAssessment(parseAssessmentMarkdown(text));
                // Re-apply saved answers now that these cards exist, and
                // refresh the tallies for the larger question total.
                restoreQuizState();
                updateLiveQuizTally();
                trackQuizProgress();
                displayQuizProgress();
                refreshHeadingsForSheetId('sheet-assessment');
            })
            .catch(function(err) {
                container.innerHTML = '<div class="pattern pattern--important"><span class="pattern__label">Couldn\'t load</span><p>' +
                    mdEscapeHtml(err.message) + ' — <a href="docs.html?file=quiz/discovering-sap-ea-assessment.md" target="_blank" rel="noopener">read it as a document →</a></p></div>';
            });
    }

    window.checkMultiAnswer = checkMultiAnswer;

    // ------------------------------------------------------------------
    // Flashcard drill. The 6-week plan schedules "Flashcard drill" on eight
    // separate days, so the workspace needs to actually be able to run one.
    // Self-scored: cards you miss stay in the queue, cards you know retire
    // for the session. Per-card outcomes persist so "still missing this"
    // survives a reload.
    // ------------------------------------------------------------------
    const flashcardStateKey = 'sapEaFlashcards';

    const FLASHCARDS = [
        // --- Domain 1: Framework & Toolset ---
        { id: 'f-d1-01', domain: 'd1', front: 'Name the 5 SAP EA Framework building blocks', back: 'Methodology · Reference Architecture Content · Tooling · Practice · Services' },
        { id: 'f-d1-02', domain: 'd1', front: 'Practice vs. Services — what is the difference?', back: 'Practice = the INTERNAL EA organisational model and governance. Services = EXTERNAL SAP consulting engagements. Most commonly swapped pair on the exam.' },
        { id: 'f-d1-03', domain: 'd1', front: 'Name all 9 ADM phases, Preliminary through H', back: 'Preliminary → A Vision → B Business → C Information Systems → D Technology → E Opportunities & Solutions → F Migration Planning → G Implementation Governance → H Change Management (+ Requirements Management, cross-cutting)' },
        { id: 'f-d1-04', domain: 'd1', front: 'What does Phase E do — precisely?', back: 'IDENTIFIES the projects and transition plans needed to REALISE the target architecture. It does not define the target (that is Phases B–D).' },
        { id: 'f-d1-05', domain: 'd1', front: 'What are the 3 Metro Map variants, and what drives the choice?', back: 'Business-Centric · IT-Centric · Holistic. Driven by the primary engagement driver (business vs. IT vs. both).' },
        { id: 'f-d1-06', domain: 'd1', front: 'Metro Map domains vs. SAP EA Methodology domains — how many each?', back: 'Metro Map = 7 domains. SAP EA Methodology core model = 3 domains (+ IT Landscape connection). Both correct — different questions.' },
        { id: 'f-d1-07', domain: 'd1', front: 'Name the 4 EA organisational models', back: 'Informal · Separated · Federated · Centralised' },
        { id: 'f-d1-08', domain: 'd1', front: 'Federated EA model — what is the risk?', back: 'Without conflict resolution it collapses back into Separated.' },
        { id: 'f-d1-09', domain: 'd1', front: 'How many EA Practice maturity dimensions, and what are the levels?', back: '8 dimensions. 5 levels: Ad-Hoc → Initial → Defined → Managed → Optimised. Output is a spider-web diagram.' },
        { id: 'f-d1-10', domain: 'd1', front: 'Name the 5 steps of the integrated toolchain', back: '1 Ingest (LeanIX ↔ Cloud ALM) · 2 Analyse (Signavio) · 3 Design (LeanIX + Signavio) · 4 Plan (LeanIX → Cloud ALM) · 5 Execute & Monitor' },
        { id: 'f-d1-11', domain: 'd1', front: 'LeanIX vs. Signavio vs. Cloud ALM — one line each', back: 'LeanIX = architecture / application portfolio. Signavio = business processes. Cloud ALM = project execution and operations monitoring.' },
        { id: 'f-d1-12', domain: 'd1', front: 'What is the ORIGIN of the SAP EA Methodology?', back: 'IndRA (Industry Reference Architecture) — built internally at SAP, then aligned with TOGAF. TOGAF is what it is built ON; IndRA is where it CAME FROM.' },
        { id: 'f-d1-13', domain: 'd1', front: 'Name the 6 SAP EA architectural principles', back: 'Map Business and IT Separately · Use Industry Standards · Connect to Other Architectures · Collaborative Approach & Content Fluency · Defined Content Ownership · Sustainability and Simplicity' },
        { id: 'f-d1-14', domain: 'd1', front: 'Initial Risk vs. Residual Risk', back: 'Initial = before mitigation. Residual = what remains after mitigation actions are applied.' },
        { id: 'f-d1-15', domain: 'd1', front: 'When must an ADR be created?', back: 'BEFORE the decision is taken, to inform it. Architecture produced after decisions is too late.' },
        { id: 'f-d1-16', domain: 'd1', front: 'Architecture Board — what is it, and what tiers of decision go where?', back: 'A governance BODY, never a person. Tier 1 (high impact) → Architecture Review Board. Tier 2 (medium) → domain architects. Tier 3 (low, ~70–80% of decisions) → delivery teams, self-serve via the Architecture Runway.' },
        { id: 'f-d1-17', domain: 'd1', front: 'What are the 3 types of tailoring in the Preliminary Phase?', back: 'Terminology · Content · Process' },

        // --- Domain 2: Vision & Roadmap ---
        { id: 'f-d2-01', domain: 'd2', front: 'Stakeholder Map — name the 4 quadrants and the action for each', back: 'Promoters (high influence, positive) → Actively engage. Enthusiasts (low influence, positive) → Inform. Opponents (high influence, negative) → Satisfy. Resisters (low influence, negative) → Monitor and respond.' },
        { id: 'f-d2-02', domain: 'd2', front: 'Business Model Canvas — all 9 blocks in sequence', back: 'Value Proposition → Customer Segments → Channels → Customer Relationships → Revenue Streams → Key Resources → Key Activities → Key Partners → Cost Structure' },
        { id: 'f-d2-03', domain: 'd2', front: 'Which BMC block is #3? Which is #6?', back: '#3 = Channels. #6 = Key Resources.' },
        { id: 'f-d2-04', domain: 'd2', front: 'What are the 4 components of an Architecture Principle?', back: 'Name · Statement · Rationale · Implications. (Rationale = why it benefits the business.)' },
        { id: 'f-d2-05', domain: 'd2', front: 'Maximum number of Architecture Principles — and why?', back: '10–20. More principles means less architectural flexibility, not more control.' },
        { id: 'f-d2-06', domain: 'd2', front: 'Statement of Architecture Work — when is it produced and approved?', back: 'Output of Phase A. Must be approved BEFORE Phase B begins. It is the contract.' },
        { id: 'f-d2-07', domain: 'd2', front: 'Business Strategy Map — the full chain', back: 'Strategic Priority → Goals → Value Drivers → Business Capabilities → Initiatives' },
        { id: 'f-d2-08', domain: 'd2', front: 'TOGAF "Driver" and "Objective" → SAP EA terms?', back: 'Driver → Strategic Priority. Objective → Value Driver. Do not use TOGAF terms on the exam.' },
        { id: 'f-d2-09', domain: 'd2', front: 'Solution Context vs. Solution Concept Diagram', back: 'Context = organisational relationships (passes the 10-minute test). Concept = technical building blocks, the "pencil sketch".' },
        { id: 'f-d2-10', domain: 'd2', front: 'TIME model — all four quadrants', back: 'Tolerate (high tech / low functional) · Invest (high / high) · Migrate (low tech / high functional) · Eliminate (low / low)' },
        { id: 'f-d2-11', domain: 'd2', front: 'What is a Transition Architecture?', back: 'A formally defined INTERMEDIATE state between Baseline and Target — not the target itself.' },
        { id: 'f-d2-12', domain: 'd2', front: 'Golden rule for roadmap entity types', back: 'ONE entity type per roadmap — never mix Initiatives, Capabilities and Outcomes on the same view. Outcome-based resonates best with business stakeholders.' },
        { id: 'f-d2-13', domain: 'd2', front: 'Enterprise Transformation Assessment — how many activities, and what are they?', back: 'THREE: EA Practice Capability Assessment (spider web) · Preliminary Business & Technology Capability Assessment (heat map) · Business & Technology Transformation Readiness Assessment.' },

        // --- Domain 3: Business Architecture ---
        { id: 'f-d3-01', domain: 'd3', front: 'Business Capability vs. Business Process', back: 'Capability = WHAT the business must be able to do (stable). Process = HOW it does it (continually improved).' },
        { id: 'f-d3-02', domain: 'd3', front: 'What does MECE stand for, and both conditions?', back: 'Mutually Exclusive (no overlap) AND Collectively Exhaustive (no gaps). Both conditions required — governs the Business Capability Model.' },
        { id: 'f-d3-03', domain: 'd3', front: 'Business Capability Map — the 3 levels', back: 'Domain → Area → Capability' },
        { id: 'f-d3-04', domain: 'd3', front: 'Name the 4 Enterprise Domains and their definitions', back: 'Products & Services (developing/managing products) · Supply (fulfilling demand) · Customer (generating demand) · Corporate (planning and managing the enterprise)' },
        { id: 'f-d3-05', domain: 'd3', front: 'Business Process Model — the 4 levels', back: 'L1 E2E Business Process → L2 Business Process Module → L3 Business Process Segment → L4 Business Activity' },
        { id: 'f-d3-06', domain: 'd3', front: 'Which BPM level is stored in ONE central repository?', back: 'Level 4 — Business Activities, in the central Business Activity Repository.' },
        { id: 'f-d3-07', domain: 'd3', front: 'Level 2 Business Process Module naming convention?', back: '"<A> to <B>" — e.g. "Customer to Cash". Level 1 uses "Plan to Optimise…" style.' },
        { id: 'f-d3-08', domain: 'd3', front: 'What makes the Business Footprint Diagram unique?', back: 'The only artifact linking strategy → capabilities → solution components → technology in a single view. A cross-domain X-ray.' },
        { id: 'f-d3-09', domain: 'd3', front: 'Organisation Map — what is it NOT?', back: 'NOT an org chart. It shows the network of working relationships, not hierarchical reporting lines.' },
        { id: 'f-d3-10', domain: 'd3', front: 'Who owns and names business capabilities?', back: 'The BUSINESS stakeholders — naming must resonate with the business, not IT.' },
        { id: 'f-d3-11', domain: 'd3', front: 'Bottom-Up vs. Top-Down capability assessment', back: 'Bottom-Up = start from current state, heat map, find gaps. Top-Down = start from strategy via the Strategy Map.' },
        { id: 'f-d3-12', domain: 'd3', front: 'Name the 8 Business Process Groups', back: 'Idea to Market · Source to Pay · Plan to Fulfill · Lead to Cash · Recruit to Retire · Acquire to Decommission · Governance · Finance' },
        { id: 'f-d3-13', domain: 'd3', front: 'Lead to Cash vs. Finance — where is the boundary?', back: 'Lead to Cash includes AR and payment collection. Finance covers accounting, financial close, treasury. Boundary = where commercial activity ends and financial reporting begins.' },
        { id: 'f-d3-14', domain: 'd3', front: 'What standard is the SAP Business Process Model based on?', back: 'APQC Process Classification Framework (PCF).' },

        // --- Domain 4: Data, App & Tech ---
        { id: 'f-d4-01', domain: 'd4', front: 'Name the 3 Clean Core extension types and where each runs', back: 'Key User Extensibility (in-app, no code, on S/4HANA) · Developer Extensibility (Embedded ABAP Cloud / RAP, on-stack) · Side-by-Side (on SAP BTP)' },
        { id: 'f-d4-02', domain: 'd4', front: 'State the Clean Core two-way guarantee', back: 'Upgrades must not break extensions, AND extensions must not break upgrades — achieved by only reaching standard objects through well-defined, upgrade-stable APIs.' },
        { id: 'f-d4-03', domain: 'd4', front: 'Name the 3 deployment types', back: 'On-Premise · Private Cloud (single-tenant, VPN, org or third-party managed) · Public Cloud (multi-tenant, provider managed)' },
        { id: 'f-d4-04', domain: 'd4', front: 'Private Cloud vs. On-Premise — the trap', back: 'Private Cloud is still CLOUD. Not physically on-premise by definition, even though it is single-tenant.' },
        { id: 'f-d4-05', domain: 'd4', front: 'SaaS / PaaS / IaaS — what does the customer control in each?', back: 'SaaS = user-specific configuration only. PaaS = deployed apps + platform config. IaaS = OS, storage, deployed apps, selected network.' },
        { id: 'f-d4-06', domain: 'd4', front: 'Solution Component Diagram vs. Solution Process Flow Diagram', back: 'Component = STRUCTURE (static). Process Flow = BEHAVIOUR (dynamic, BPMN 2.0). Most tested distinction in Domain 4.' },
        { id: 'f-d4-07', domain: 'd4', front: 'Name the 4 ISA-M integration domains', back: 'Process Integration · Data Integration · Analytics Integration · IoT Integration' },
        { id: 'f-d4-08', domain: 'd4', front: 'Name the 3 S/4HANA transformation strategies', back: 'Greenfield (new implementation, max standardisation) · Brownfield (system conversion, preserve config/data) · Selective Data Transition (greenfield processes + selective history)' },
        { id: 'f-d4-09', domain: 'd4', front: 'What is a Deployment Unit? What is a Communication Channel?', back: 'Deployment Unit = smallest solution component that can be deployed and run independently. Communication Channel = the data transfer between two Deployment Units. Interactions WITHIN a unit are not modelled.' },
        { id: 'f-d4-10', domain: 'd4', front: 'Name the 6 options in the 6R framework', back: 'Rehost · Retire · Replatform · Repurchase · Refactor/Re-architect · Retain' },
        { id: 'f-d4-11', domain: 'd4', front: 'TIME vs. 6R — when do you use each?', back: 'TIME = application portfolio decisions. 6R = cloud migration/transformation priority.' },
        { id: 'f-d4-12', domain: 'd4', front: 'Which is the ONLY artifact in Technology Architecture?', back: 'The Environments and Location Diagram. It evolves from the Software Distribution Diagram (Phase C).' },
        { id: 'f-d4-13', domain: 'd4', front: 'Conceptual Data Diagram — what is the order of steps?', back: 'Entities → Attributes → Relationships' },
        { id: 'f-d4-14', domain: 'd4', front: 'Name SAP\'s 3 advisory methodologies and what each owns', back: 'ISA-M = integration. SAP Application Extension Methodology = extensibility. SAP Data and Analytics Advisory Methodology = data & analytics. All complement the ADM; none replaces it.' },
        { id: 'f-d4-15', domain: 'd4', front: 'Application Extension Methodology — the 3 phases', back: '1 Assess Extension Use Case → 2 Assess Extension Technology → 3 Define Extension Target Solution. Tasks stay technology-agnostic until Phase 3.' },
        { id: 'f-d4-16', domain: 'd4', front: 'RISE with SAP vs. GROW with SAP', back: 'RISE = S/4HANA Cloud Private Edition, existing installed base, retains complexity. GROW = Public Edition, net-new/midmarket, adopt standard with minimal customisation.' },
        { id: 'f-d4-17', domain: 'd4', front: 'What is SAP One Domain Model (ODM)?', back: 'The canonical/unified data model defining the structure of Solution Data Objects shared across SAP applications.' }
    ];

    const FLASHCARD_DOMAIN_LABELS = { d1: 'Domain 1 — Framework & Toolset', d2: 'Domain 2 — Vision & Roadmap', d3: 'Domain 3 — Business Architecture', d4: 'Domain 4 — Data / App / Tech' };

    const flashcardSession = { queue: [], index: 0, flipped: false, filter: 'all' };

    function loadFlashcardState() { return loadChecklist(flashcardStateKey); }

    function recordFlashcard(cardId, knewIt) {
        try {
            const state = loadFlashcardState();
            const prev = state[cardId] || { seen: 0, missed: 0 };
            state[cardId] = {
                seen: (prev.seen || 0) + 1,
                missed: (prev.missed || 0) + (knewIt ? 0 : 1),
                lastKnown: knewIt
            };
            localStorage.setItem(flashcardStateKey, JSON.stringify(state));
        } catch (e) { console.log('Error saving flashcard state:', e); }
    }

    function shuffleArray(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    function buildFlashcardQueue() {
        const filter = flashcardSession.filter;
        const pool = filter === 'all'
            ? FLASHCARDS
            : (filter === 'missed'
                ? FLASHCARDS.filter(function(c) { const s = loadFlashcardState()[c.id]; return s && s.lastKnown === false; })
                : FLASHCARDS.filter(function(c) { return c.domain === filter; }));
        flashcardSession.queue = shuffleArray(pool);
        flashcardSession.index = 0;
        flashcardSession.flipped = false;
    }

    function renderFlashcard() {
        const stage = document.getElementById('flashcardStage');
        if (!stage) return;
        const statsEl = document.getElementById('flashcardStats');
        const q = flashcardSession.queue;

        if (!q.length) {
            stage.innerHTML = `<div class="flashcard flashcard--empty"><p>No cards in this selection.</p>
                <p class="sheet-footnote">Try "All cards", or drill a domain — "Missed only" fills up once you've marked some.</p></div>`;
            if (statsEl) statsEl.textContent = '';
            return;
        }

        if (flashcardSession.index >= q.length) {
            const state = loadFlashcardState();
            const missed = q.filter(function(c) { const s = state[c.id]; return s && s.lastKnown === false; }).length;
            stage.innerHTML = `<div class="flashcard flashcard--empty">
                <p class="flashcard__done">✅ Deck complete — ${q.length} cards</p>
                <p>${missed === 0 ? 'You knew every card in this pass.' : `${missed} still marked as missed. Switch the filter to <strong>Missed only</strong> to drill those.`}</p>
                <button type="button" class="btn btn-primary" id="flashcardRestart">↺ Go again</button>
            </div>`;
            if (statsEl) statsEl.textContent = `${q.length}/${q.length}`;
            return;
        }

        const card = q[flashcardSession.index];
        const face = flashcardSession.flipped
            ? `<p class="flashcard__label">Answer</p><p class="flashcard__back">${card.back}</p>`
            : `<p class="flashcard__label">${FLASHCARD_DOMAIN_LABELS[card.domain] || 'Card'}</p><p class="flashcard__front">${card.front}</p>`;

        const controls = flashcardSession.flipped
            ? `<div class="flashcard__controls">
                    <button type="button" class="btn btn-secondary" data-fc="missed">✗ Missed it</button>
                    <button type="button" class="btn btn-primary" data-fc="knew">✓ Got it</button>
               </div>`
            : `<div class="flashcard__controls"><button type="button" class="btn btn-primary" data-fc="flip">Show answer</button></div>`;

        stage.innerHTML = `<div class="flashcard" data-fc="flip">${face}</div>${controls}`;
        if (statsEl) statsEl.textContent = `${flashcardSession.index + 1}/${q.length}`;
    }

    function flashcardAdvance(knewIt) {
        const card = flashcardSession.queue[flashcardSession.index];
        if (card) recordFlashcard(card.id, knewIt);
        flashcardSession.index += 1;
        flashcardSession.flipped = false;
        renderFlashcard();
    }

    // ------------------------------------------------------------------
    // Study Timer: a simple Pomodoro-style focus/break countdown. Runs
    // in-memory (no persistence) - it keeps ticking across sheet
    // navigation within the same page load, but resets on reload, same
    // as any other Pomodoro app.
    // ------------------------------------------------------------------
    const timerState = { focusLength: 25 * 60, breakLength: 5 * 60, mode: 'focus', remaining: 25 * 60, running: false, intervalId: null };

    function formatTimer(totalSeconds) {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function updateTimerDisplay() {
        const displayEl = document.getElementById('timerDisplay');
        if (!displayEl) return;
        displayEl.textContent = formatTimer(timerState.remaining);
        const modeEl = document.getElementById('timerModeLabel');
        if (modeEl) modeEl.textContent = timerState.mode === 'focus' ? 'Focus' : 'Break';
        const total = timerState.mode === 'focus' ? timerState.focusLength : timerState.breakLength;
        const pct = total > 0 ? Math.round(((total - timerState.remaining) / total) * 100) : 0;
        const gaugeEl = document.getElementById('timerGauge');
        if (gaugeEl) gaugeEl.innerHTML = svgGauge(pct, { size: 96, stroke: 8 });
        const startBtn = document.getElementById('timerStartBtn');
        const pauseBtn = document.getElementById('timerPauseBtn');
        if (startBtn) startBtn.hidden = timerState.running;
        if (pauseBtn) pauseBtn.hidden = !timerState.running;
    }

    function timerTick() {
        if (timerState.remaining <= 0) {
            clearInterval(timerState.intervalId);
            timerState.running = false;
            timerState.mode = timerState.mode === 'focus' ? 'break' : 'focus';
            timerState.remaining = timerState.mode === 'focus' ? timerState.focusLength : timerState.breakLength;
            updateTimerDisplay();
            const card = document.getElementById('studyTimerCard');
            if (card) {
                card.classList.add('timer-flash');
                setTimeout(function() { card.classList.remove('timer-flash'); }, 1800);
            }
            document.title = (timerState.mode === 'break' ? '☕ Break time!' : '🎯 Back to focus!') + ' · SAP EA Workspace';
            return;
        }
        timerState.remaining -= 1;
        updateTimerDisplay();
    }

    function startTimer() {
        if (timerState.running) return;
        timerState.running = true;
        timerState.intervalId = setInterval(timerTick, 1000);
        updateTimerDisplay();
    }

    function pauseTimer() {
        timerState.running = false;
        clearInterval(timerState.intervalId);
        updateTimerDisplay();
    }

    function resetTimer() {
        pauseTimer();
        timerState.mode = 'focus';
        timerState.remaining = timerState.focusLength;
        updateTimerDisplay();
    }

    function setTimerPreset(focusMin, breakMin) {
        pauseTimer();
        timerState.focusLength = focusMin * 60;
        timerState.breakLength = breakMin * 60;
        timerState.mode = 'focus';
        timerState.remaining = timerState.focusLength;
        updateTimerDisplay();
    }

    // ------------------------------------------------------------------
    // Tabs: generic component used by tabbed case-study guides. A
    // .tab-group holds .tab-btn[data-tab] triggers and matching
    // .tab-panel[data-tab-panel] targets - wired once via delegation.
    // ------------------------------------------------------------------
    function activateTab(group, tabId) {
        group.querySelectorAll('.tab-btn').forEach(function(btn) {
            btn.classList.toggle('is-active', btn.dataset.tab === tabId);
            btn.setAttribute('aria-selected', String(btn.dataset.tab === tabId));
        });
        group.querySelectorAll('.tab-panel').forEach(function(panel) {
            panel.hidden = panel.dataset.tabPanel !== tabId;
        });
    }

    function wireTabGroups() {
        document.querySelectorAll('.tab-group').forEach(function(group) {
            if (group.dataset.tabsWired) return;
            group.dataset.tabsWired = 'true';
            group.addEventListener('click', function(e) {
                const btn = e.target.closest('.tab-btn');
                if (!btn || !group.contains(btn)) return;
                activateTab(group, btn.dataset.tab);
            });
            const activeBtn = group.querySelector('.tab-btn.is-active') || group.querySelector('.tab-btn');
            if (activeBtn) activateTab(group, activeBtn.dataset.tab);
        });
    }

    // ------------------------------------------------------------------
    // Clean Core Decision Engine: click a card, see the recommendation.
    // Outcomes are declared as data (id -> {tone, title, body, fit}) so
    // the HTML only needs to name which outcome each card triggers.
    // ------------------------------------------------------------------
    const DECISION_OUTCOMES = {
        'embedded-abap': {
            tone: 'pass',
            title: '✅ Recommended: Developer Extensibility (Embedded ABAP Cloud, RAP)',
            body: "Logic that needs to run close to the S/4HANA core for data-intensive ABAP operations belongs in-core, via the RESTful Application Programming Model (RAP). This keeps execution next to the data while staying inside Clean Core's upgrade-stable interface contract.",
            fit: 'Clean Core Fit: Compliant'
        },
        'side-by-side': {
            tone: 'pass',
            title: '✅ Recommended: Side-by-Side Extensibility on SAP BTP',
            body: 'Decoupled logic, non-ABAP languages, heavy use of BTP services (Workflow, AI, Integration), or a custom SAP UI5 interface all point away from the core. Side-by-side extensibility keeps innovation velocity high without ever touching the digital core.',
            fit: 'Clean Core Fit: Compliant'
        },
        'table-modification': {
            tone: 'breach',
            title: '🚫 CRITICAL BREACH OF CLEAN CORE',
            body: 'Standard core modifications are forbidden. You must use well-defined, upgrade-stable APIs and interfaces instead — direct table access breaks upgrade stability and voids the two-way guarantee Clean Core depends on: the core stays pristine, and extensions survive every release.',
            fit: 'Clean Core Fit: Non-compliant — stop and redesign'
        }
    };

    function showDecisionResult(container, outcomeId) {
        const resultEl = container.querySelector('.decision-result');
        const outcome = DECISION_OUTCOMES[outcomeId];
        if (!resultEl || !outcome) return;
        resultEl.className = 'decision-result decision-result--' + outcome.tone;
        resultEl.innerHTML = `<p class="decision-result__title">${outcome.title}</p><p>${outcome.body}</p><span class="fit-badge fit-badge--${outcome.tone}">${outcome.fit}</span>`;
        resultEl.hidden = false;
        container.querySelectorAll('.decision-card').forEach(function(card) {
            card.classList.toggle('is-selected', card.dataset.outcome === outcomeId);
        });
        resultEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    function wireDecisionEngines() {
        document.querySelectorAll('.decision-engine').forEach(function(container) {
            if (container.dataset.wired) return;
            container.dataset.wired = 'true';
            container.addEventListener('click', function(e) {
                const card = e.target.closest('.decision-card');
                if (!card || !container.contains(card)) return;
                showDecisionResult(container, card.dataset.outcome);
            });
        });
    }

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
        const wrong = getWrongAnswers();
        const lastVisitedId = getLastVisitedSheet();
        const lastVisited = lastVisitedId ? sheetIndex.find(s => s.id === lastVisitedId) : null;

        const showAll = filter === 'all';
        const isEmpty = bookmarked.length === 0 && noted.length === 0 && !practice && wrong.length === 0;
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
            if (showAll || filter === 'wrong') {
                const body = wrong.length
                    ? wrong.map(function(w) {
                        return `<a class="review-item" href="#sheet-practice">
                            <span class="review-item__code">✗</span>
                            <span class="review-item__body">
                                <span class="review-item__title">${escapeHtml(w.text)}</span>
                                <span class="review-item__meta">Answered incorrectly — re-drill this one</span>
                            </span>
                            <span class="review-item__cta">Practice →</span>
                        </a>`;
                    }).join('')
                    : '<p class="review-empty">Nothing wrong yet — questions you miss in Practice show up here to re-drill.</p>';
                html += renderReviewSection('Needs Review', wrong.length, body);
            }

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
                            <span class="review-item__title">Practice Quizzes &amp; Cases</span>
                            <span class="review-item__meta">${practice.answered}/${practice.total} answered · ${practice.correct} correct (${practice.pct}%)</span>
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
        // Opened as a local file rather than served over http(s)? fetch()
        // of local .md files is blocked by the browser in this mode, so
        // domain deep-dives and docs.html would otherwise fail silently.
        if (location.protocol === 'file:') {
            const banner = document.getElementById('fileProtocolBanner');
            if (banner) banner.hidden = false;
        }

        renderDomainQuizBank();
        // Must follow renderDomainQuizBank() - the 60 generated cards have to
        // exist in the DOM before their saved answers can be re-applied.
        restoreQuizState();
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

        // --- Domain Knowledge Checks: filter + reset wiring ---
        applyDomainQuizFilter();
        applyCaseChecklistState();
        wireTabGroups();
        wireDecisionEngines();

        const domainQuizFilterEl = document.getElementById('domainQuizFilter');
        if (domainQuizFilterEl) domainQuizFilterEl.addEventListener('change', applyDomainQuizFilter);

        const domainQuizResetBtn = document.getElementById('domainQuizReset');
        if (domainQuizResetBtn) domainQuizResetBtn.addEventListener('click', resetAllQuizzes);

        // --- Case rubric self-score checklists AND the study schedule
        // (event delegation - items are added freely to either without
        // needing new listeners) ---
        document.addEventListener('change', function(e) {
            if (!e.target.matches) return;
            if (e.target.matches('.case-checklist input[type="checkbox"]')) {
                toggleCaseChecklistItem(e.target.dataset.checkId, e.target.checked);
            } else if (e.target.matches('.schedule-checklist input[type="checkbox"]')) {
                toggleChecklistItem(scheduleChecklistKey, e.target.dataset.checkId, e.target.checked);
                renderTodayFocus();
                const summary = e.target.closest('details.schedule-week');
                if (summary) {
                    const countEl = summary.querySelector('.schedule-week__count');
                    const doneCount = summary.querySelectorAll('.schedule-checklist input[type="checkbox"]:checked').length;
                    if (countEl) countEl.textContent = `${doneCount}/7`;
                }
            }
        });

        // --- Inline the domain deep-dives directly into their sheets -
        // no separate page, no extra click, the real content is just there.
        loadInlineDeepDive('domain03DeepDive', 'domains/01-framework-toolset.md', 'sheet-03');
        loadInlineDeepDive('domain04DeepDive', 'domains/02-vision-roadmap.md', 'sheet-04');
        loadInlineDeepDive('domain05DeepDive', 'domains/03-business-architecture.md', 'sheet-05');
        loadInlineDeepDive('domain06DeepDive', 'domains/04-data-app-tech.md', 'sheet-06');

        // --- Today's Focus + full Study Schedule ---
        renderScheduleSheet();
        applyChecklistState(scheduleChecklistKey, '.schedule-checklist input[type="checkbox"]');
        renderTodayFocus();

        document.addEventListener('click', function(e) {
            const markDoneBtn = e.target.closest('#markDayDoneBtn');
            if (markDoneBtn) {
                toggleChecklistItem(scheduleChecklistKey, markDoneBtn.dataset.dayId, true);
                renderScheduleSheet();
                applyChecklistState(scheduleChecklistKey, '.schedule-checklist input[type="checkbox"]');
                renderTodayFocus();
            }
        });

        // --- Foundations Assessment (parsed from its markdown source) ---
        loadAssessment();

        // --- Flashcard drill ---
        buildFlashcardQueue();
        renderFlashcard();

        const flashcardFilter = document.getElementById('flashcardFilter');
        if (flashcardFilter) {
            flashcardFilter.addEventListener('change', function() {
                flashcardSession.filter = flashcardFilter.value;
                buildFlashcardQueue();
                renderFlashcard();
            });
        }

        const flashcardShuffle = document.getElementById('flashcardShuffle');
        if (flashcardShuffle) {
            flashcardShuffle.addEventListener('click', function() {
                buildFlashcardQueue();
                renderFlashcard();
            });
        }

        const flashcardStage = document.getElementById('flashcardStage');
        if (flashcardStage) {
            flashcardStage.addEventListener('click', function(e) {
                const trigger = e.target.closest('[data-fc], #flashcardRestart');
                if (!trigger) return;
                if (trigger.id === 'flashcardRestart') {
                    buildFlashcardQueue();
                    renderFlashcard();
                    return;
                }
                const action = trigger.dataset.fc;
                if (action === 'flip') {
                    flashcardSession.flipped = !flashcardSession.flipped;
                    renderFlashcard();
                } else if (action === 'knew') {
                    flashcardAdvance(true);
                } else if (action === 'missed') {
                    flashcardAdvance(false);
                }
            });
        }

        // --- Study Timer ---
        updateTimerDisplay();
        const timerStartBtn = document.getElementById('timerStartBtn');
        const timerPauseBtn = document.getElementById('timerPauseBtn');
        const timerResetBtn = document.getElementById('timerResetBtn');
        if (timerStartBtn) timerStartBtn.addEventListener('click', startTimer);
        if (timerPauseBtn) timerPauseBtn.addEventListener('click', pauseTimer);
        if (timerResetBtn) timerResetBtn.addEventListener('click', resetTimer);
        document.querySelectorAll('.timer-preset-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                setTimerPreset(Number(btn.dataset.focus), Number(btn.dataset.break));
            });
        });

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
