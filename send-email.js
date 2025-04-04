const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Validate env variables
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const receiverEmail = process.env.RECEIVER_EMAIL;

if (!email || !password || !receiverEmail) {
  console.error("❌ Missing email credentials in environment variables");
  process.exit(1);
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
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

  // Add screenshots and videos as attachments
  [...screenshotFiles, ...videoFiles].forEach(file => {
    attachments.push({
      filename: path.basename(file),
      path: file,
    });
  });

  const mailOptions = {
    from: `Cypress Bot <${email}>`,
    to: receiverEmail,
    subject: "🚨 Cypress Test Failure Detected",
    html: `
      <h2>Cypress Test Suite Failed</h2>
      <p><strong>Repository:</strong> ${process.env.GITHUB_REPOSITORY}</p>
      <p><strong>Run URL:</strong> <a href="${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}">View Run</a></p>
      ${attachments.length > 0 ? `
        <p><strong>Attachments (${attachments.length}):</strong></p>
        <ul>
          ${attachments.map(file => `<li>${file.filename}</li>`).join("")}
        </ul>
      ` : "<p>No screenshots/videos were captured.</p>"}
    `,
    attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Failed to send email:", error);
      process.exit(1);
    } else {
      console.log("📨 Email sent:", info.response);
    }
  });
};

// Execute
sendFailureEmail();