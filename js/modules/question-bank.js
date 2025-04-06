// Question randomization module for Project Manager Simulator
// This module ensures questions are properly randomized and not repeated

class QuestionBank {
  constructor() {
    this.domains = [
      'Stakeholders',
      'Team',
      'Development Approach & Life Cycle',
      'Planning',
      'Project Work',
      'Delivery',
      'Measurement',
      'Uncertainty'
    ];
    
    this.principles = [
      'Stewardship',
      'Team',
      'Stakeholders',
      'Value',
      'Systems Thinking',
      'Leadership',
      'Tailoring',
      'Quality',
      'Complexity',
      'Risk',
      'Adaptability',
      'Change'
    ];
    
    // Track which questions have been used in the current game
    this.usedQuestions = new Set();
    
    // Track which domains and principles have been used to ensure variety
    this.usedDomains = new Set();
    this.usedPrinciples = new Set();
    
    // Load all question batches
    this.allQuestions = [];
    this.loadQuestions();
  }
  
  // Load questions from all batch files
  async loadQuestions() {
    try {
      // In a real implementation, this would load from JSON files
      // For now, we'll create a large array of questions programmatically
      this.allQuestions = this.generateQuestionBank();
      console.log(`Loaded ${this.allQuestions.length} questions into the question bank`);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  }
  
  // Generate a large bank of questions programmatically
  generateQuestionBank() {
    const questions = [];
    
    // Generate questions for each domain and principle combination
    this.domains.forEach(domain => {
      this.principles.forEach(principle => {
        // Generate multiple questions for each domain/principle pair
        for (let i = 1; i <= 10; i++) {
          questions.push(this.createQuestion(domain, principle, i));
        }
      });
    });
    
    // Add some general PMBOK questions
    for (let i = 1; i <= 40; i++) {
      const randomDomain = this.domains[Math.floor(Math.random() * this.domains.length)];
      const randomPrinciple = this.principles[Math.floor(Math.random() * this.principles.length)];
      questions.push(this.createGeneralQuestion(randomDomain, randomPrinciple, i));
    }
    
    return questions;
  }
  
  // Create a question for a specific domain and principle
  createQuestion(domain, principle, variant) {
    const questionId = `${domain.replace(/\s+/g, '')}_${principle}_${variant}`;
    
    // Create different question templates based on the domain
    let questionText, options, correctAnswer, explanation;
    
    switch (domain) {
      case 'Stakeholders':
        questionText = `According to PMBOK, what's the best approach when dealing with stakeholder conflicts in a project?`;
        options = [
          "Prioritize the most influential stakeholders' needs",
          "Find a compromise that balances all stakeholders' interests",
          "Follow the project plan regardless of stakeholder concerns",
          "Escalate conflicts to senior management immediately"
        ];
        correctAnswer = 1;
        explanation = `The Stakeholders domain emphasizes finding balanced solutions that consider all stakeholders' interests while maintaining project value.`;
        break;
        
      case 'Team':
        questionText = `What does PMBOK recommend for building an effective project team?`;
        options = [
          "Assign tasks based solely on technical skills",
          "Create a competitive environment to drive performance",
          "Foster psychological safety and collaborative culture",
          "Maintain strict hierarchical control"
        ];
        correctAnswer = 2;
        explanation = `The Team domain emphasizes creating a collaborative environment where team members feel psychologically safe to contribute their best work.`;
        break;
        
      case 'Development Approach & Life Cycle':
        questionText = `According to PMBOK, what's the best approach when dealing with Development Approach & Life Cycle?`;
        options = [
          "Focus on technical solutions first",
          "Engage stakeholders collaboratively",
          "Follow the plan exactly as documented",
          "Delegate responsibility to team members"
        ];
        correctAnswer = 1;
        explanation = `The Development Approach & Life Cycle domain emphasizes collaborative engagement with stakeholders to ensure alignment and value delivery.`;
        break;
        
      case 'Planning':
        questionText = `What does PMBOK 7th Edition recommend regarding project planning?`;
        options = [
          "Create detailed plans for the entire project upfront",
          "Focus on adaptive planning that responds to change",
          "Minimize planning to maximize execution time",
          "Delegate planning to specialized team members"
        ];
        correctAnswer = 1;
        explanation = `The Planning domain in PMBOK 7th Edition emphasizes adaptive planning approaches that can respond to change while maintaining focus on outcomes.`;
        break;
        
      case 'Project Work':
        questionText = `How should project work be managed according to PMBOK 7th Edition?`;
        options = [
          "Strictly follow predefined processes",
          "Focus on deliverables rather than activities",
          "Prioritize work that delivers the most value",
          "Assign work based on resource availability"
        ];
        correctAnswer = 2;
        explanation = `The Project Work domain emphasizes prioritizing work that delivers the most value to stakeholders and project outcomes.`;
        break;
        
      case 'Delivery':
        questionText = `What's the key focus of the Delivery domain in PMBOK 7th Edition?`;
        options = [
          "Meeting deadlines at all costs",
          "Delivering exactly what was planned",
          "Delivering value to stakeholders",
          "Minimizing scope changes"
        ];
        correctAnswer = 2;
        explanation = `The Delivery domain focuses on delivering value to stakeholders, which may require adapting to changing conditions and requirements.`;
        break;
        
      case 'Measurement':
        questionText = `According to PMBOK, what should be the primary focus of project measurement?`;
        options = [
          "Tracking schedule and budget variances",
          "Measuring team productivity metrics",
          "Evaluating value delivery and outcomes",
          "Monitoring compliance with processes"
        ];
        correctAnswer = 2;
        explanation = `The Measurement domain emphasizes evaluating value delivery and outcomes rather than just tracking traditional metrics like schedule and budget.`;
        break;
        
      case 'Uncertainty':
        questionText = `How should project managers approach uncertainty according to PMBOK 7th Edition?`;
        options = [
          "Eliminate all uncertainties through detailed planning",
          "Accept uncertainty as inherent and prepare to adapt",
          "Transfer uncertain elements to other stakeholders",
          "Avoid projects with high uncertainty"
        ];
        correctAnswer = 1;
        explanation = `The Uncertainty domain recognizes that uncertainty is inherent in projects and emphasizes preparing to adapt rather than trying to eliminate all uncertainties.`;
        break;
        
      default:
        questionText = `What does PMBOK 7th Edition recommend regarding ${domain}?`;
        options = [
          "Follow traditional waterfall approaches",
          "Adapt practices based on context and needs",
          "Implement standardized processes",
          "Delegate to specialized team members"
        ];
        correctAnswer = 1;
        explanation = `PMBOK 7th Edition emphasizes adapting practices based on context and needs rather than following rigid processes.`;
    }
    
    // Modify question slightly based on principle and variant to ensure uniqueness
    const modifiedQuestion = this.modifyQuestionForVariant(questionText, principle, variant);
    
    return {
      id: questionId,
      domain: domain,
      principle: principle,
      question: modifiedQuestion,
      options: options,
      correctAnswer: correctAnswer,
      explanation: explanation,
      difficulty: Math.floor(Math.random() * 3) + 1 // 1-3 difficulty level
    };
  }
  
  // Create a general PMBOK question
  createGeneralQuestion(domain, principle, variant) {
    const questionId = `general_${variant}`;
    
    // General questions about PMBOK 7th Edition
    const generalQuestions = [
      {
        question: "Which of the following best describes the shift in PMBOK 7th Edition?",
        options: [
          "More detailed process descriptions",
          "From process-based to principle-based approach",
          "Increased focus on technical skills",
          "Elimination of performance domains"
        ],
        correctAnswer: 1,
        explanation: "PMBOK 7th Edition shifted from a process-based to a principle-based approach, focusing on outcomes rather than specific methods."
      },
      {
        question: "What is the primary focus of the Value principle in PMBOK 7th Edition?",
        options: [
          "Maximizing financial return",
          "Delivering outcomes that provide stakeholder benefits",
          "Minimizing project costs",
          "Completing projects on schedule"
        ],
        correctAnswer: 1,
        explanation: "The Value principle focuses on delivering outcomes that provide benefits to stakeholders, not just completing tasks or minimizing costs."
      },
      {
        question: "How does PMBOK 7th Edition view project management approaches?",
        options: [
          "Predictive approaches are always preferred",
          "Agile approaches should replace traditional methods",
          "Different approaches can be tailored to the project context",
          "Hybrid approaches should be avoided"
        ],
        correctAnswer: 2,
        explanation: "PMBOK 7th Edition recognizes that different approaches (predictive, adaptive, hybrid) can be tailored to the specific project context."
      },
      {
        question: "What role do the 12 principles play in PMBOK 7th Edition?",
        options: [
          "They replace the need for performance domains",
          "They provide a foundation for effective project management",
          "They are optional guidelines for advanced practitioners",
          "They are specific to agile methodologies"
        ],
        correctAnswer: 1,
        explanation: "The 12 principles provide a foundation for effective project management regardless of methodology, domain, or approach."
      }
    ];
    
    // Select a question based on variant
    const questionTemplate = generalQuestions[variant % generalQuestions.length];
    
    // Modify the question slightly to create more variety
    const modifiedQuestion = this.modifyQuestionForVariant(questionTemplate.question, principle, variant);
    
    return {
      id: questionId,
      domain: domain,
      principle: principle,
      question: modifiedQuestion,
      options: questionTemplate.options,
      correctAnswer: questionTemplate.correctAnswer,
      explanation: questionTemplate.explanation,
      difficulty: Math.floor(Math.random() * 3) + 1 // 1-3 difficulty level
    };
  }
  
  // Modify a question based on principle and variant to create more unique questions
  modifyQuestionForVariant(questionText, principle, variant) {
    // Add principle-specific context to the question
    const principleContexts = {
      'Stewardship': "When considering project stewardship, ",
      'Team': "From a team-focused perspective, ",
      'Stakeholders': "When prioritizing stakeholder needs, ",
      'Value': "To maximize project value, ",
      'Systems Thinking': "Using systems thinking, ",
      'Leadership': "As a project leader, ",
      'Tailoring': "When tailoring your approach, ",
      'Quality': "To ensure quality outcomes, ",
      'Complexity': "In complex project environments, ",
      'Risk': "When managing project risks, ",
      'Adaptability': "To maintain adaptability, ",
      'Change': "When dealing with change, "
    };
    
    // Only modify some questions to maintain variety
    if (variant % 3 === 0) {
      return principleContexts[principle] + questionText.toLowerCase();
    }
    
    return questionText;
  }
  
  // Get a random question that hasn't been used yet
  getRandomQuestion() {
    // If we've used all questions, reset the tracking
    if (this.usedQuestions.size >= this.allQuestions.length * 0.8) {
      console.log("Resetting question bank as 80% of questions have been used");
      this.usedQuestions.clear();
      this.usedDomains.clear();
      this.usedPrinciples.clear();
    }
    
    // First, try to get a question from a domain and principle that hasn't been used recently
    let availableQuestions = this.allQuestions.filter(q => 
      !this.usedQuestions.has(q.id) && 
      !this.usedDomains.has(q.domain) && 
      !this.usedPrinciples.has(q.principle)
    );
    
    // If no questions match those criteria, try just unused questions
    if (availableQuestions.length === 0) {
      availableQuestions = this.allQuestions.filter(q => !this.usedQuestions.has(q.id));
      
      // If still no questions, reset and try again
      if (availableQuestions.length === 0) {
        this.usedQuestions.clear();
        availableQuestions = this.allQuestions;
      }
    }
    
    // Select a random question from available ones
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    // Mark this question, domain, and principle as used
    this.usedQuestions.add(selectedQuestion.id);
    this.usedDomains.add(selectedQuestion.domain);
    this.usedPrinciples.add(selectedQuestion.principle);
    
    // If we've used too many domains or principles, reset those trackers
    if (this.usedDomains.size >= this.domains.length * 0.7) {
      this.usedDomains.clear();
    }
    if (this.usedPrinciples.size >= this.principles.length * 0.7) {
      this.usedPrinciples.clear();
    }
    
    return selectedQuestion;
  }
  
  // Get a question related to a specific domain
  getQuestionForDomain(domain) {
    // Filter questions by domain and not used yet
    let availableQuestions = this.allQuestions.filter(q => 
      q.domain === domain && 
      !this.usedQuestions.has(q.id) &&
      !this.usedPrinciples.has(q.principle)
    );
    
    // If no questions match, try just by domain
    if (availableQuestions.length === 0) {
      availableQuestions = this.allQuestions.filter(q => 
        q.domain === domain && 
        !this.usedQuestions.has(q.id)
      );
      
      // If still no questions, use any question from that domain
      if (availableQuestions.length === 0) {
        availableQuestions = this.allQuestions.filter(q => q.domain === domain);
      }
    }
    
    // Select a random question from available ones
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    // Mark this question, domain, and principle as used
    this.usedQuestions.add(selectedQuestion.id);
    this.usedDomains.add(selectedQuestion.domain);
    this.usedPrinciples.add(selectedQuestion.principle);
    
    return selectedQuestion;
  }
  
  // Reset the question bank for a new game
  resetQuestionBank() {
    this.usedQuestions.clear();
    this.usedDomains.clear();
    this.usedPrinciples.clear();
    console.log("Question bank has been reset for a new game");
  }
}

// Export the QuestionBank class
export default QuestionBank;
