// Visual Manager Module for Project Manager Simulator
// Handles character displays and day-specific visuals

export class VisualManager {
    constructor() {
        // Day-specific visual backgrounds
        this.dayBackgrounds = [
            '../assets/images/day1_kickoff.png',
            '../assets/images/day2_planning.png',
            '../assets/images/day3_development.png',
            '../assets/images/day4_meeting.png',
            '../assets/images/day5_crisis.png',
            '../assets/images/day6_review.png',
            '../assets/images/day7_delivery.png',
            '../assets/images/day8_feedback.png',
            '../assets/images/day9_adjustment.png',
            '../assets/images/day10_completion.png'
        ];
        
        // Default images if custom ones aren't available
        this.defaultImages = {
            pmMale: '../assets/images/pm_male_default.png',
            pmFemale: '../assets/images/pm_female_default.png',
            pmNeutral: '../assets/images/pm_neutral_default.png',
            customerCorporate: '../assets/images/customer_corporate_default.png',
            customerAcademic: '../assets/images/customer_academic_default.png',
            customerStartup: '../assets/images/customer_startup_default.png',
            teamDeveloper: '../assets/images/team_developer_default.png',
            teamDesigner: '../assets/images/team_designer_default.png',
            teamTester: '../assets/images/team_tester_default.png',
            teamAnalyst: '../assets/images/team_analyst_default.png',
            teamDevops: '../assets/images/team_devops_default.png'
        };
    }
    
    // Update character displays based on selected characters
    updateCharacterDisplays(characters, pmElement, customerElement, teamContainer) {
        // Update PM character
        if (pmElement && characters.projectManager) {
            pmElement.style.backgroundImage = `url(${characters.projectManager.avatar})`;
            document.getElementById('pm-name').textContent = characters.projectManager.name;
        }
        
        // Update customer character
        if (customerElement && characters.customer) {
            customerElement.style.backgroundImage = `url(${characters.customer.avatar})`;
            document.getElementById('customer-name').textContent = characters.customer.name;
        }
        
        // Update team members
        if (teamContainer && characters.teamMembers && characters.teamMembers.length > 0) {
            teamContainer.innerHTML = '';
            
            characters.teamMembers.forEach(member => {
                const memberElement = document.createElement('div');
                memberElement.className = 'team-member';
                
                const avatarElement = document.createElement('div');
                avatarElement.className = 'team-member-avatar';
                avatarElement.style.backgroundImage = `url(${member.avatar})`;
                
                const nameElement = document.createElement('div');
                nameElement.className = 'team-member-name';
                nameElement.textContent = member.name;
                
                const roleElement = document.createElement('div');
                roleElement.className = 'team-member-role';
                roleElement.textContent = member.role;
                
                memberElement.appendChild(avatarElement);
                memberElement.appendChild(nameElement);
                memberElement.appendChild(roleElement);
                
                teamContainer.appendChild(memberElement);
            });
        }
    }
    
    // Update day-specific visuals
    updateDayVisuals(day) {
        const dayVisual = document.getElementById('day-visual');
        if (!dayVisual) return;
        
        // Day is 1-indexed, array is 0-indexed
        const index = day - 1;
        
        if (index >= 0 && index < this.dayBackgrounds.length) {
            dayVisual.style.backgroundImage = `url(${this.dayBackgrounds[index]})`;
        } else {
            // Default background if day is out of range
            dayVisual.style.backgroundImage = 'none';
            dayVisual.style.backgroundColor = '#ecf0f1';
        }
        
        // Add day-specific class for additional styling
        dayVisual.className = 'day-visual day-' + day;
    }
    
    // Create placeholder images for development
    createPlaceholderImages() {
        // This method would generate placeholder images for development
        // In a real implementation, this would create canvas elements and draw
        // simple placeholder images, but for this simulation we'll just log
        console.log('Creating placeholder images for development');
    }
    
    // Preload all images to prevent loading delays during gameplay
    preloadImages() {
        const imagesToPreload = [
            ...this.dayBackgrounds,
            ...Object.values(this.defaultImages)
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}
