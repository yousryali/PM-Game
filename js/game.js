// Project Manager Simulator - Game Logic

// Game state variables
let gameState = {
    day: 1,
    timeline: 100,
    budget: 100,
    morale: 100,
    isGameOver: false
};

// DOM Elements
const timelineBar = document.getElementById('timeline-bar');
const budgetBar = document.getElementById('budget-bar');
const moraleBar = document.getElementById('morale-bar');
const timelineValue = document.getElementById('timeline-value');
const budgetValue = document.getElementById('budget-value');
const moraleValue = document.getElementById('morale-value');
const currentDayElement = document.getElementById('current-day');
const scenarioTextElement = document.getElementById('scenario-text');
const decisionsContainer = document.getElementById('decisions');
const gameOverScreen = document.getElementById('game-over-screen');
const gameSummary = document.getElementById('game-summary');
const restartButton = document.getElementById('restart-button');

// Game scenarios with decisions and their impacts
const scenarios = [
    {
        day: 1,
        text: "Your client just emailed you with 'a few small changes' that completely change the project scope.",
        decisions: [
            {
                text: "Accept the changes but extend the timeline",
                impact: { timeline: -15, budget: -5, morale: -5 }
            },
            {
                text: "Push back and stick to the original scope",
                impact: { timeline: 5, budget: 5, morale: -10 }
            },
            {
                text: "Accept the changes and force your team to work overtime",
                impact: { timeline: 0, budget: -10, morale: -20 }
            }
        ]
    },
    {
        day: 2,
        text: "Your star developer just announced they're going on a two-week vacation... tomorrow.",
        decisions: [
            {
                text: "Let them go - they've earned it",
                impact: { timeline: -15, budget: 0, morale: 10 }
            },
            {
                text: "Ask them to postpone until after the project deadline",
                impact: { timeline: 5, budget: 0, morale: -15 }
            },
            {
                text: "Hire a temporary contractor to cover",
                impact: { timeline: -5, budget: -15, morale: 5 }
            }
        ]
    },
    {
        day: 3,
        text: "The QA team found a critical bug that will take significant effort to fix.",
        decisions: [
            {
                text: "Delay the release to fix it properly",
                impact: { timeline: -20, budget: -5, morale: 5 }
            },
            {
                text: "Ship with the bug and fix it in the next update",
                impact: { timeline: 5, budget: 0, morale: -10 }
            },
            {
                text: "Pull an all-nighter with the team to fix it immediately",
                impact: { timeline: 0, budget: -10, morale: -15 }
            }
        ]
    },
    {
        day: 4,
        text: "Your team is arguing over which technology stack to use for a new feature.",
        decisions: [
            {
                text: "Let them debate and come to a consensus",
                impact: { timeline: -10, budget: 0, morale: 10 }
            },
            {
                text: "Make an executive decision to save time",
                impact: { timeline: 5, budget: 0, morale: -10 }
            },
            {
                text: "Bring in an external consultant to decide",
                impact: { timeline: -5, budget: -15, morale: 0 }
            }
        ]
    },
    {
        day: 5,
        text: "The CEO just dropped by and wants to see a demo... right now.",
        decisions: [
            {
                text: "Show the current build with all its flaws",
                impact: { timeline: 0, budget: 0, morale: -5 }
            },
            {
                text: "Quickly create a smoke-and-mirrors demo",
                impact: { timeline: -5, budget: -5, morale: -5 }
            },
            {
                text: "Explain that a proper demo needs preparation time",
                impact: { timeline: 0, budget: 0, morale: 5 }
            }
        ]
    },
    {
        day: 6,
        text: "Your developer just rage-quit after a heated code review.",
        decisions: [
            {
                text: "Reach out and convince them to come back",
                impact: { timeline: -5, budget: 0, morale: 5 }
            },
            {
                text: "Let them go and redistribute their work",
                impact: { timeline: -15, budget: 0, morale: -10 }
            },
            {
                text: "Hire a replacement immediately",
                impact: { timeline: -10, budget: -20, morale: -5 }
            }
        ]
    },
    {
        day: 7,
        text: "The client wants to schedule daily 2-hour status meetings.",
        decisions: [
            {
                text: "Agree to the meetings",
                impact: { timeline: -15, budget: -5, morale: -15 }
            },
            {
                text: "Suggest a more efficient 30-minute format",
                impact: { timeline: -5, budget: 0, morale: 5 }
            },
            {
                text: "Delegate the meetings to a junior team member",
                impact: { timeline: 0, budget: 0, morale: -5 }
            }
        ]
    },
    {
        day: 8,
        text: "Your team just discovered that a third-party API you depend on is being deprecated next week.",
        decisions: [
            {
                text: "Quickly find and integrate an alternative API",
                impact: { timeline: -15, budget: -10, morale: -5 }
            },
            {
                text: "Build your own replacement functionality",
                impact: { timeline: -25, budget: -15, morale: 5 }
            },
            {
                text: "Negotiate with the provider for an extension",
                impact: { timeline: -5, budget: -5, morale: 0 }
            }
        ]
    },
    {
        day: 9,
        text: "The marketing team wants to add 'just one more feature' before launch.",
        decisions: [
            {
                text: "Agree to add the feature",
                impact: { timeline: -20, budget: -15, morale: -10 }
            },
            {
                text: "Promise it for the next release",
                impact: { timeline: 0, budget: 0, morale: 5 }
            },
            {
                text: "Suggest a simplified version of the feature",
                impact: { timeline: -10, budget: -5, morale: -5 }
            }
        ]
    },
    {
        day: 10,
        text: "It's the final day before delivery and you're slightly behind schedule.",
        decisions: [
            {
                text: "Ask the team to work through the night",
                impact: { timeline: 15, budget: -10, morale: -25 }
            },
            {
                text: "Deliver what you have and explain the situation",
                impact: { timeline: 0, budget: 0, morale: 5 }
            },
            {
                text: "Cut some non-essential features to meet the deadline",
                impact: { timeline: 10, budget: 5, morale: -5 }
            }
        ]
    }
];

