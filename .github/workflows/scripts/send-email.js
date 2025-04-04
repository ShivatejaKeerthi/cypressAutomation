const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log("Starting email notification...");

// Verify required environment variables
const requiredVars = ['EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL', 'GITHUB_RUN_URL'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Collect attachments
const getAttachments = () => {
  const attachments = [];
  const artifactPaths = [
    { path: './cypress/screenshots', type: 'image/png' },
    { path: './cypress/videos', type: 'video/mp4' }
  ];

  artifactPaths.forEach(({ path: dirPath, type }) => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).size < 10 * 1024 * 1024) { // 10MB limit
          attachments.push({
            filename: file,
            path: fullPath,
            contentType: type
          });
        }
      });
    }
  });
  return attachments;
};

// Send email
transporter.sendMail({
  from: `"Cypress Alert" <${process.env.EMAIL_USER}>`,
  to: process.env.RECIPIENT_EMAIL,
  subject: '🚨 Cypress Test Failure',
  html: `
    <h2 style="color: #d93025;">Test Failure Detected</h2>
    <p><strong>Repository:</strong> ${process.env.GITHUB_REPOSITORY || 'N/A'}</p>
    <p><strong>Run URL:</strong> <a href="${process.env.GITHUB_RUN_URL}">View Details</a></p>
    <p>${getAttachments().length} attachments included</p>
  `,
  attachments: getAttachments()
}, (error, info) => {
  if (error) {
    console.error('❌ Email failed:', error);
    process.exit(1);
  }
  console.log('✅ Email sent successfully!');
});