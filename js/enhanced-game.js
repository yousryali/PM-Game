// Enhanced Project Manager Simulator - Main Game Script
import scenarios from './modules/scenarios.js';
import ScoringSystem from './modules/scoring-system.js';
import RecommendationEngine from './modules/recommendation-engine.js';
import { VisualManager } from './modules/visual-manager.js';

// Main Game Class
class ProjectManagerGame {
    constructor() {
        // Game state
        this.currentDay = 0;
        this.timeline = 100;
        this.budget = 100;
        this.morale = 100;
        this.gameOver = false;
        
        // Character information
        this.characters = {
            projectManager: null,
            customer: null,
            teamMembers: []
        };
        
        // PMBOK scoring
        this.domainScores = {
            stakeholders: 70,
            team: 70,
            developmentApproach: 70,
            planning: 70,
            projectWork: 70,
            delivery: 70,
            performance: 70,
            uncertainty: 70
        };
        
        this.principleScores = {
            stewardship: 70,
            team: 70,
            stakeholders: 70,
            value: 70,
            systemsThinking: 70,
            leadership: 70,
            tailoring: 70,
            quality: 70,
            complexity: 70,
            risk: 70,
            adaptability: 70,
            change: 70
        };
        
        // Initialize modules
        this.scoringSystem = new ScoringSystem();
        this.recommendationEngine = new RecommendationEngine();
        this.visualManager = new VisualManager();
        
        // DOM elements
        this.characterSelectionScreen = document.getElementById('character-selection');
        this.gamePanel = document.querySelector('.game-panel');
        this.gameOverScreen = document.getElementById('game-over-screen');
        
        // Initialize game
        this.init();
    }
    
    // Initialize the game
    init() {
        console.log('Initializing Project Manager Simulator...');
        
        // Create placeholder images for development
        this.visualManager.createPlaceholderImages();
        
        // Setup character selection
        this.setupCharacterSelection();
        
        // Hide game panel and game over screen initially
        this.gamePanel.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
        
        // Show character selection screen
        this.characterSelectionScreen.style.display = 'block';
    }
    
    // Setup character selection interface
    setupCharacterSelection() {
        // Create character selection form
        const characterSelectionForm = document.createElement('div');
        characterSelectionForm.className = 'character-selection-form';
        
        // Project Manager selection
        const pmSection = document.createElement('div');
        pmSection.className = 'character-section';
        pmSection.innerHTML = `
            <h3>Choose Your Project Manager</h3>
            <div class="character-options">
                <div class="character-option">
                    <input type="radio" id="pm-male" name="pm-character" value="male" checked>
                    <label for="pm-male">
                        <img src="assets/images/pm_male_default.png" alt="Male PM">
                        <span>Alex</span>
                    </label>
                </div>
                <div class="character-option">
                    <input type="radio" id="pm-female" name="pm-character" value="female">
                    <label for="pm-female">
                        <img src="assets/images/pm_female_default.png" alt="Female PM">
                        <span>Sarah</span>
                    </label>
                </div>

            </div>
            <div class="name-input">
                <label for="pm-name">Your Project Manager Name:</label>
                <input type="text" id="pm-name" placeholder="Enter your name">
            </div>
        `;
        
        // Customer selection
        const customerSection = document.createElement('div');
        customerSection.className = 'character-section';
        customerSection.innerHTML = `
            <h3>Choose Your Client</h3>
            <div class="character-options">
                <div class="character-option">
                    <input type="radio" id="customer-corporate" name="customer-character" value="corporate" checked>
                    <label for="customer-corporate">
                        <img src="assets/images/customer_corporate_default.png" alt="Corporate Client">
                        <span>Mr. Thompson (corporate)</span>
                    </label>
                </div>
                <div class="character-option">
                    <input type="radio" id="customer-academic" name="customer-character" value="academic">
                    <label for="customer-academic">
                        <img src="assets/images/customer_academic_default.png" alt="Academic Client">
                        <span>Dr. Rivera (academic)</span>
                    </label>
                </div>
                <div class="character-option">
                    <input type="radio" id="customer-startup" name="customer-character" value="startup">
                    <label for="customer-startup">
                        <img src="assets/images/customer_startup_default.png" alt="Startup Client">
                        <span>Ms. Chen (startup)</span>
                    </label>
                </div>
            </div>
        `;
        
        // Team size selection
        const teamSection = document.createElement('div');
        teamSection.className = 'character-section';
        teamSection.innerHTML = `
            <h3>Choose Your Team Size</h3>
            <div class="team-size-selector">
                <label for="team-size">Number of team members:</label>
                <select id="team-size">
                    <option value="3">Small Team (3)</option>
                    <option value="5" selected>Medium Team (5)</option>
                    <option value="8">Large Team (8)</option>
                </select>
            </div>
        `;
        
        // Start button
        const startButton = document.createElement('button');
        startButton.className = 'start-game-btn';
        startButton.textContent = 'Start Project';
        startButton.addEventListener('click', () => this.startGame());
        
        // Append all sections
        characterSelectionForm.appendChild(pmSection);
        characterSelectionForm.appendChild(customerSection);
        characterSelectionForm.appendChild(teamSection);
        characterSelectionForm.appendChild(startButton);
        
        // Add form to character selection screen
        this.characterSelectionScreen.appendChild(characterSelectionForm);
    }
    