// Initialize the game
function initGame() {
    gameState = {
        day: 1,
        timeline: 100,
        budget: 100,
        morale: 100,
        isGameOver: false
    };
    
    updateUI();
    showScenario();
    
    // Hide game over screen
    gameOverScreen.style.display = 'none';
    document.querySelector('.game-panel').style.display = 'block';
}

// Update UI elements based on game state
function updateUI() {
    // Update progress bars
    timelineBar.style.width = `${gameState.timeline}%`;
    budgetBar.style.width = `${gameState.budget}%`;
    moraleBar.style.width = `${gameState.morale}%`;
    
    // Update text values
    timelineValue.textContent = `${gameState.timeline}%`;
    budgetValue.textContent = `${gameState.budget}%`;
    moraleValue.textContent = `${gameState.morale}%`;
    
    // Update day
    currentDayElement.textContent = gameState.day;
    
    // Update progress bar colors based on values
    updateBarColors();
}

// Update progress bar colors based on their values
function updateBarColors() {
    // Timeline bar
    if (gameState.timeline > 66) {
        timelineBar.className = 'progress-bar good';
    } else if (gameState.timeline > 33) {
        timelineBar.className = 'progress-bar warning';
    } else {
        timelineBar.className = 'progress-bar danger';
    }
    
    // Budget bar
    if (gameState.budget > 66) {
        budgetBar.className = 'progress-bar good';
    } else if (gameState.budget > 33) {
        budgetBar.className = 'progress-bar warning';
    } else {
        budgetBar.className = 'progress-bar danger';
    }
    
    // Morale bar
    if (gameState.morale > 66) {
        moraleBar.className = 'progress-bar good';
    } else if (gameState.morale > 33) {
        moraleBar.className = 'progress-bar warning';
    } else {
        moraleBar.className = 'progress-bar danger';
    }
}

// Show the current day's scenario
function showScenario() {
    const currentScenario = scenarios[gameState.day - 1];
    
    // Update scenario text
    scenarioTextElement.innerHTML = `<p>${currentScenario.text}</p>`;
    
    // Clear previous decisions
    decisionsContainer.innerHTML = '';
    
    // Add decision buttons
    currentScenario.decisions.forEach((decision, index) => {
        const button = document.createElement('button');
        button.className = 'decision-btn';
        button.textContent = decision.text;
        button.addEventListener('click', () => makeDecision(index));
        decisionsContainer.appendChild(button);
    });
}

// Handle player decision
function makeDecision(decisionIndex) {
    const currentScenario = scenarios[gameState.day - 1];
    const decision = currentScenario.decisions[decisionIndex];
    
    // Apply impacts
    gameState.timeline += decision.impact.timeline;
    gameState.budget += decision.impact.budget;
    gameState.morale += decision.impact.morale;
    
    // Ensure values stay within 0-100 range
    gameState.timeline = Math.max(0, Math.min(100, gameState.timeline));
    gameState.budget = Math.max(0, Math.min(100, gameState.budget));
    gameState.morale = Math.max(0, Math.min(100, gameState.morale));
    
    // Check for game over conditions
    if (gameState.timeline <= 0 || gameState.budget <= 0 || gameState.morale <= 0) {
        endGame(false);
        return;
    }
    
    // Move to next day
    gameState.day++;
    
    // Check if game is complete
    if (gameState.day > 10) {
        endGame(true);
        return;
    }
    
    // Update UI and show next scenario
    updateUI();
    showScenario();
}

