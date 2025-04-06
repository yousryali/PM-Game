// Scenarios for Project Manager Simulator
// Contains day-specific scenarios, decisions, and impacts

const scenarios = [
  {
    day: 1,
    domain: "Planning",
    text: "Welcome to your first day as Project Manager! The client just approved the project and your team is eager to start. How do you want to kick things off?",
    decisions: [
      {
        text: "Jump right into development to show quick progress",
        impact: { timeline: -10, budget: -5, morale: 5 },
        explanation: "Starting development without proper planning often leads to rework and timeline issues."
      },
      {
        text: "Hold a detailed planning session with the team and stakeholders",
        impact: { timeline: 5, budget: 5, morale: 0 },
        explanation: "Taking time for proper planning helps prevent issues later, though it may not excite the team initially."
      },
      {
        text: "Have a quick kickoff meeting and assign initial tasks",
        impact: { timeline: 0, budget: 0, morale: 10 },
        explanation: "This balanced approach gets things moving while ensuring some initial planning."
      }
    ]
  },
  {
    day: 2,
    domain: "Stakeholders",
    text: "The client calls and says they've been thinking overnight and want to 'make a few small changes' to the requirements. What do you do?",
    decisions: [
      {
        text: "Agree to all changes to keep the client happy",
        impact: { timeline: -15, budget: -15, morale: -5 },
        explanation: "Accepting changes without assessment often leads to scope creep and project issues."
      },
      {
        text: "Politely explain that changes require a formal change request and impact assessment",
        impact: { timeline: 5, budget: 5, morale: -5 },
        explanation: "Following proper change management processes protects the project but might frustrate the client initially."
      },
      {
        text: "Listen to the changes, assess which are truly small, and negotiate on the others",
        impact: { timeline: -5, budget: -5, morale: 5 },
        explanation: "This balanced approach shows flexibility while still protecting the project from major scope creep."
      }
    ]
  },
  {
    day: 3,
    domain: "Team",
    text: "Your lead developer and designer are arguing about the technical approach. The disagreement is getting heated and affecting the team. What's your move?",
    decisions: [
      {
        text: "Make the decision for them and tell them to move on",
        impact: { timeline: 5, budget: 0, morale: -15 },
        explanation: "This resolves the immediate issue but damages team morale and ownership."
      },
      {
        text: "Facilitate a problem-solving session to find a collaborative solution",
        impact: { timeline: -5, budget: 0, morale: 10 },
        explanation: "Taking time for collaborative problem-solving builds team cohesion and often leads to better solutions."
      },
      {
        text: "Ask them to each present their case and then decide based on merit",
        impact: { timeline: 0, budget: 0, morale: 0 },
        explanation: "This structured approach is fair but doesn't fully leverage team collaboration."
      }
    ]
  },
  {
    day: 4,
    domain: "Uncertainty & Ambiguity",
    text: "A critical third-party API you're integrating with announces they're deprecating the version you planned to use. The new version has different features. What now?",
    decisions: [
      {
        text: "Stick with the old API version for now and deal with it after the project",
        impact: { timeline: 10, budget: 5, morale: -5 },
        explanation: "This avoids immediate disruption but creates technical debt and future problems."
      },
      {
        text: "Immediately pivot to the new API version despite the changes required",
        impact: { timeline: -15, budget: -10, morale: -5 },
        explanation: "This forward-looking decision prevents future issues but causes significant immediate disruption."
      },
      {
        text: "Evaluate the impact, develop a transition plan, and negotiate timeline adjustments",
        impact: { timeline: -5, budget: -5, morale: 5 },
        explanation: "This balanced approach addresses the issue while managing the impacts."
      }
    ]
  },
  {
    day: 5,
    domain: "Project Work",
    text: "You're halfway through the project and running slightly behind schedule. The team is starting to show signs of stress. What's your approach?",
    decisions: [
      {
        text: "Mandate overtime to catch up on the schedule",
        impact: { timeline: 10, budget: -10, morale: -20 },
        explanation: "Forced overtime often leads to burnout and quality issues despite short-term productivity gains."
      },
      {
        text: "Reprioritize requirements and negotiate deadline extensions",
        impact: { timeline: -5, budget: 5, morale: 5 },
        explanation: "This pragmatic approach balances project constraints with team wellbeing."
      },
      {
        text: "Bring in additional resources to help the team catch up",
        impact: { timeline: 5, budget: -15, morale: 0 },
        explanation: "Adding resources helps with workload but increases costs and doesn't always speed things up immediately."
      }
    ]
  },
  {
    day: 6,
    domain: "Quality",
    text: "Quality testing reveals some non-critical bugs in the current build. The deadline for the next milestone is tomorrow. What do you decide?",
    decisions: [
      {
        text: "Fix all bugs before proceeding, even if it delays the milestone",
        impact: { timeline: -10, budget: -5, morale: 0 },
        explanation: "Prioritizing quality over schedule demonstrates commitment to excellence but causes delays."
      },
      {
        text: "Deliver on schedule and add the bugs to the backlog for later",
        impact: { timeline: 5, budget: 0, morale: -5 },
        explanation: "Meeting deadlines at the expense of quality can lead to technical debt and stakeholder dissatisfaction."
      },
      {
        text: "Fix critical bugs, document the rest, and discuss priorities with stakeholders",
        impact: { timeline: 0, budget: 0, morale: 5 },
        explanation: "This balanced approach maintains quality standards while being pragmatic about deadlines."
      }
    ]
  },
  {
    day: 7,
    domain: "Development Approach & Life Cycle",
    text: "The client sees a demo and is excited but wants to make significant changes to a feature that's almost complete. What's your approach?",
    decisions: [
      {
        text: "Explain that changes at this stage aren't possible due to the development approach",
        impact: { timeline: 5, budget: 5, morale: -10 },
        explanation: "Rigidly following the plan protects the schedule but frustrates stakeholders and misses improvement opportunities."
      },
      {
        text: "Accommodate all requested changes regardless of impact",
        impact: { timeline: -15, budget: -15, morale: -5 },
        explanation: "Accepting all changes without assessment can derail the project despite initially pleasing the client."
      },
      {
        text: "Evaluate the changes, implement what adds value, and defer others to a future iteration",
        impact: { timeline: -5, budget: -5, morale: 10 },
        explanation: "This adaptive approach balances responsiveness with project constraints."
      }
    ]
  },
  {
    day: 8,
    domain: "Performance",
    text: "Your performance metrics show good technical progress but stakeholder satisfaction is declining. What action do you take?",
    decisions: [
      {
        text: "Focus on improving technical metrics further since they're objective",
        impact: { timeline: 0, budget: 0, morale: -5 },
        explanation: "Ignoring stakeholder satisfaction in favor of technical metrics often leads to project failure despite 'successful' delivery."
      },
      {
        text: "Increase communication frequency and realign with stakeholder expectations",
        impact: { timeline: -5, budget: 0, morale: 10 },
        explanation: "Proactively addressing stakeholder concerns often improves project outcomes and team morale."
      },
      {
        text: "Add more detailed reporting to provide stakeholders with more information",
        impact: { timeline: -5, budget: -5, morale: 0 },
        explanation: "More reporting without addressing underlying issues rarely improves stakeholder satisfaction."
      }
    ]
  },
  {
    day: 9,
    domain: "Delivery",
    text: "You're preparing for final delivery and discover that one module won't be ready in time. What's your delivery strategy?",
    decisions: [
      {
        text: "Delay the entire delivery until everything is complete",
        impact: { timeline: -15, budget: -10, morale: -5 },
        explanation: "Delaying delivery affects stakeholder trust and project metrics but ensures complete functionality."
      },
      {
        text: "Deliver on schedule with reduced functionality and be transparent about limitations",
        impact: { timeline: 5, budget: 0, morale: 0 },
        explanation: "This approach maintains the schedule while being honest about limitations."
      },
      {
        text: "Work overtime to try completing everything for the deadline",
        impact: { timeline: 0, budget: -10, morale: -15 },
        explanation: "Last-minute rushes often lead to quality issues and team burnout despite heroic efforts."
      }
    ]
  },
  {
    day: 10,
    domain: "Stakeholders",
    text: "The project is complete! The client is reviewing the final delivery and has mixed feedback. Some features exceed expectations while others don't quite match what they envisioned. How do you conclude the project?",
    decisions: [
      {
        text: "Defend all implementation decisions and explain why the client's vision was impractical",
        impact: { timeline: 0, budget: 0, morale: -10 },
        explanation: "Defensive responses damage relationships even when technically correct."
      },
      {
        text: "Acknowledge feedback, celebrate successes, and propose a follow-up phase for improvements",
        impact: { timeline: 0, budget: 5, morale: 10 },
        explanation: "This balanced approach acknowledges reality while maintaining positive relationships and future opportunities."
      },
      {
        text: "Offer to fix everything the client isn't happy with at no additional cost",
        impact: { timeline: -10, budget: -15, morale: -5 },
        explanation: "Promising free work sets poor expectations and impacts team morale and project profitability."
      }
    ]
  }
];

export default scenarios;
