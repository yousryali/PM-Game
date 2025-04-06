// Character Manager Module for Project Manager Simulator
// Handles character creation, selection, and management

export class CharacterManager {
    constructor() {
        this.projectManagerOptions = [
            { id: 'pm1', name: 'Alex', gender: 'male', avatar: '../assets/images/pm_male.png' },
            { id: 'pm2', name: 'Sarah', gender: 'female', avatar: '../assets/images/pm_female.png' },
            { id: 'pm3', name: 'Jordan', gender: 'neutral', avatar: '../assets/images/pm_neutral.png' }
        ];
        
        this.customerOptions = [
            { id: 'cust1', name: 'Mr. Thompson', type: 'corporate', avatar: '../assets/images/customer_corporate.png' },
            { id: 'cust2', name: 'Dr. Rivera', type: 'academic', avatar: '../assets/images/customer_academic.png' },
            { id: 'cust3', name: 'Ms. Chen', type: 'startup', avatar: '../assets/images/customer_startup.png' }
        ];
        
        this.teamMemberTemplates = [
            { role: 'Developer', avatar: '../assets/images/team_developer.png' },
            { role: 'Designer', avatar: '../assets/images/team_designer.png' },
            { role: 'Tester', avatar: '../assets/images/team_tester.png' },
            { role: 'Business Analyst', avatar: '../assets/images/team_analyst.png' },
            { role: 'DevOps Engineer', avatar: '../assets/images/team_devops.png' }
        ];
    }

    // Populate character selection options in the UI
    populateCharacterOptions(container) {
        // Create project manager selection
        const pmSection = document.createElement('div');
        pmSection.className = 'character-section';
        pmSection.innerHTML = `
            <h3>Choose Your Project Manager</h3>
            <div class="character-options pm-options">
                ${this.projectManagerOptions.map(pm => `
                    <div class="character-option">
                        <input type="radio" name="pm-choice" id="${pm.id}" value="${pm.id}" ${pm.id === 'pm1' ? 'checked' : ''}>
                        <label for="${pm.id}">
                            <img src="${pm.avatar}" alt="${pm.name}">
                            <span>${pm.name}</span>
                        </label>
                    </div>
                `).join('')}
            </div>
            <div class="name-input">
                <label for="player-name">Your Project Manager Name:</label>
                <input type="text" id="player-name" placeholder="Enter your name">
            </div>
        `;
        
        // Create customer selection
        const customerSection = document.createElement('div');
        customerSection.className = 'character-section';
        customerSection.innerHTML = `
            <h3>Choose Your Client</h3>
            <div class="character-options customer-options">
                ${this.customerOptions.map(cust => `
                    <div class="character-option">
                        <input type="radio" name="customer-choice" id="${cust.id}" value="${cust.id}" ${cust.id === 'cust1' ? 'checked' : ''}>
                        <label for="${cust.id}">
                            <img src="${cust.avatar}" alt="${cust.name}">
                            <span>${cust.name} (${cust.type})</span>
                        </label>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Create team size selection
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
        
        // Create form
        const form = document.createElement('form');
        form.id = 'character-form';
        form.appendChild(pmSection);
        form.appendChild(customerSection);
        form.appendChild(teamSection);
        
        // Add submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'start-game-btn';
        submitButton.textContent = 'Start Project';
        form.appendChild(submitButton);
        
        // Add to container
        container.innerHTML = '';
        container.appendChild(form);
    }

    // Get selected characters from the UI
    getSelectedCharacters() {
        const characters = {
            projectManager: null,
            customer: null,
            teamMembers: []
        };
        
        // Get selected project manager
        const selectedPmId = document.querySelector('input[name="pm-choice"]:checked').value;
        characters.projectManager = this.projectManagerOptions.find(pm => pm.id === selectedPmId);
        
        // Get custom name if provided
        const customName = document.getElementById('player-name').value.trim();
        if (customName) {
            characters.projectManager.name = customName;
        }
        
        // Get selected customer
        const selectedCustomerId = document.querySelector('input[name="customer-choice"]:checked').value;
        characters.customer = this.customerOptions.find(cust => cust.id === selectedCustomerId);
        
        // Generate team members based on selected size
        const teamSize = parseInt(document.getElementById('team-size').value);
        characters.teamMembers = this.generateTeamMembers(teamSize);
        
        return characters;
    }

    // Generate random team members based on team size
    generateTeamMembers(size) {
        const teamMembers = [];
        const names = [
            'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James',
            'Isabella', 'Benjamin', 'Mia', 'Lucas', 'Charlotte', 'Mason', 'Amelia',
            'Ethan', 'Harper', 'Alexander', 'Evelyn', 'Daniel', 'Abigail', 'Matthew'
        ];
        
        // Ensure we have at least one of each role for small teams
        const essentialRoles = size <= 5 ? 
            this.teamMemberTemplates.slice(0, size) : 
            this.teamMemberTemplates;
        
        // Add essential roles first
        essentialRoles.forEach(template => {
            // Get a random name
            const randomNameIndex = Math.floor(Math.random() * names.length);
            const name = names.splice(randomNameIndex, 1)[0];
            
            teamMembers.push({
                name,
                role: template.role,
                avatar: template.avatar
            });
        });
        
        // If we need more team members, add additional ones with random roles
        while (teamMembers.length < size) {
            // Get a random template
            const randomTemplateIndex = Math.floor(Math.random() * this.teamMemberTemplates.length);
            const template = this.teamMemberTemplates[randomTemplateIndex];
            
            // Get a random name
            const randomNameIndex = Math.floor(Math.random() * names.length);
            const name = names.splice(randomNameIndex, 1)[0];
            
            teamMembers.push({
                name,
                role: template.role,
                avatar: template.avatar
            });
        }
        
        return teamMembers;
    }
}
