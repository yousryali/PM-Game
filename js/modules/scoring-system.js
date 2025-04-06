// Scoring System Module for Project Manager Simulator
// This module calculates scores based on PMBOK 7th Edition domains and principles

class ScoringSystem {
  constructor() {
    // Initialize domain weights (total = 100)
    this.domainWeights = {
      'Stakeholders': 15,
      'Team': 15,
      'Development Approach & Life Cycle': 12,
      'Planning': 12,
      'Project Work': 12,
      'Delivery': 12,
      'Measurement': 10,
      'Uncertainty': 12
    };
    
    // Initialize principle weights (total = 100)
    this.principleWeights = {
      'Stewardship': 8,
      'Team': 10,
      'Stakeholders': 10,
      'Value': 10,
      'Systems Thinking': 8,
      'Leadership': 8,
      'Tailoring': 8,
      'Quality': 8,
      'Complexity': 8,
      'Risk': 8,
      'Adaptability': 8,
      'Change': 6
    };
    
    // Performance levels and their descriptions
    this.performanceLevels = {
      'Expert': {
        minScore: 90,
        description: 'You demonstrate exceptional understanding of PMBOK principles and domains. You consistently make optimal decisions that balance project constraints while delivering maximum value.'
      },
      'Proficient': {
        minScore: 75,
        description: 'You show strong knowledge of project management best practices. Your decisions generally align with PMBOK guidance, though there\'s still room for improvement in some areas.'
      },
      'Competent': {
        minScore: 60,
        description: 'You have a solid foundation in project management concepts. While you make many good decisions, you could benefit from deeper understanding of certain PMBOK domains and principles.'
      },
      'Developing': {
        minScore: 40,
        description: 'You demonstrate basic project management knowledge but often miss opportunities to apply PMBOK best practices. Focus on improving your understanding of core principles.'
      },
      'Novice': {
        minScore: 0,
        description: 'You\'re still developing your project management skills. Many of your decisions don\'t align with PMBOK guidance. Consider studying the PMBOK Guide to strengthen your knowledge base.'
      }
    };
  }
  
  // Update scores based on question answer
  updateScores(domainScores, principleScores, question, selectedAnswerIndex) {
    const isCorrect = selectedAnswerIndex === question.correctAnswer;
    const domain = question.domain;
    const principle = question.principle;
    
    // Create copies of the score objects to avoid direct mutation
    const updatedDomainScores = { ...domainScores };
    const updatedPrincipleScores = { ...principleScores };
    
    // Calculate score adjustments based on answer correctness
    if (isCorrect) {
      // Correct answer: increase scores
      updatedDomainScores[domain] = Math.min(100, updatedDomainScores[domain] + 5);
      updatedPrincipleScores[principle] = Math.min(100, updatedPrincipleScores[principle] + 5);
    } else {
      // Incorrect answer: decrease scores
      updatedDomainScores[domain] = Math.max(0, updatedDomainScores[domain] - 5);
      updatedPrincipleScores[principle] = Math.max(0, updatedPrincipleScores[principle] - 5);
    }
    
    return { domainScores: updatedDomainScores, principleScores: updatedPrincipleScores };
  }
  
  // Calculate final score based on domain and principle scores
  calculateFinalScore(domainScores, principleScores) {
    // Calculate weighted domain score
    let domainScore = 0;
    let totalDomainWeight = 0;
    
    for (const [domain, weight] of Object.entries(this.domainWeights)) {
      if (domainScores[domain] !== undefined) {
        domainScore += domainScores[domain] * weight;
        totalDomainWeight += weight;
      }
    }
    
    // Normalize domain score
    domainScore = totalDomainWeight > 0 ? domainScore / totalDomainWeight : 0;
    
    // Calculate weighted principle score
    let principleScore = 0;
    let totalPrincipleWeight = 0;
    
    for (const [principle, weight] of Object.entries(this.principleWeights)) {
      if (principleScores[principle] !== undefined) {
        principleScore += principleScores[principle] * weight;
        totalPrincipleWeight += weight;
      }
    }
    
    // Normalize principle score
    principleScore = totalPrincipleWeight > 0 ? principleScore / totalPrincipleWeight : 0;
    
    // Final score is weighted average of domain and principle scores
    // Domains are weighted slightly higher (60%) than principles (40%)
    const finalScore = Math.round((domainScore * 0.6) + (principleScore * 0.4));
    
    return finalScore;
  }
  
  // Get performance level based on final score
  getPerformanceLevel(finalScore) {
    for (const [level, data] of Object.entries(this.performanceLevels)) {
      if (finalScore >= data.minScore) {
        return {
          level: level,
          description: data.description
        };
      }
    }
    
    // Default to Novice if no match (should never happen)
    return {
      level: 'Novice',
      description: this.performanceLevels['Novice'].description
    };
  }
  
  // Get domain strengths (top 2 highest scoring domains)
  getDomainStrengths(domainScores) {
    const sortedDomains = Object.entries(domainScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([domain, score]) => ({ domain, score }));
    
    return sortedDomains;
  }
  
  // Get domain weaknesses (bottom 2 lowest scoring domains)
  getDomainWeaknesses(domainScores) {
    const sortedDomains = Object.entries(domainScores)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 2)
      .map(([domain, score]) => ({ domain, score }));
    
    return sortedDomains;
  }
  
  // Get principle strengths (top 3 highest scoring principles)
  getPrincipleStrengths(principleScores) {
    const sortedPrinciples = Object.entries(principleScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([principle, score]) => ({ principle, score }));
    
    return sortedPrinciples;
  }
  
  // Get principle weaknesses (bottom 3 lowest scoring principles)
  getPrincipleWeaknesses(principleScores) {
    const sortedPrinciples = Object.entries(principleScores)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3)
      .map(([principle, score]) => ({ principle, score }));
    
    return sortedPrinciples;
  }
}

// Export the ScoringSystem class
export default ScoringSystem;
