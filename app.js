// ============================================================
// SAP EA Study Guide - Complete Working JavaScript
// ============================================================

(function() {
    'use strict';

    // --- Progress Tracker ---
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
        // Default progress
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

    // --- DOM Setup ---
    document.addEventListener('DOMContentLoaded', function() {
        // 1. Setup Progress Tracker
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

        // Handle checkbox changes
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(e) {
                const key = this.dataset.trackerKey;
                if (key) {
                    const progress = loadProgress();
                    progress[key] = this.checked;
                    saveProgress(progress);
                    updateProgressDisplay();
                }
            });
        });

        // Reset progress
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                if (confirm('Reset all progress? This cannot be undone.')) {
                    const resetProgress = {};
                    checkboxes.forEach(cb => {
                        const key = cb.dataset.trackerKey;
                        if (key) {
                            resetProgress[key] = false;
                            cb.checked = false;
                        }
                    });
                    saveProgress(resetProgress);
                    updateProgressDisplay();
                }
            });
        }

        // Apply saved progress on load
        applyProgressState();

        // 2. Back to Top Button
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.style.display = 'flex';
                } else {
                    backToTopButton.style.display = 'none';
                }
            });

            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
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
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '60px';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.background = '#003366';
                    navMenu.style.padding = '20px';
                    navMenu.style.gap = '10px';
                    this.setAttribute('aria-expanded', !isOpen);
                }
            });

            // Handle window resize for mobile menu
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navMenu.style.display = 'flex';
                    navMenu.style.position = 'static';
                    navMenu.style.flexDirection = 'row';
                    navMenu.style.padding = '0';
                    navMenu.style.gap = '15px';
                    navMenu.style.background = 'transparent';
                } else {
                    navMenu.style.display = 'none';
                }
            });

            // Initial state for mobile
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

        // Throttled scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(highlightActiveSection);
        });

        // Initial highlight
        setTimeout(highlightActiveSection, 500);
    });

})();
