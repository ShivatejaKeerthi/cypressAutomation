const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log("Starting email notification...");

// Debug: Print current working directory
console.log("Current working directory:", process.cwd());

// Verify environment variables
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

// Improved attachment collection with error handling
const getAttachments = () => {
  const attachments = [];
  const artifactPaths = [
    { path: path.join(process.cwd(), 'cypress', 'screenshots'), type: 'image/png' },
    { path: path.join(process.cwd(), 'cypress', 'videos'), type: 'video/mp4' }
  ];

  console.log("Scanning for artifacts...");

  artifactPaths.forEach(({ path: dirPath, type }) => {
    try {
      if (fs.existsSync(dirPath)) {
        console.log(`Checking directory: ${dirPath}`);
        const files = fs.readdirSync(dirPath);
        
        files.forEach(file => {
          const fullPath = path.join(dirPath, file);
          try {
            const stat = fs.statSync(fullPath);
            
            if (stat.isFile() && stat.size < 10 * 1024 * 1024) {
              console.log(`- Adding attachment: ${file}`);
              attachments.push({
                filename: file,
                path: fullPath,
                contentType: type
              });
            }
          } catch (err) {
            console.error(`⚠️ Error processing ${file}:`, err.message);
          }
        });
      }
    } catch (err) {
      console.error(`⚠️ Error accessing ${dirPath}:`, err.message);
    }
  });

  return attachments;
};

// Send email with error handling
try {
  const attachments = getAttachments();
  console.log(`Found ${attachments.length} attachments`);

  const mailOptions = {
    from: `"Cypress Alert" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: '🚨 Cypress Test Failure',
    html: `
      <h2 style="color: #d93025;">Test Failure Detected</h2>
      <p><strong>Repository:</strong> ${process.env.GITHUB_REPOSITORY || 'N/A'}</p>
      <p><strong>Run URL:</strong> <a href="${process.env.GITHUB_RUN_URL}">View Details</a></p>
      <p>${attachments.length} attachments included</p>
    `,
    attachments: attachments
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email failed:', error);
      process.exit(1);
    }
    console.log('✅ Email sent successfully!', info.messageId);
  });
} catch (error) {
  console.error('❌ Fatal error in email script:', error);
  process.exit(1);
}