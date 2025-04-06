// Placeholder images for character avatars and day visuals
// These will be simple colored rectangles with text for development purposes

// Create the assets/images directory if it doesn't exist
const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'assets', 'images');

// Ensure the directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to create a simple placeholder image
function createPlaceholderImage(filename, text, bgColor) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 200, 200);
  
  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 100, 100);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  
  console.log(`Created placeholder image: ${filename}`);
}

// Create character avatars
createPlaceholderImage('pm_male_default.png', 'PM (M)', '#3498db');
createPlaceholderImage('pm_female_default.png', 'PM (F)', '#9b59b6');
createPlaceholderImage('pm_neutral_default.png', 'PM (N)', '#2ecc71');

createPlaceholderImage('customer_corporate_default.png', 'Client (Corp)', '#34495e');
createPlaceholderImage('customer_academic_default.png', 'Client (Acad)', '#16a085');
createPlaceholderImage('customer_startup_default.png', 'Client (Start)', '#e74c3c');

createPlaceholderImage('team_developer_default.png', 'Developer', '#3498db');
createPlaceholderImage('team_designer_default.png', 'Designer', '#9b59b6');
createPlaceholderImage('team_tester_default.png', 'Tester', '#2ecc71');
createPlaceholderImage('team_analyst_default.png', 'Analyst', '#f39c12');
createPlaceholderImage('team_devops_default.png', 'DevOps', '#1abc9c');

// Create day-specific visuals
createPlaceholderImage('day1_kickoff.png', 'Day 1: Kickoff', '#3498db');
createPlaceholderImage('day2_planning.png', 'Day 2: Planning', '#2ecc71');
createPlaceholderImage('day3_development.png', 'Day 3: Development', '#9b59b6');
createPlaceholderImage('day4_meeting.png', 'Day 4: Meeting', '#f39c12');
createPlaceholderImage('day5_crisis.png', 'Day 5: Crisis', '#e74c3c');
createPlaceholderImage('day6_review.png', 'Day 6: Review', '#1abc9c');
createPlaceholderImage('day7_delivery.png', 'Day 7: Delivery', '#34495e');
createPlaceholderImage('day8_feedback.png', 'Day 8: Feedback', '#16a085');
createPlaceholderImage('day9_adjustment.png', 'Day 9: Adjustment', '#8e44ad');
createPlaceholderImage('day10_completion.png', 'Day 10: Completion', '#2c3e50');

console.log('All placeholder images created successfully!');
