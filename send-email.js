const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Validate env variables
const requiredVars = ['EMAIL', 'PASSWORD', 'RECEIVER_EMAIL', 'GITHUB_REPOSITORY', 'GITHUB_RUN_ID'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Recursively find files with specific extensions
const findFiles = (dir, extensions) => {
  let results = [];
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(findFiles(fullPath, extensions));
      } else if (extensions.includes(path.extname(file).toLowerCase())) {
        results.push(fullPath);
      }
    });
  } catch (err) {
    console.error(`⚠️ Error reading directory ${dir}:`, err.message);
  }
  return results;
};

// Prepare email with attachments
const sendFailureEmail = () => {
  const attachments = [];
  const screenshotFiles = findFiles("./cypress/screenshots", [".png"]);
  const videoFiles = findFiles("./cypress/videos", [".mp4"]);

  // Add screenshots and videos as attachments (limit to 5MB each)
  [...screenshotFiles, ...videoFiles].forEach(file => {
    const stats = fs.statSync(file);
    if (stats.size < 5 * 1024 * 1024) { // 5MB limit
      attachments.push({
        filename: path.basename(file),
        path: file,
      });
    } else {
      console.log(`ℹ️ Skipping large file: ${file} (${(stats.size/1024/1024).toFixed(2)}MB)`);
    }
  });

  const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`;
  
  const mailOptions = {
    from: `Cypress Bot <${process.env.EMAIL}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: "🚨 Cypress Test Failure Detected",
    html: `
      <h2 style="color: #d73a49;">Cypress Test Failure</h2>
      <p><strong>Repository:</strong> ${process.env.GITHUB_REPOSITORY}</p>
      <p><strong>Workflow Run:</strong> <a href="${runUrl}">${runUrl}</a></p>
      
      <h3>⚠️ Forced Test Failure Detected</h3>
      <p>This email was triggered by the test file <code>forced-failure.cy.js</code>.</p>
      <p><strong>Remove this file after testing notifications!</strong></p>
      
      ${attachments.length > 0 ? `
        <h3>Attachments (${attachments.length})</h3>
        <ul>
          ${attachments.map(file => `<li>${file.filename}</li>`).join("")}
        </ul>
      ` : "<p>No screenshots/videos were captured.</p>"}
      
      <p style="color: #6a737d; font-size: 0.9em;">
        This is an automated message. Please check the workflow run for details.
      </p>
    `,
    attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Failed to send email:", error);
      process.exit(1);
    } else {
      console.log("✅ Email successfully sent:", info.response);
    }
  });
};

sendFailureEmail();