// End the game and show summary
function endGame(completed) {
    gameState.isGameOver = true;
    
    // Hide game panel and show game over screen
    document.querySelector('.game-panel').style.display = 'none';
    gameOverScreen.style.display = 'block';
    
    // Calculate final score (average of all three metrics)
    const finalScore = Math.round((gameState.timeline + gameState.budget + gameState.morale) / 3);
    
    // Generate summary based on final state
    let summaryHTML = '';
    
    if (!completed) {
        // Game over due to a metric reaching zero
        if (gameState.timeline <= 0) {
            summaryHTML = `
                <h3>Project Catastrophically Delayed!</h3>
                <p>Your project timeline collapsed completely. The client has fired you and hired a team of consultants at triple the cost.</p>
                <p>You now spend your days writing bitter LinkedIn posts about agile methodology.</p>
                <div class="final-stats">
                    <p>Days Survived: ${gameState.day - 1}/10</p>
                    <p>Final Budget: ${gameState.budget}%</p>
                    <p>Final Morale: ${gameState.morale}%</p>
                </div>
            `;
        } else if (gameState.budget <= 0) {
            summaryHTML = `
                <h3>Budget Obliterated!</h3>
                <p>You've completely depleted your budget. The finance department has put your picture on their wall of shame.</p>
                <p>You're now working as a street performer, juggling legacy code for spare change.</p>
                <div class="final-stats">
                    <p>Days Survived: ${gameState.day - 1}/10</p>
                    <p>Final Timeline: ${gameState.timeline}%</p>
                    <p>Final Morale: ${gameState.morale}%</p>
                </div>
            `;
        } else if (gameState.morale <= 0) {
            summaryHTML = `
                <h3>Team Revolt!</h3>
                <p>Your team's morale has hit rock bottom. They've all simultaneously called in sick with a rare condition called "terrible-boss-itis".</p>
                <p>You're now a yoga instructor specializing in "deadline stress relief poses".</p>
                <div class="final-stats">
                    <p>Days Survived: ${gameState.day - 1}/10</p>
                    <p>Final Timeline: ${gameState.timeline}%</p>
                    <p>Final Budget: ${gameState.budget}%</p>
                </div>
            `;
        }
    } else {
        // Completed all 10 days
        if (finalScore >= 80) {
            summaryHTML = `
                <h3>Legendary Project Manager!</h3>
                <p>Against all odds, your project was a spectacular success! The client is thrilled, your team is celebrating, and management is wondering how you pulled it off.</p>
                <p>You've been promoted to Chief Miracle Worker. Congratulations!</p>
                <div class="final-stats">
                    <p>Final Timeline: ${gameState.timeline}%</p>
                    <p>Final Budget: ${gameState.budget}%</p>
                    <p>Final Morale: ${gameState.morale}%</p>
                    <p>Overall Score: ${finalScore}%</p>
                </div>
            `;
        } else if (finalScore >= 50) {
            summaryHTML = `
                <h3>Competent Project Manager</h3>
                <p>Your project was delivered with only minor fires to put out. The client is satisfied, if not amazed.</p>
                <p>You've earned a modest bonus and the right to manage an even more chaotic project next quarter!</p>
                <div class="final-stats">
                    <p>Final Timeline: ${gameState.timeline}%</p>
                    <p>Final Budget: ${gameState.budget}%</p>
                    <p>Final Morale: ${gameState.morale}%</p>
                    <p>Overall Score: ${finalScore}%</p>
                </div>
            `;
        } else {
            summaryHTML = `
                <h3>Project... Completed?</h3>
                <p>Well, technically your project shipped, but it's a bit like calling a burning car "transportation" - technically correct but missing the point.</p>
                <p>You're now considering a career change to something less stressful, like bomb disposal or alligator dentistry.</p>
                <div class="final-stats">
                    <p>Final Timeline: ${gameState.timeline}%</p>
                    <p>Final Budget: ${gameState.budget}%</p>
                    <p>Final Morale: ${gameState.morale}%</p>
                    <p>Overall Score: ${finalScore}%</p>
                </div>
            `;
        }
    }
    
    gameSummary.innerHTML = summaryHTML;
}

// Event listeners
restartButton.addEventListener('click', initGame);

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
