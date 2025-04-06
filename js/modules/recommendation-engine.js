// Recommendation Engine Module for Project Manager Simulator
// This module generates personalized improvement recommendations based on PMBOK 7th Edition

class RecommendationEngine {
  constructor() {
    // Domain-specific recommendations
    this.domainRecommendations = {
      'Stakeholders': [
        "Focus on improving stakeholder identification and engagement strategies",
        "Practice more collaborative approaches to stakeholder conflict resolution",
        "Develop better communication plans for different stakeholder groups",
        "Learn techniques for managing stakeholder expectations effectively",
        "Study stakeholder analysis methods from PMBOK 7th Edition"
      ],
      'Team': [
        "Work on creating a more psychologically safe team environment",
        "Improve your leadership approach to better motivate team members",
        "Develop strategies for resolving team conflicts constructively",
        "Learn techniques for building high-performing teams",
        "Practice more effective delegation and empowerment"
      ],
      'Development Approach & Life Cycle': [
        "Study different development approaches (predictive, adaptive, hybrid)",
        "Practice tailoring your approach to specific project contexts",
        "Learn when to apply different life cycle models effectively",
        "Improve your understanding of value delivery in different approaches",
        "Develop skills in transitioning between different approaches"
      ],
      'Planning': [
        "Focus on outcome-based planning rather than activity-based planning",
        "Improve your adaptive planning techniques for uncertain environments",
        "Learn how to balance detail and flexibility in planning",
        "Practice progressive elaboration in planning processes",
        "Develop skills in collaborative planning with stakeholders"
      ],
      'Project Work': [
        "Improve your focus on value-driven work prioritization",
        "Learn techniques for more effective work coordination",
        "Develop better approaches to managing work quality",
        "Practice more efficient resource allocation strategies",
        "Study work optimization techniques from PMBOK 7th Edition"
      ],
      'Delivery': [
        "Focus more on value delivery rather than just output delivery",
        "Improve your techniques for managing delivery pace",
        "Learn better approaches to quality assurance in deliverables",
        "Develop skills in progressive delivery methods",
        "Practice more effective benefit realization approaches"
      ],
      'Measurement': [
        "Improve your focus on measuring outcomes rather than just outputs",
        "Learn more effective KPI selection and monitoring techniques",
        "Develop better approaches to performance measurement",
        "Practice data-driven decision making",
        "Study measurement frameworks from PMBOK 7th Edition"
      ],
      'Uncertainty': [
        "Improve your risk identification and analysis techniques",
        "Learn more effective uncertainty management strategies",
        "Develop better approaches to opportunity exploitation",
        "Practice decision-making under uncertainty",
        "Study ambiguity tolerance techniques from PMBOK 7th Edition"
      ]
    };
    
    // Principle-specific recommendations
    this.principleRecommendations = {
      'Stewardship': [
        "Focus on improving your ethical decision-making processes",
        "Learn techniques for more responsible resource management",
        "Develop a stronger compliance mindset in project governance",
        "Practice transparent communication about project decisions",
        "Study stewardship approaches from PMBOK 7th Edition"
      ],
      'Team': [
        "Improve your approach to team empowerment and autonomy",
        "Learn techniques for better team collaboration",
        "Develop strategies for team motivation and engagement",
        "Practice more effective team conflict resolution",
        "Study team development models from PMBOK 7th Edition"
      ],
      'Stakeholders': [
        "Focus on improving stakeholder engagement strategies",
        "Learn techniques for better stakeholder need identification",
        "Develop more effective stakeholder communication approaches",
        "Practice balancing competing stakeholder interests",
        "Study stakeholder management frameworks from PMBOK 7th Edition"
      ],
      'Value': [
        "Improve your focus on value delivery throughout the project",
        "Learn techniques for better value measurement",
        "Develop strategies for continuous value assessment",
        "Practice value-based decision making",
        "Study value delivery frameworks from PMBOK 7th Edition"
      ],
      'Systems Thinking': [
        "Focus on understanding project interdependencies better",
        "Learn techniques for holistic problem analysis",
        "Develop strategies for managing system complexity",
        "Practice identifying feedback loops in project systems",
        "Study systems thinking approaches from PMBOK 7th Edition"
      ],
      'Leadership': [
        "Improve your situational leadership approaches",
        "Learn techniques for more effective team motivation",
        "Develop better strategies for vision communication",
        "Practice adaptive leadership in changing environments",
        "Study leadership models from PMBOK 7th Edition"
      ],
      'Tailoring': [
        "Focus on better adapting processes to project context",
        "Learn techniques for selecting appropriate methodologies",
        "Develop more effective hybrid approach strategies",
        "Practice contextual decision making",
        "Study tailoring frameworks from PMBOK 7th Edition"
      ],
      'Quality': [
        "Improve your quality planning approaches",
        "Learn more effective quality assurance techniques",
        "Develop better quality control strategies",
        "Practice building quality into processes",
        "Study quality management frameworks from PMBOK 7th Edition"
      ],
      'Complexity': [
        "Focus on better complexity assessment techniques",
        "Learn strategies for managing complex stakeholder networks",
        "Develop more effective approaches to technical complexity",
        "Practice decision making in complex environments",
        "Study complexity management from PMBOK 7th Edition"
      ],
      'Risk': [
        "Improve your risk identification and analysis approaches",
        "Learn more effective risk response planning techniques",
        "Develop better risk monitoring strategies",
        "Practice opportunity management alongside threat management",
        "Study risk management frameworks from PMBOK 7th Edition"
      ],
      'Adaptability': [
        "Focus on improving your change response strategies",
        "Learn techniques for building adaptable project structures",
        "Develop better approaches to iterative planning",
        "Practice resilience in the face of disruption",
        "Study adaptability frameworks from PMBOK 7th Edition"
      ],
      'Change': [
        "Improve your change management approaches",
        "Learn more effective transition planning techniques",
        "Develop better stakeholder preparation strategies for change",
        "Practice facilitating organizational change",
        "Study change management models from PMBOK 7th Edition"
      ]
    };
    
    // General recommendations that apply regardless of scores
    this.generalRecommendations = [
      "Review the PMBOK 7th Edition to strengthen your understanding of the performance domains",
      "Practice applying the 12 principles of project management in various scenarios",
      "Seek opportunities to apply both predictive and adaptive approaches in your projects",
      "Develop a more holistic view of project value delivery beyond the triple constraint",
      "Focus on outcomes and benefits rather than just outputs and deliverables"
    ];
  }
  