    // Start the game with selected characters
    startGame() {
        console.log('Starting game...');
        
        // Get selected project manager
        const pmCharacter = document.querySelector('input[name="pm-character"]:checked').value;
        const pmName = document.getElementById('pm-name').value || 'Project Manager';
        
        // Get selected customer
        const customerCharacter = document.querySelector('input[name="customer-character"]:checked').value;
        
        // Get team size
        const teamSize = parseInt(document.getElementById('team-size').value);
        
        // Set character information
        this.characters.projectManager = {
            type: pmCharacter,
            name: pmName,
            avatar: `assets/images/pm_${pmCharacter}_default.png`
        };
        
        this.characters.customer = {
            type: customerCharacter,
            name: this.getCustomerName(customerCharacter),
            avatar: `assets/images/customer_${customerCharacter}_default.png`
        };
        
        // Generate team members
        this.generateTeamMembers(teamSize);
        
        // Hide character selection, show game panel
        this.characterSelectionScreen.style.display = 'none';
        this.gamePanel.style.display = 'block';
        
        // Update character displays
        this.visualManager.updateCharacterDisplays(
            this.characters,
            document.getElementById('pm-character'),
            document.getElementById('customer-character'),
            document.getElementById('team-members')
        );
        
        // Start first day
        this.nextDay();
    }
    
    // Get customer name based on type
    getCustomerName(type) {
        switch(type) {
            case 'corporate': return 'Mr. Thompson';
            case 'academic': return 'Dr. Rivera';
            case 'startup': return 'Ms. Chen';
            default: return 'Client';
        }
    }
    
