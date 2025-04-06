// Character image generator for Project Manager Simulator
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const characterDir = path.join(__dirname, 'assets', 'images', 'characters');
if (!fs.existsSync(characterDir)) {
  fs.mkdirSync(characterDir, { recursive: true });
}

// Function to create a simple cartoon avatar
function createAvatar(name, role, color, outputPath) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Background circle
  ctx.beginPath();
  ctx.arc(100, 100, 90, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  
  // Border
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#333';
  ctx.stroke();
  
  // Face features based on role
  if (role === 'pm_male') {
    // Male PM face
    drawMalePM(ctx);
  } else if (role === 'pm_female') {
    // Female PM face
    drawFemalePM(ctx);
  } else if (role === 'client_corporate') {
    // Corporate client face
    drawCorporateClient(ctx);
  } else if (role === 'client_academic') {
    // Academic client face
    drawAcademicClient(ctx);
  } else if (role === 'client_startup') {
    // Startup client face
    drawStartupClient(ctx);
  } else if (role.includes('developer')) {
    // Developer face
    drawDeveloper(ctx);
  } else if (role.includes('designer')) {
    // Designer face
    drawDesigner(ctx);
  } else if (role.includes('tester')) {
    // Tester face
    drawTester(ctx);
  } else if (role.includes('analyst')) {
    // Analyst face
    drawAnalyst(ctx);
  } else if (role.includes('devops')) {
    // DevOps face
    drawDevOps(ctx);
  }
  
  // Add name text at the bottom
  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText(name, 100, 180);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Created avatar for ${name} (${role}) at ${outputPath}`);
}

// Draw functions for different character types
function drawMalePM(ctx) {
  // Hair
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(100, 70, 40, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 10, 0, Math.PI * 2);
  ctx.arc(120, 90, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 5, 0, Math.PI * 2);
  ctx.arc(120, 90, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(100, 110, 20, 0, Math.PI);
  ctx.stroke();
  
  // Glasses
  ctx.beginPath();
  ctx.rect(70, 85, 20, 15);
  ctx.rect(110, 85, 20, 15);
  ctx.stroke();
  
  // Tie
  ctx.fillStyle = '#f00';
  ctx.beginPath();
  ctx.moveTo(90, 130);
  ctx.lineTo(110, 130);
  ctx.lineTo(100, 150);
  ctx.closePath();
  ctx.fill();
}

function drawFemalePM(ctx) {
  // Hair
  ctx.fillStyle = '#a52a2a';
  ctx.beginPath();
  ctx.arc(100, 70, 45, 0, Math.PI * 2);
  ctx.fill();
  
  // Face shape (to cover part of the hair)
  ctx.fillStyle = ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(85, 90, 8, 0, Math.PI * 2);
  ctx.arc(115, 90, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#4169e1';
  ctx.beginPath();
  ctx.arc(85, 90, 4, 0, Math.PI * 2);
  ctx.arc(115, 90, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(100, 110, 15, 0, Math.PI);
  ctx.stroke();
  
  // Earrings
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(60, 95, 5, 0, Math.PI * 2);
  ctx.arc(140, 95, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawCorporateClient(ctx) {
  // Hair
  ctx.fillStyle = '#555';
  ctx.beginPath();
  ctx.arc(100, 70, 35, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 10, 0, Math.PI * 2);
  ctx.arc(120, 90, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 5, 0, Math.PI * 2);
  ctx.arc(120, 90, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Serious expression
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(120, 120);
  ctx.stroke();
  
  // Suit
  ctx.fillStyle = '#000080';
  ctx.beginPath();
  ctx.rect(70, 130, 60, 20);
  ctx.fill();
  
  // Tie
  ctx.fillStyle = '#800000';
  ctx.beginPath();
  ctx.moveTo(95, 130);
  ctx.lineTo(105, 130);
  ctx.lineTo(100, 150);
  ctx.closePath();
  ctx.fill();
}

function drawAcademicClient(ctx) {
  // Hair
  ctx.fillStyle = '#ddd';
  ctx.beginPath();
  ctx.arc(100, 70, 40, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 10, 0, Math.PI * 2);
  ctx.arc(120, 90, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 5, 0, Math.PI * 2);
  ctx.arc(120, 90, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Glasses
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(70, 85, 20, 15);
  ctx.rect(110, 85, 20, 15);
  ctx.moveTo(90, 92);
  ctx.lineTo(110, 92);
  ctx.stroke();
  
  // Beard
  ctx.beginPath();
  ctx.arc(100, 120, 20, 0, Math.PI);
  ctx.fill();
  
  // Academic cap
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.rect(70, 50, 60, 10);
  ctx.fill();
  ctx.fillRect(90, 30, 20, 20);
}

function drawStartupClient(ctx) {
  // Hair
  ctx.fillStyle = '#8B4513';
  ctx.beginPath();
  ctx.arc(100, 70, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Face shape (to cover part of the hair)
  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(85, 90, 8, 0, Math.PI * 2);
  ctx.arc(115, 90, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#006400';
  ctx.beginPath();
  ctx.arc(85, 90, 4, 0, Math.PI * 2);
  ctx.arc(115, 90, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(100, 110, 20, 0, Math.PI);
  ctx.stroke();
  
  // Casual clothes
  ctx.fillStyle = '#32CD32';
  ctx.beginPath();
  ctx.rect(80, 130, 40, 20);
  ctx.fill();
}

function drawDeveloper(ctx) {
  // Hair
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(100, 70, 35, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 8, 0, Math.PI * 2);
  ctx.arc(120, 90, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 4, 0, Math.PI * 2);
  ctx.arc(120, 90, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Glasses
  ctx.beginPath();
  ctx.rect(72, 85, 16, 12);
  ctx.rect(112, 85, 16, 12);
  ctx.moveTo(88, 91);
  ctx.lineTo(112, 91);
  ctx.stroke();
  
  // Smile
  ctx.beginPath();
  ctx.arc(100, 110, 15, 0, Math.PI);
  ctx.stroke();
  
  // T-shirt
  ctx.fillStyle = '#4682B4';
  ctx.beginPath();
  ctx.rect(80, 130, 40, 20);
  ctx.fill();
  
  // Code symbol
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 15px Arial';
  ctx.fillText('{ }', 100, 145);
}

function drawDesigner(ctx) {
  // Hair
  ctx.fillStyle = '#FF69B4';
  ctx.beginPath();
  ctx.arc(100, 70, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Face shape (to cover part of the hair)
  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(85, 90, 8, 0, Math.PI * 2);
  ctx.arc(115, 90, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#9932CC';
  ctx.beginPath();
  ctx.arc(85, 90, 4, 0, Math.PI * 2);
  ctx.arc(115, 90, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Smile
  ctx.beginPath();
  ctx.arc(100, 110, 15, 0, Math.PI);
  ctx.stroke();
  
  // Artsy clothes
  ctx.fillStyle = '#9370DB';
  ctx.beginPath();
  ctx.rect(80, 130, 40, 20);
  ctx.fill();
  
  // Paintbrush
  ctx.fillStyle = '#8B4513';
  ctx.beginPath();
  ctx.rect(110, 120, 5, 30);
  ctx.fill();
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(112, 120, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTester(ctx) {
  // Hair
  ctx.fillStyle = '#A0522D';
  ctx.beginPath();
  ctx.arc(100, 70, 35, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 10, 0, Math.PI * 2);
  ctx.arc(120, 90, 10, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 5, 0, Math.PI * 2);
  ctx.arc(120, 90, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Magnifying glass
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(130, 120, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(120, 130);
  ctx.lineTo(110, 140);
  ctx.stroke();
  
  // Smile
  ctx.beginPath();
  ctx.arc(100, 110, 15, 0, Math.PI);
  ctx.stroke();
  
  // Shirt
  ctx.fillStyle = '#008080';
  ctx.beginPath();
  ctx.rect(80, 130, 40, 20);
  ctx.fill();
}

function drawAnalyst(ctx) {
  // Hair
  ctx.fillStyle = '#8B4513';
  ctx.beginPath();
  ctx.arc(100, 70, 35, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 8, 0, Math.PI * 2);
  ctx.arc(120, 90, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 4, 0, Math.PI * 2);
  ctx.arc(120, 90, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Glasses
  ctx.beginPath();
  ctx.rect(72, 85, 16, 12);
  ctx.rect(112, 85, 16, 12);
  ctx.moveTo(88, 91);
  ctx.lineTo(112, 91);
  ctx.stroke();
  
  // Thoughtful expression
  ctx.beginPath();
  ctx.moveTo(90, 115);
  ctx.lineTo(110, 115);
  ctx.stroke();
  
  // Shirt
  ctx.fillStyle = '#708090';
  ctx.beginPath();
  ctx.rect(80, 130, 40, 20);
  ctx.fill();
  
  // Chart symbol
  ctx.strokeStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(90, 145);
  ctx.lineTo(95, 135);
  ctx.lineTo(100, 140);
  ctx.lineTo(105, 130);
  ctx.lineTo(110, 145);
  ctx.stroke();
}

function drawDevOps(ctx) {
  // Hair
  ctx.fillStyle = '#696969';
  ctx.beginPath();
  ctx.arc(100, 70, 35, 0, Math.PI, true);
  ctx.fill();
  
  // Eyes
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(80, 90, 8, 0, Math.PI * 2);
  ctx.arc(120, 90, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Pupils
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(80, 90, 4, 0, Math.PI * 2);
  ctx.arc(120, 90, 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Determined expression
  ctx.beginPath();
  ctx.arc(100, 115, 10, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();
  
  // Shirt
  ctx.fillStyle = '#2F4F4F';
  ctx.beginPath();
  ctx.rect(80, 130, 40, 20);
  ctx.fill();
  
  // Infinity symbol (for continuous integration/deployment)
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(90, 140);
  ctx.bezierCurveTo(90, 135, 95, 135, 95, 140);
  ctx.bezierCurveTo(95, 145, 100, 145, 100, 140);
  ctx.bezierCurveTo(100, 135, 105, 135, 105, 140);
  ctx.bezierCurveTo(105, 145, 110, 145, 110, 140);
  ctx.stroke();
}

// Create project manager avatars
createAvatar('Alex', 'pm_male', '#87CEEB', path.join(characterDir, 'pm_male.png'));
createAvatar('Sarah', 'pm_female', '#E6E6FA', path.join(characterDir, 'pm_female.png'));

// Create client avatars
createAvatar('Mr. Thompson', 'client_corporate', '#B0C4DE', path.join(characterDir, 'client_corporate.png'));
createAvatar('Dr. Rivera', 'client_academic', '#E6E6FA', path.join(characterDir, 'client_academic.png'));
createAvatar('Ms. Chen', 'client_startup', '#FFB6C1', path.join(characterDir, 'client_startup.png'));

// Create team member avatars
createAvatar('Emma', 'developer_1', '#ADD8E6', path.join(characterDir, 'team_developer_1.png'));
createAvatar('Noah', 'developer_2', '#90EE90', path.join(characterDir, 'team_developer_2.png'));
createAvatar('Olivia', 'designer_1', '#FFB6C1', path.join(characterDir, 'team_designer_1.png'));
createAvatar('Liam', 'tester_1', '#FFA07A', path.join(characterDir, 'team_tester_1.png'));
createAvatar('Sophia', 'analyst_1', '#D8BFD8', path.join(characterDir, 'team_analyst_1.png'));
createAvatar('William', 'devops_1', '#A9A9A9', path.join(characterDir, 'team_devops_1.png'));
createAvatar('Ava', 'designer_2', '#DDA0DD', path.join(characterDir, 'team_designer_2.png'));
createAvatar('James', 'developer_3', '#87CEFA', path.join(characterDir, 'team_developer_3.png'));

console.log('All character avatars have been created successfully!');
