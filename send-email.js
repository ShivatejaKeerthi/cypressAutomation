const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Validate env vars
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'RECIPIENT_EMAIL', 'GITHUB_RUN_URL'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Configure transporter
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

// Get failure artifacts
const getAttachments = () => {
  const attachments = [];
  const artifactDirs = [
    { path: './cypress/screenshots', type: 'image/png' },
    { path: './cypress/videos', type: 'video/mp4' }
  ];

  artifactDirs.forEach(({ path: dirPath, type }) => {
    if (fs.existsSync(dirPath)) {
      fs.readdirSync(dirPath).forEach(file => {
        const filePath = `${dirPath}/${file}`;
        if (fs.statSync(filePath).size < 10 * 1024 * 1024) { // 10MB limit
          attachments.push({
            filename: file,
            path: filePath,
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
  from: `"Cypress Bot" <${process.env.EMAIL_USER}>`,
  to: process.env.RECIPIENT_EMAIL,
  subject: '🚨 Cypress Test Failure Detected',
  html: `
    <h2 style="color: #dc3545;">Cypress Test Failure</h2>
    <p><strong>Repository:</strong> ${process.env.GITHUB_REPOSITORY || 'N/A'}</p>
    <p><strong>Run URL:</strong> <a href="${process.env.GITHUB_RUN_URL}">View Failed Run</a></p>
    
    <h3>Failure Details</h3>
    <p>The automated test suite encountered failures. See attached artifacts.</p>
    
    ${process.env.TEST_FAILED === 'forced' ? `
    <div style="background: #fff3cd; padding: 10px; border-radius: 5px;">
      <p>⚠️ <strong>This failure was intentionally triggered</strong> by <code>forced-failure.cy.js</code></p>
    </div>
    ` : ''}
  `,
  attachments: getAttachments()
}, (error, info) => {
  if (error) {
    console.error('❌ Email failed:', error);
    process.exit(1);
  }
  console.log('✅ Email sent:', info.messageId);
});