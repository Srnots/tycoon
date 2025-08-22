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

    init() {
        this.setupEventListeners();
        this.loadSpeedrunData();
        this.setupIntersectionObserver();
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Difficulty toggle buttons
        document.querySelectorAll('.diff-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleDifficultyToggle(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    handleNavigation(event) {
        const button = event.currentTarget;
        const section = button.getAttribute('data-section');
        
        if (!section) return;
        
        // Update active navigation tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update active content section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.querySelector(`[data-section="${section}"]`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = section;
        }
    }

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
        
        // Hide all runs displays
        card.querySelectorAll('.runs-display').forEach(display => {
            display.classList.remove('active');
        });
        
        // Show the selected difficulty runs display
        const targetDisplay = card.querySelector(`[data-difficulty="${difficulty}"]`);
        if (targetDisplay) {
            targetDisplay.classList.add('active');
        }
    }

    handleKeyboardNavigation(event) {
        switch(event.key) {
            case '1':
                this.switchToSection('chapters');
                break;
            case '2':
                this.switchToSection('gamemodes');
                break;
            case '3':
                this.switchToSection('legacy');
                break;
            case 'Escape':
                // Reset to chapters view
                this.switchToSection('chapters');
                break;
        }
    }

    switchToSection(section) {
        const tab = document.querySelector(`[data-section="${section}"]`);
        if (tab) {
            tab.click();
        }
    }

    async loadSpeedrunData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.speedrunData = await response.json();
            console.log('Speedrun data loaded successfully:', this.speedrunData);
            this.displayAllRuns();
        } catch (error) {
            console.error('Error loading speedrun data:', error);
            console.log('Using fallback data...');
            this.speedrunData = this.getFallbackData();
            this.displayAllRuns();
        }
    }

    getFallbackData() {
        return {
            chapters: {
                chapter1: {
                    normal: [
                        { runnerName: "SpeedRunner1", time: "12:34", date: "2024-01-15", video: "https://youtube.com/watch?v=example1" },
                        { runnerName: "FastPlayer2", time: "13:45", date: "2024-01-16", video: "https://youtube.com/watch?v=example2" },
                        { runnerName: "QuickGamer3", time: "14:12", date: "2024-01-17", video: "" }
                    ],
                    nightmare: [
                        { runnerName: "NightmareMaster", time: "18:22", date: "2024-01-15", video: "https://youtube.com/watch?v=nightmare1" },
                        { runnerName: "DarkRunner", time: "19:05", date: "2024-01-16", video: "" },
                        { runnerName: "FearlessPlayer", time: "20:18", date: "2024-01-17", video: "https://youtube.com/watch?v=nightmare2" }
                    ]
                },
                chapter2: {
                    normal: [
                        { runnerName: "Chapter2Pro", time: "15:30", date: "2024-01-18", video: "https://youtube.com/watch?v=ch2ex1" },
                        { runnerName: "SpeedMaster2", time: "16:15", date: "2024-01-19", video: "" },
                        { runnerName: "QuickRunner2", time: "17:45", date: "2024-01-20", video: "https://youtube.com/watch?v=ch2ex2" }
                    ],
                    nightmare: [
                        { runnerName: "NightmarePro2", time: "22:10", date: "2024-01-18", video: "https://youtube.com/watch?v=ch2night1" },
                        { runnerName: "DarkMaster2", time: "23:25", date: "2024-01-19", video: "" },
                        { runnerName: "Fearless2", time: "24:30", date: "2024-01-20", video: "https://youtube.com/watch?v=ch2night2" }
                    ]
                },
                chapter3: {
                    normal: [
                        { runnerName: "Chapter3Champ", time: "18:45", date: "2024-01-21", video: "https://youtube.com/watch?v=ch3ex1" },
                        { runnerName: "SpeedPro3", time: "19:20", date: "2024-01-22", video: "" },
                        { runnerName: "QuickChamp3", time: "20:15", date: "2024-01-23", video: "https://youtube.com/watch?v=ch3ex2" }
                    ],
                    nightmare: [
                        { runnerName: "NightmareChamp3", time: "25:40", date: "2024-01-21", video: "https://youtube.com/watch?v=ch3night1" },
                        { runnerName: "DarkChamp3", time: "26:55", date: "2024-01-22", video: "" },
                        { runnerName: "FearlessChamp3", time: "28:10", date: "2024-01-23", video: "https://youtube.com/watch?v=ch3night2" }
                    ]
                },
                chapter4: {
                    normal: [
                        { runnerName: "Chapter4Legend", time: "21:30", date: "2024-01-24", video: "https://youtube.com/watch?v=ch4ex1" },
                        { runnerName: "SpeedLegend4", time: "22:15", date: "2024-01-25", video: "" },
                        { runnerName: "QuickLegend4", time: "23:45", date: "2024-01-26", video: "https://youtube.com/watch?v=ch4ex2" }
                    ],
                    nightmare: [
                        { runnerName: "NightmareLegend4", time: "30:20", date: "2024-01-24", video: "https://youtube.com/watch?v=ch4night1" },
                        { runnerName: "DarkLegend4", time: "31:35", date: "2024-01-25", video: "" },
                        { runnerName: "FearlessLegend4", time: "33:10", date: "2024-01-26", video: "https://youtube.com/watch?v=ch4night2" }
                    ]
                }
            },
            gamemodes: {
                witchTrials: {
                    normal: [
                        { runnerName: "WitchHunter", time: "25:15", date: "2024-01-27", video: "https://youtube.com/watch?v=witch1" },
                        { runnerName: "WitchSlayer", time: "26:30", date: "2024-01-28", video: "" },
                        { runnerName: "WitchMaster", time: "27:45", date: "2024-01-29", video: "https://youtube.com/watch?v=witch2" }
                    ],
                    nightmare: [
                        { runnerName: "WitchNightmare", time: "35:20", date: "2024-01-27", video: "https://youtube.com/watch?v=witchnight1" },
                        { runnerName: "WitchDark", time: "36:45", date: "2024-01-28", video: "" },
                        { runnerName: "WitchFearless", time: "38:10", date: "2024-01-29", video: "https://youtube.com/watch?v=witchnight2" }
                    ]
                },
                jigoku: {
                    normal: [
                        { runnerName: "JigokuRunner", time: "30:45", date: "2024-01-30", video: "https://youtube.com/watch?v=jigoku1" },
                        { runnerName: "JigokuMaster", time: "32:10", date: "2024-02-01", video: "" },
                        { runnerName: "JigokuChamp", time: "33:25", date: "2024-02-02", video: "https://youtube.com/watch?v=jigoku2" }
                    ],
                    nightmare: [
                        { runnerName: "JigokuNightmare", time: "42:30", date: "2024-01-30", video: "https://youtube.com/watch?v=jigokunight1" },
                        { runnerName: "JigokuDark", time: "44:15", date: "2024-02-01", video: "" },
                        { runnerName: "JigokuFearless", time: "45:40", date: "2024-02-02", video: "https://youtube.com/watch?v=jigokunight2" }
                    ]
                },
                christmasTrials: {
                    normal: [
                        { runnerName: "ChristmasRunner", time: "28:20", date: "2024-02-03", video: "https://youtube.com/watch?v=xmas1" },
                        { runnerName: "ChristmasMaster", time: "29:35", date: "2024-02-04", video: "" },
                        { runnerName: "ChristmasChamp", time: "30:50", date: "2024-02-05", video: "https://youtube.com/watch?v=xmas2" }
                    ],
                    nightmare: [
                        { runnerName: "ChristmasNightmare", time: "38:45", date: "2024-02-03", video: "https://youtube.com/watch?v=xmasnight1" },
                        { runnerName: "ChristmasDark", time: "40:20", date: "2024-02-04", video: "" },
                        { runnerName: "ChristmasFearless", time: "41:35", date: "2024-02-05", video: "https://youtube.com/watch?v=xmasnight2" }
                    ]
                }
            },
            legacy: {
                legacyChapter1: {
                    normal: [
                        { runnerName: "LegacyRunner1", time: "20:15", date: "2024-02-06", video: "https://youtube.com/watch?v=legacy1" },
                        { runnerName: "LegacyMaster1", time: "21:30", date: "2024-02-07", video: "" },
                        { runnerName: "LegacyChamp1", time: "22:45", date: "2024-02-08", video: "https://youtube.com/watch?v=legacy2" }
                    ],
                    nightmare: [
                        { runnerName: "LegacyNightmare1", time: "28:20", date: "2024-02-06", video: "https://youtube.com/watch?v=legacynight1" },
                        { runnerName: "LegacyDark1", time: "29:35", date: "2024-02-07", video: "" },
                        { runnerName: "LegacyFearless1", time: "30:50", date: "2024-02-08", video: "https://youtube.com/watch?v=legacynight2" }
                    ]
                },
                legacyChapter2: {
                    normal: [
                        { runnerName: "LegacyRunner2", time: "22:30", date: "2024-02-09", video: "https://youtube.com/watch?v=legacy3" },
                        { runnerName: "LegacyMaster2", time: "23:45", date: "2024-02-10", video: "" },
                        { runnerName: "LegacyChamp2", time: "25:00", date: "2024-02-11", video: "https://youtube.com/watch?v=legacy4" }
                    ],
                    nightmare: [
                        { runnerName: "LegacyNightmare2", time: "30:35", date: "2024-02-09", video: "https://youtube.com/watch?v=legacynight3" },
                        { runnerName: "LegacyDark2", time: "31:50", date: "2024-02-10", video: "" },
                        { runnerName: "LegacyFearless2", time: "33:05", date: "2024-02-11", video: "https://youtube.com/watch?v=legacynight4" }
                    ]
                },
                legacyChapter3: {
                    normal: [
                        { runnerName: "LegacyRunner3", time: "24:45", date: "2024-02-12", video: "https://youtube.com/watch?v=legacy5" },
                        { runnerName: "LegacyMaster3", time: "26:00", date: "2024-02-13", video: "" },
                        { runnerName: "LegacyChamp3", time: "27:15", date: "2024-02-14", video: "https://youtube.com/watch?v=legacy6" }
                    ],
                    nightmare: [
                        { runnerName: "LegacyNightmare3", time: "32:50", date: "2024-02-12", video: "https://youtube.com/watch?v=legacynight5" },
                        { runnerName: "LegacyDark3", time: "34:05", date: "2024-02-13", video: "" },
                        { runnerName: "LegacyFearless3", time: "35:20", date: "2024-02-14", video: "https://youtube.com/watch?v=legacynight6" }
                    ]
                },
                legacyChapter4: {
                    normal: [
                        { runnerName: "LegacyRunner4", time: "27:00", date: "2024-02-15", video: "https://youtube.com/watch?v=legacy7" },
                        { runnerName: "LegacyMaster4", time: "28:15", date: "2024-02-16", video: "" },
                        { runnerName: "LegacyChamp4", time: "29:30", date: "2024-02-17", video: "https://youtube.com/watch?v=legacy8" }
                    ],
                    nightmare: [
                        { runnerName: "LegacyNightmare4", time: "35:05", date: "2024-02-15", video: "https://youtube.com/watch?v=legacynight7" },
                        { runnerName: "LegacyDark4", time: "36:20", date: "2024-02-16", video: "" },
                        { runnerName: "LegacyFearless4", time: "37:35", date: "2024-02-17", video: "https://youtube.com/watch?v=legacynight8" }
                    ]
                }
            }
        };
    }

    displayAllRuns() {
        console.log('Displaying all runs...');
        
        // Display chapters
        if (this.speedrunData.chapters) {
            Object.keys(this.speedrunData.chapters).forEach(chapterKey => {
                const chapter = this.speedrunData.chapters[chapterKey];
                
                // Display normal runs
                if (chapter.normal) {
                    this.displayRunsForCategory(`${chapterKey}-normal`, chapter.normal);
                }
                
                // Display nightmare runs
                if (chapter.nightmare) {
                    this.displayRunsForCategory(`${chapterKey}-nightmare`, chapter.nightmare);
                }
            });
        }
        
        // Display gamemodes
        if (this.speedrunData.gamemodes) {
            Object.keys(this.speedrunData.gamemodes).forEach(gamemodeKey => {
                const gamemode = this.speedrunData.gamemodes[gamemodeKey];
                
                // Display normal runs
                if (gamemode.normal) {
                    this.displayRunsForCategory(`${gamemodeKey}-normal`, gamemode.normal);
                }
                
                // Display nightmare runs
                if (gamemode.nightmare) {
                    this.displayRunsForCategory(`${gamemodeKey}-nightmare`, gamemode.nightmare);
                }
            });
        }
        
        // Display legacy chapters
        if (this.speedrunData.legacy) {
            Object.keys(this.speedrunData.legacy).forEach(legacyKey => {
                const legacy = this.speedrunData.legacy[legacyKey];
                
                // Display normal runs
                if (legacy.normal) {
                    this.displayRunsForCategory(`${legacyKey}-normal`, legacy.normal);
                }
                
                // Display nightmare runs
                if (legacy.nightmare) {
                    this.displayRunsForCategory(`${legacyKey}-nightmare`, legacy.nightmare);
                }
            });
        }
    }

    displayRunsForCategory(categoryId, runs) {
        console.log(`Displaying runs for category: ${categoryId}`, runs);
        
        const runsList = document.querySelector(`[data-category="${categoryId}"]`);
        if (!runsList) {
            console.warn(`Runs list not found for category: ${categoryId}`);
            return;
        }
        
        // Clear existing content
        runsList.innerHTML = '';
        
        if (!runs || runs.length === 0) {
            this.showNoRunsPlaceholder(runsList);
            return;
        }
        
        // Sort runs by time (fastest first)
        const sortedRuns = runs.sort((a, b) => {
            const timeA = this.parseTimeToSeconds(a.time);
            const timeB = this.parseTimeToSeconds(b.time);
            return timeA - timeB;
        });
        
        // Display top 3 runs
        const topRuns = sortedRuns.slice(0, 3);
        topRuns.forEach((run, index) => {
            const runElement = this.createRunElement(run, index);
            runsList.appendChild(runElement);
        });
    }

    createRunElement(run, index) {
        const runDiv = document.createElement('div');
        runDiv.className = 'run-item';
        
        // Validate and sanitize data
        const time = this.sanitizeString(run.time || 'N/A');
        const runnerName = this.sanitizeString(run.runnerName || 'Unknown Runner');
        const date = this.formatDate(run.date || '');
        const video = run.video || '';
        
        // Medal emoji for top 3
        const medalEmojis = ['🥇', '🥈', '🥉'];
        const medalEmoji = index < 3 ? medalEmojis[index] : '';
        
        runDiv.innerHTML = `
            <div class="run-time">${time}</div>
            <div class="runner-name">${medalEmoji} ${runnerName}</div>
            <div class="run-details">
                <div class="run-date">Date: ${date}</div>
                ${video ? `<div>Video: <a href="${video}" target="_blank" rel="noopener noreferrer">Watch</a></div>` : ''}
            </div>
        `;
        
        return runDiv;
    }

    showNoRunsPlaceholder(container) {
        container.innerHTML = `
            <div class="no-runs-placeholder">
                No runs recorded yet for this category.
            </div>
        `;
    }

    parseTimeToSeconds(timeString) {
        if (!timeString || typeof timeString !== 'string') return Infinity;
        
        const parts = timeString.split(':');
        if (parts.length === 2) {
            const minutes = parseInt(parts[0], 10);
            const seconds = parseInt(parts[1], 10);
            return minutes * 60 + seconds;
        }
        
        return Infinity;
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown Date';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    }

    sanitizeString(str) {
        if (typeof str !== 'string') return '';
        return str.replace(/[<>]/g, '');
    }

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
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.4s ease';
            observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.speedrunLeaderboard = new SpeedrunLeaderboard();
    
    // Console helper commands
    console.log('Speedrun Leaderboard initialized!');
    console.log('Available commands:');
    console.log('- window.speedrunLeaderboard.speedrunData - View all data');
    console.log('- window.speedrunLeaderboard.displayAllRuns() - Refresh display');
}); 