  // Generate personalized recommendations based on domain and principle scores
  generateRecommendations(domainScores, principleScores) {
    const recommendations = [];
    
    // Add recommendations for weakest domains (2 lowest scoring domains)
    const weakDomains = this.getWeakestAreas(domainScores, 2);
    weakDomains.forEach(domain => {
      const domainRecs = this.domainRecommendations[domain];
      if (domainRecs && domainRecs.length > 0) {
        // Add 1-2 recommendations for each weak domain
        const randomIndex = Math.floor(Math.random() * domainRecs.length);
        recommendations.push(domainRecs[randomIndex]);
      }
    });
    
    // Add recommendations for weakest principles (3 lowest scoring principles)
    const weakPrinciples = this.getWeakestAreas(principleScores, 3);
    weakPrinciples.forEach(principle => {
      const principleRecs = this.principleRecommendations[principle];
      if (principleRecs && principleRecs.length > 0) {
        // Add 1 recommendation for each weak principle
        const randomIndex = Math.floor(Math.random() * principleRecs.length);
        recommendations.push(principleRecs[randomIndex]);
      }
    });
    
    // Add 1-2 general recommendations
    const shuffledGeneral = [...this.generalRecommendations].sort(() => 0.5 - Math.random());
    recommendations.push(shuffledGeneral[0]);
    if (Math.random() > 0.5) {
      recommendations.push(shuffledGeneral[1]);
    }
    
    // Ensure we don't have too many recommendations (cap at 7)
    return recommendations.slice(0, 7);
  }
  
  // Get the weakest areas (lowest scoring) from a score object
  getWeakestAreas(scores, count) {
    return Object.entries(scores)
      .sort((a, b) => a[1] - b[1])
      .slice(0, count)
      .map(([area]) => area);
  }
  
  // Generate a specific recommendation for a given domain
  getRecommendationForDomain(domain) {
    const domainRecs = this.domainRecommendations[domain];
    if (domainRecs && domainRecs.length > 0) {
      const randomIndex = Math.floor(Math.random() * domainRecs.length);
      return domainRecs[randomIndex];
    }
    return this.generalRecommendations[0];
  }
  
  // Generate a specific recommendation for a given principle
  getRecommendationForPrinciple(principle) {
    const principleRecs = this.principleRecommendations[principle];
    if (principleRecs && principleRecs.length > 0) {
      const randomIndex = Math.floor(Math.random() * principleRecs.length);
      return principleRecs[randomIndex];
    }
    return this.generalRecommendations[0];
  }
}

// Export the RecommendationEngine class
export default RecommendationEngine;