    // Generate team members
    generateTeamMembers(size) {
        const roles = ['Developer', 'Designer', 'Tester', 'Analyst', 'DevOps'];
        const names = ['Emma', 'Noah', 'Olivia', 'Liam', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Benjamin'];
        
        this.characters.teamMembers = [];
        
        for (let i = 0; i < size; i++) {
            const role = roles[i % roles.length];
            const name = names[Math.floor(Math.random() * names.length)];
            
            this.characters.teamMembers.push({
                name: name,
                role: role,
                avatar: `assets/images/team_${role.toLowerCase()}_default.png`
            });
        }
    }
    
    // Advance to the next day
    nextDay() {
        this.currentDay++;
        
        // Update day indicator
        document.getElementById('current-day').textContent = this.currentDay;
        
        // Update day visual
        this.visualManager.updateDayVisuals(this.currentDay);
        
        if (this.currentDay <= 10) {
            // Get scenario for current day
            const scenario = scenarios.find(s => s.day === this.currentDay);
            
            if (scenario) {
                // Display scenario
                document.getElementById('scenario-text').innerHTML = `<p>${scenario.text}</p>`;
                
                // Create decision buttons
                const decisionsContainer = document.getElementById('decisions');
                decisionsContainer.innerHTML = '';
                
                scenario.decisions.forEach((decision, index) => {
                    const button = document.createElement('button');
                    button.className = 'decision-btn';
                    button.textContent = decision.text;
                    button.addEventListener('click', () => this.makeDecision(decision, scenario.domain));
                    
                    decisionsContainer.appendChild(button);
                });
            }
        } else {
            // Game over after 10 days
            this.endGame();
        }
    }
    
    // Make a decision
    makeDecision(decision, domain) {
        console.log(`Decision made: ${decision.text}`);
        
        // Apply impact to game state
        this.timeline += decision.impact.timeline;
        this.budget += decision.impact.budget;
        this.morale += decision.impact.morale;
        
        // Ensure values stay within 0-100 range
        this.timeline = Math.max(0, Math.min(100, this.timeline));
        this.budget = Math.max(0, Math.min(100, this.budget));
        this.morale = Math.max(0, Math.min(100, this.morale));
        
        // Update UI
        this.updateStats();
        
        // Check for game over conditions
        if (this.timeline <= 0 || this.budget <= 0 || this.morale <= 0) {
            this.endGame();
            return;
        }
        
        // Show PMBOK question
        this.showPMBOKQuestion(domain);
    }
    
    // Show PMBOK question related to the current domain
    showPMBOKQuestion(domain) {
        // Hide decisions
        document.getElementById('decisions').style.display = 'none';
        
        // Show question container
        const questionContainer = document.getElementById('pmbok-question-container');
        questionContainer.style.display = 'block';
        
        // For demo purposes, create a sample question
        // In the full implementation, this would pull from the question bank
        const question = {
            domain: domain,
            principle: this.getRelatedPrinciple(domain),
            question: `According to PMBOK, what's the best approach when dealing with ${domain}?`,
            options: [
                "Focus on technical solutions first",
                "Engage stakeholders collaboratively",
                "Follow the plan exactly as documented",
                "Delegate responsibility to team members"
            ],
            correctAnswer: 1,
            explanation: `The ${domain} domain emphasizes collaborative engagement with stakeholders to ensure alignment and value delivery.`
        };
        
        // Display question
        questionContainer.innerHTML = `
            <div class="pmbok-question">
                <div class="question-text">${question.question}</div>
                <div class="question-badges">
                    <span class="badge domain-badge">${question.domain}</span>
                    <span class="badge principle-badge">${question.principle}</span>
                </div>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add event listeners to options
        const optionButtons = questionContainer.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedIndex = parseInt(button.dataset.index);
                this.answerPMBOKQuestion(question, selectedIndex);
            });
        });
    }
    
    // Get a related principle for a domain
    getRelatedPrinciple(domain) {
        const domainPrincipleMap = {
            'Stakeholders': 'Stakeholders',
            'Team': 'Team',
            'Development Approach & Life Cycle': 'Tailoring',
            'Planning': 'Value',
            'Project Work': 'Quality',
            'Delivery': 'Systems Thinking',
            'Performance': 'Measurement',
            'Uncertainty & Ambiguity': 'Risk'
        };
        
        return domainPrincipleMap[domain] || 'Value';
    }
    
    // Handle PMBOK question answer
    answerPMBOKQuestion(question, selectedIndex) {
        const questionContainer = document.getElementById('pmbok-question-container');
        const isCorrect = selectedIndex === question.correctAnswer;
        
        // Update scores based on answer
        const { domainScores, principleScores } = this.scoringSystem.updateScores(
            this.domainScores,
            this.principleScores,
            question,
            selectedIndex
        );
        
        this.domainScores = domainScores;
        this.principleScores = principleScores;
        
        // Show feedback
        questionContainer.innerHTML = `
            <div class="question-feedback">
                <div class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                    ${isCorrect ? 'Correct!' : 'Not quite right.'}
                </div>
                <div class="explanation">
                    ${question.explanation}
                </div>
                <button class="continue-btn">Continue to Next Day</button>
            </div>
        `;
        
        // Add event listener to continue button
        questionContainer.querySelector('.continue-btn').addEventListener('click', () => {
            // Hide question container
            questionContainer.style.display = 'none';
            
            // Show decisions for next day
            document.getElementById('decisions').style.display = 'flex';
            
            // Advance to next day
            this.nextDay();
        });
    }
    
    // Update game stats display
    updateStats() {
        // Update progress bars
        const timelineBar = document.getElementById('timeline-bar');
        const budgetBar = document.getElementById('budget-bar');
        const moraleBar = document.getElementById('morale-bar');
        
        timelineBar.style.width = `${this.timeline}%`;
        budgetBar.style.width = `${this.budget}%`;
        moraleBar.style.width = `${this.morale}%`;
        
        // Update values
        document.getElementById('timeline-value').textContent = `${this.timeline}%`;
        document.getElementById('budget-value').textContent = `${this.budget}%`;
        document.getElementById('morale-value').textContent = `${this.morale}%`;
        
        // Update colors based on values
        timelineBar.className = 'progress-bar ' + this.getStatusClass(this.timeline);
        budgetBar.className = 'progress-bar ' + this.getStatusClass(this.budget);
        moraleBar.className = 'progress-bar ' + this.getStatusClass(this.morale);
    }
    
    // Get status class based on value
    getStatusClass(value) {
        if (value >= 70) return 'good';
        if (value >= 40) return 'warning';
        return 'danger';
    }
    
    // End the game
    endGame() {
        this.gameOver = true;
        
        // Hide game panel
        this.gamePanel.style.display = 'none';
        
        // Show game over screen
        this.gameOverScreen.style.display = 'block';
        
        // Calculate final score
        const finalScore = this.scoringSystem.calculateFinalScore(this.domainScores, this.principleScores);
        
        // Generate outcome message
        let outcomeMessage;
        if (this.timeline <= 0) {
            outcomeMessage = "Your project ran out of time! The client canceled the contract and hired a competitor.";
        } else if (this.budget <= 0) {
            outcomeMessage = "Your project ran out of budget! The finance department has shut down your project.";
        } else if (this.morale <= 0) {
            outcomeMessage = "Your team's morale collapsed completely! Everyone has quit, and you're left alone with a half-finished project.";
        } else if (finalScore >= 80) {
            outcomeMessage = "Congratulations! Your project was a glorious success. The client is thrilled, your team is celebrating, and you've been promoted!";
        } else if (finalScore >= 60) {
            outcomeMessage = "Your project was completed adequately. The client is satisfied, though not ecstatic, and your team is ready for the next challenge.";
        } else {
            outcomeMessage = "Your project limped to completion. The client accepted the deliverables but won't be calling you for their next project.";
        }
        
        // Generate recommendations
        const recommendations = this.recommendationEngine.generateRecommendations(this.domainScores, this.principleScores);
        
        // Update game summary
        const gameSummary = document.getElementById('game-summary');
        gameSummary.innerHTML = `
            <h3>${finalScore >= 60 ? 'Project Completed!' : 'Project Struggled!'}</h3>
            <p>${outcomeMessage}</p>
            <div class="final-stats">
                <p>Final Timeline: ${this.timeline}%</p>
                <p>Final Budget: ${this.budget}%</p>
                <p>Final Team Morale: ${this.morale}%</p>
                <p>Overall PMBOK Score: ${finalScore}/100</p>
            </div>
        `;
        
        // Update domain scores
        const domainScoresElement = document.getElementById('domain-scores');
        domainScoresElement.innerHTML = `
            <h4>Performance Domain Scores</h4>
            <ul>
                ${Object.entries(this.domainScores).map(([domain, score]) => `
                    <li><span>${this.formatDomainName(domain)}</span> <span>${score}/100</span></li>
                `).join('')}
            </ul>
        `;
        
        // Update principle scores
        const principleScoresElement = document.getElementById('principle-scores');
        principleScoresElement.innerHTML = `
            <h4>PMBOK Principle Scores</h4>
            <ul>
                ${Object.entries(this.principleScores).map(([principle, score]) => `
                    <li><span>${this.formatPrincipleName(principle)}</span> <span>${score}/100</span></li>
                `).join('')}
            </ul>
        `;
        
        // Update recommendations
        const recommendationsElement = document.getElementById('recommendations');
        recommendationsElement.innerHTML = `
            <h4>Improvement Recommendations</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        `;
        
        // Add event listener to restart button
        document.getElementById('restart-button').addEventListener('click', () => {
            location.reload();
        });
    }
    
    // Format domain name for display
    formatDomainName(domain) {
        const domainMap = {
            'stakeholders': 'Stakeholders',
            'team': 'Team',
            'developmentApproach': 'Development Approach & Life Cycle',
            'planning': 'Planning',
            'projectWork': 'Project Work',
            'delivery': 'Delivery',
            'performance': 'Performance',
            'uncertainty': 'Uncertainty & Ambiguity'
        };
        
        return domainMap[domain] || domain;
    }
    
    // Format principle name for display
    formatPrincipleName(principle) {
        const principleMap = {
            'stewardship': 'Stewardship',
            'team': 'Team',
            'stakeholders': 'Stakeholders',
            'value': 'Value',
            'systemsThinking': 'Systems Thinking',
            'leadership': 'Leadership',
            'tailoring': 'Tailoring',
            'quality': 'Quality',
            'complexity': 'Complexity',
            'risk': 'Risk',
            'adaptability': 'Adaptability & Resilience',
            'change': 'Change'
        };
        
        return principleMap[principle] || principle;
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new ProjectManagerGame();
});
