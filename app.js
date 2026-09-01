// ============================================================
// SAP EA Study Guide - Shared Site Script (index.html + quiz.html)
// ============================================================

(function() {
    'use strict';

    // --- Progress Tracker (Sheet 12 checklist) ---
    const trackerKey = 'sapEaProgress';

    function loadProgress() {
        try {
            const saved = localStorage.getItem(trackerKey);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.log('Error loading progress:', e);
        }
        return {
            foundation: false,
            framework: false,
            vision: false,
            business: false,
            dataTech: false,
            defense: false,
            practice: false,
            readiness: false
        };
    }

    function saveProgress(data) {
        try {
            localStorage.setItem(trackerKey, JSON.stringify(data));
        } catch (e) {
            console.log('Error saving progress:', e);
        }
    }

    // --- Quiz Progress (persisted score across visits) ---
    const quizProgressKey = 'sapEaQuizProgress';

    function trackQuizProgress(score) {
        try {
            const current = JSON.parse(localStorage.getItem(quizProgressKey) || '{}');
            current.lastScore = score;
            current.attempts = (current.attempts || 0) + 1;
            current.lastAttempt = new Date().toISOString();
            localStorage.setItem(quizProgressKey, JSON.stringify(current));
        } catch (e) {
            console.log('Error tracking quiz progress:', e);
        }
    }

    function getQuizProgress() {
        try {
            const data = localStorage.getItem(quizProgressKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.log('Error getting quiz progress:', e);
            return null;
        }
    }

    function displayQuizProgress() {
        const quizProgressDisplay = document.getElementById('quizProgressDisplay');
        if (!quizProgressDisplay) return;
        const progress = getQuizProgress();
        if (progress) {
            quizProgressDisplay.textContent = `📊 Quiz: ${progress.lastScore || 0}% (${progress.attempts || 0} attempt${progress.attempts === 1 ? '' : 's'})`;
        } else {
            quizProgressDisplay.textContent = '📊 Quiz: Not started yet';
        }
    }

    // --- Scenario Quiz Logic (quiz.html) ---
    // Tracks answers in-memory for this visit; commits a score to
    // localStorage once every question on the page has been answered.
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

        if (!selected) {
            alert('Please select an answer first.');
            return;
        }

        options.forEach(opt => {
            opt.closest('label').classList.remove('selected', 'correct', 'wrong');
        });

        feedback.classList.add('show');

        options.forEach(opt => {
            const label = opt.closest('label');
            if (opt.value === correctAnswer) {
                label.classList.add('correct');
            } else if (opt.checked && opt.value !== correctAnswer) {
                label.classList.add('wrong');
            }
        });

        const submitBtn = document.getElementById(feedbackId).closest('.quiz-card').querySelector('.quiz-submit');
        submitBtn.disabled = true;

        quizState.answered[questionName] = true;
        quizState.correct[questionName] = selected.value === correctAnswer;
        updateLiveQuizTally();

        const total = totalQuizQuestions();
        if (Object.keys(quizState.answered).length === total && total > 0) {
            const correctCount = Object.values(quizState.correct).filter(Boolean).length;
            const finalScore = Math.round((correctCount / total) * 100);
            trackQuizProgress(finalScore);
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

            card.querySelectorAll('.feedback-text').forEach(fb => {
                fb.classList.remove('show');
            });

            const submitBtn = card.querySelector('.quiz-submit');
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        });

        quizState.answered = {};
        quizState.correct = {};
        updateLiveQuizTally();

        const quizzesSection = document.getElementById('quizzes');
        if (quizzesSection) {
            quizzesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Expose for inline onclick="" handlers in quiz.html
    window.checkAnswer = checkAnswer;
    window.resetAllQuizzes = resetAllQuizzes;

    // --- DOM Setup ---
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Setup Progress Tracker (index.html Sheet 12)
        const checkboxes = document.querySelectorAll('.progress-checkbox');
        const progressDisplay = document.getElementById('progressDisplay');
        const resetButton = document.getElementById('resetProgress');

        function updateProgressDisplay() {
            const progress = loadProgress();
            const total = Object.keys(progress).length;
            const completed = Object.values(progress).filter(v => v === true).length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            if (progressDisplay) {
                progressDisplay.textContent = `${completed}/${total} (${percentage}%)`;
            }
        }

        function applyProgressState() {
            const progress = loadProgress();
            checkboxes.forEach(checkbox => {
                const key = checkbox.dataset.trackerKey;
                if (key && progress.hasOwnProperty(key)) {
                    checkbox.checked = progress[key];
                }
            });
            updateProgressDisplay();
        }

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const key = this.dataset.trackerKey;
                if (key) {
                    const progress = loadProgress();
                    progress[key] = this.checked;
                    saveProgress(progress);
                    updateProgressDisplay();
                }
            });
        });

        if (resetButton) {
            resetButton.addEventListener('click', function() {
                if (confirm('Reset all progress? This cannot be undone.')) {
                    const resetProgressData = {};
                    checkboxes.forEach(cb => {
                        const key = cb.dataset.trackerKey;
                        if (key) {
                            resetProgressData[key] = false;
                            cb.checked = false;
                        }
                    });
                    saveProgress(resetProgressData);
                    updateProgressDisplay();
                }
            });
        }

        applyProgressState();

        // 2. Back to Top Button
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            window.addEventListener('scroll', function() {
                backToTopButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
            });

            backToTopButton.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // 3. Mobile Navigation Toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                const isOpen = navMenu.style.display === 'flex' && window.innerWidth <= 768;
                if (window.innerWidth <= 768) {
                    navMenu.style.display = isOpen ? 'none' : 'flex';
                    this.setAttribute('aria-expanded', String(!isOpen));
                }
            });

            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navMenu.style.display = 'flex';
                } else {
                    navMenu.style.display = 'none';
                }
            });

            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
                navToggle.style.display = 'block';
            } else {
                navToggle.style.display = 'none';
                navMenu.style.display = 'flex';
            }
        }

        // 4. Active Section Highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function highlightActiveSection() {
            let currentSectionId = '';
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150) {
                    currentSectionId = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }

        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(highlightActiveSection);
        });

        setTimeout(highlightActiveSection, 500);

        // 5. Display persisted quiz progress (index.html tracker + quiz.html header)
        displayQuizProgress();
        updateLiveQuizTally();
    });

})();
