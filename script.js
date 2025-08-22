/**
 * The Mimic Tycoon - Speedrun Leaderboard
 * Modern JavaScript implementation with enhanced functionality
 */

class SpeedrunLeaderboard {
    constructor() {
        this.speedrunData = {};
        this.currentSection = 'chapters';
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        this.setupEventListeners();
        this.loadSpeedrunData();
        this.setupIntersectionObserver();
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Difficulty tabs
        document.querySelectorAll('.diff-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleDifficultyToggle(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    /**
     * Handle navigation between main sections
     */
    handleNavigation(event) {
        const targetSection = event.currentTarget.getAttribute('data-section');
        
        // Update active navigation tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        
        // Show target section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetSection).classList.add('active');
        
        this.currentSection = targetSection;
        
        // Add smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Handle difficulty toggle (Normal/Nightmare)
     */
    handleDifficultyToggle(event) {
        const button = event.currentTarget;
        const difficulty = button.getAttribute('data-difficulty');
        const card = button.closest('.chapter-card, .gamemode-card, .legacy-card');
        
        if (!card) return;
        
        // Update active difficulty tab
        card.querySelectorAll('.diff-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show/hide difficulty sections
        card.querySelectorAll('.runs-display').forEach(display => {
            display.classList.remove('active');
        });
        
        const targetDisplay = card.querySelector(`[data-difficulty="${difficulty}"]`);
        if (targetDisplay) {
            targetDisplay.classList.add('active');
        }
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(event) {
        switch(event.key) {
            case '1':
                this.navigateToSection('chapters');
                break;
            case '2':
                this.navigateToSection('gamemodes');
                break;
            case '3':
                this.navigateToSection('legacy');
                break;
            case 'Escape':
                this.closeAllModals();
                break;
        }
    }

    /**
     * Navigate to a specific section
     */
    navigateToSection(sectionName) {
        const tab = document.querySelector(`[data-section="${sectionName}"]`);
        if (tab) {
            tab.click();
        }
    }

    /**
     * Load speedrun data from JSON file
     */
    async loadSpeedrunData() {
        try {
            console.log('🔄 Loading speedrun data...');
            const response = await fetch('data.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.speedrunData = await response.json();
            console.log('✅ Speedrun data loaded successfully:', this.speedrunData);
            
            this.displayAllRuns();
            this.addLoadingAnimations();
            
        } catch (error) {
            console.error('❌ Error loading speedrun data:', error);
            console.log('🔄 Using fallback data instead...');
            
            this.speedrunData = this.getFallbackData();
            this.displayAllRuns();
            this.addLoadingAnimations();
        }
    }

    /**
     * Get fallback data if JSON loading fails
     */
    getFallbackData() {
        return {
            "chapters": {
                "chapter1": {
                    "normal": [
                        {
                            "runnerName": "SpeedRunner1",
                            "time": "12:34",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=example1"
                        },
                        {
                            "runnerName": "FastPlayer2",
                            "time": "13:45",
                            "date": "2024-01-16",
                            "video": "https://youtube.com/watch?v=example2"
                        },
                        {
                            "runnerName": "QuickGamer3",
                            "time": "14:12",
                            "date": "2024-01-17",
                            "video": ""
                        }
                    ],
                    "nightmare": [
                        {
                            "runnerName": "NightmareMaster",
                            "time": "18:22",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=nightmare1"
                        },
                        {
                            "runnerName": "DarkRunner",
                            "time": "19:05",
                            "date": "2024-01-16",
                            "video": ""
                        },
                        {
                            "runnerName": "FearlessPlayer",
                            "time": "20:18",
                            "date": "2024-01-17",
                            "video": "https://youtube.com/watch?v=nightmare2"
                        }
                    ]
                },
                "chapter2": {
                    "normal": [
                        {
                            "runnerName": "Chapter2Pro",
                            "time": "15:30",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=ch2normal1"
                        }
                    ],
                    "nightmare": [
                        {
                            "runnerName": "NightmarePro",
                            "time": "22:45",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=ch2nightmare1"
                        }
                    ]
                }
            },
            "gamemodes": {
                "witch-trials": {
                    "normal": [
                        {
                            "runnerName": "WitchHunter",
                            "time": "25:30",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=witchnormal1"
                        }
                    ],
                    "nightmare": [
                        {
                            "runnerName": "NightmareWitch",
                            "time": "35:45",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=nightmare1"
                        }
                    ]
                }
            },
            "legacy": {
                "legacy1": {
                    "normal": [
                        {
                            "runnerName": "LegacyRunner1",
                            "time": "10:30",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=legacy1normal1"
                        }
                    ],
                    "nightmare": [
                        {
                            "runnerName": "LegacyNightmare1",
                            "time": "15:45",
                            "date": "2024-01-15",
                            "video": "https://youtube.com/watch?v=legacy1nightmare1"
                        }
                    ]
                }
            }
        };
    }

    /**
     * Display all runs from loaded data
     */
    displayAllRuns() {
        console.log('🎯 Displaying all runs...');
        
        // Display chapters
        if (this.speedrunData.chapters) {
            Object.keys(this.speedrunData.chapters).forEach(chapterKey => {
                const chapter = this.speedrunData.chapters[chapterKey];
                this.displayRunsForCategory(`${chapterKey}-normal`, chapter.normal);
                this.displayRunsForCategory(`${chapterKey}-nightmare`, chapter.nightmare);
            });
        }
        
        // Display gamemodes
        if (this.speedrunData.gamemodes) {
            Object.keys(this.speedrunData.gamemodes).forEach(gamemodeKey => {
                const gamemode = this.speedrunData.gamemodes[gamemodeKey];
                this.displayRunsForCategory(`${gamemodeKey}-normal`, gamemode.normal);
                this.displayRunsForCategory(`${gamemodeKey}-nightmare`, gamemode.nightmare);
            });
        }
        
        // Display legacy chapters
        if (this.speedrunData.legacy) {
            Object.keys(this.speedrunData.legacy).forEach(legacyKey => {
                const legacy = this.speedrunData.legacy[legacyKey];
                this.displayRunsForCategory(`${legacyKey}-normal`, legacy.normal);
                this.displayRunsForCategory(`${legacyKey}-nightmare`, legacy.nightmare);
            });
        }
    }

    /**
     * Display runs for a specific category
     */
    displayRunsForCategory(categoryId, runs) {
        const runList = document.querySelector(`[data-category="${categoryId}"]`);
        if (!runList) {
            console.warn(`⚠️ Run list not found for category: ${categoryId}`);
            return;
        }
        
        // Clear existing content
        runList.innerHTML = '';
        
        // Validate runs data
        if (!Array.isArray(runs) || runs.length === 0) {
            this.showNoRunsPlaceholder(runList);
            return;
        }
        
        // Sort runs by time (fastest first)
        const sortedRuns = [...runs].sort((a, b) => {
            return this.parseTimeToSeconds(a.time) - this.parseTimeToSeconds(b.time);
        });
        
        console.log(`🏃 Displaying ${sortedRuns.length} runs for ${categoryId}:`, sortedRuns);
        
        // Display top 3 runs with staggered animation
        sortedRuns.slice(0, 3).forEach((run, index) => {
            const runElement = this.createRunElement(run, index);
            runList.appendChild(runElement);
            
            // Add staggered animation
            setTimeout(() => {
                runElement.style.opacity = '1';
                runElement.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    /**
     * Create a run element
     */
    createRunElement(run, index) {
        const runDiv = document.createElement('div');
        runDiv.className = 'run-item';
        
        // Validate and sanitize run data
        const runnerName = this.sanitizeString(run.runnerName) || 'Unknown Runner';
        const time = this.sanitizeString(run.time) || '00:00';
        const date = run.date ? this.formatDate(run.date) : 'Unknown Date';
        const video = this.sanitizeString(run.video) || '';
        
        // Add medal emoji for top 3
        const medalEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        
        runDiv.innerHTML = `
            <div class="run-time">${time}</div>
            <div class="runner-name">${medalEmoji} ${runnerName}</div>
            <div class="run-details">
                <div class="run-date">Date: ${date}</div>
                ${video ? `<div>Video: <a href="${video}" target="_blank" rel="noopener noreferrer">Watch</a></div>` : ''}
            </div>
        `;
        
        // Initial animation state
        runDiv.style.opacity = '0';
        runDiv.style.transform = 'translateY(20px)';
        runDiv.style.transition = 'all 0.4s ease';
        
        return runDiv;
    }

    /**
     * Show placeholder when no runs exist
     */
    showNoRunsPlaceholder(runList) {
        const placeholder = document.createElement('div');
        placeholder.className = 'no-runs-placeholder';
        placeholder.innerHTML = `
            <i class="fas fa-clock" style="font-size: 2rem; margin-bottom: 1rem; display: block; opacity: 0.5;"></i>
            <div>No runs recorded yet</div>
            <div style="font-size: 0.875rem; margin-top: 0.5rem;">Be the first to set a record!</div>
        `;
        runList.appendChild(placeholder);
    }

    /**
     * Parse time string to seconds for sorting
     */
    parseTimeToSeconds(time) {
        if (!time || typeof time !== 'string') return 0;
        
        const timeParts = time.split(':');
        if (timeParts.length !== 2) return 0;
        
        const minutes = parseInt(timeParts[0], 10);
        const seconds = parseInt(timeParts[1], 10);
        
        if (isNaN(minutes) || isNaN(seconds)) return 0;
        
        return minutes * 60 + seconds;
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        if (!dateString) return 'Unknown Date';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid Date';
            
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    }

    /**
     * Sanitize string input
     */
    sanitizeString(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/[<>]/g, '').trim();
    }

    /**
     * Add loading animations to cards
     */
    addLoadingAnimations() {
        const cards = document.querySelectorAll('.chapter-card, .gamemode-card, .legacy-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Set up intersection observer for animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all cards
        document.querySelectorAll('.chapter-card, .gamemode-card, .legacy-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    /**
     * Close all modals (placeholder for future functionality)
     */
    closeAllModals() {
        // Future modal functionality can be added here
        console.log('🔒 Closing all modals...');
    }

    /**
     * Get current application state
     */
    getCurrentState() {
        return {
            currentSection: this.currentSection,
            dataLoaded: Object.keys(this.speedrunData).length > 0,
            totalCategories: this.getTotalCategories()
        };
    }

    /**
     * Get total number of categories
     */
    getTotalCategories() {
        let total = 0;
        
        if (this.speedrunData.chapters) {
            total += Object.keys(this.speedrunData.chapters).length * 2; // normal + nightmare
        }
        if (this.speedrunData.gamemodes) {
            total += Object.keys(this.speedrunData.gamemodes).length * 2;
        }
        if (this.speedrunData.legacy) {
            total += Object.keys(this.speedrunData.legacy).length * 2;
        }
        
        return total;
    }

    /**
     * Refresh data (for future use)
     */
    async refreshData() {
        console.log('🔄 Refreshing speedrun data...');
        await this.loadSpeedrunData();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing The Mimic Tycoon Speedrun Leaderboard...');
    
    // Create global instance
    window.speedrunLeaderboard = new SpeedrunLeaderboard();
    
    // Add some helpful console commands
    console.log('💡 Helpful console commands:');
    console.log('  - speedrunLeaderboard.getCurrentState() - Get current app state');
    console.log('  - speedrunLeaderboard.refreshData() - Refresh data');
    console.log('  - Press 1, 2, or 3 to navigate between sections');
    
    console.log('✅ Application initialized successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.speedrunLeaderboard) {
        console.log('👁️ Page became visible, refreshing data...');
        window.speedrunLeaderboard.refreshData();
    }
});

// Handle window focus
window.addEventListener('focus', () => {
    if (window.speedrunLeaderboard) {
        console.log('🎯 Window focused, refreshing data...');
        window.speedrunLeaderboard.refreshData();
    }
}); 
