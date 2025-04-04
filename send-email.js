const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const receiverEmail = process.env.RECEIVER_EMAIL;

// Validate environment variables
if (!email || !password || !receiverEmail) {
  console.error("Missing required environment variables");
  process.exit(1);
}

// Email transport setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

// Recursively find all screenshot and video files
const findFiles = (dir, extensions) => {
  let results = [];
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
  
  return results;
};

// Prepare attachments
const attachments = [];

try {
  // Find all PNG screenshots
  if (fs.existsSync("./cypress/screenshots")) {
    const screenshotFiles = findFiles("./cypress/screenshots", ['.png']);
    screenshotFiles.forEach(file => {
      attachments.push({
        filename: path.basename(file),
        path: file
      });
    });
  }

  // Find all MP4 videos
  if (fs.existsSync("./cypress/videos")) {
    const videoFiles = findFiles("./cypress/videos", ['.mp4']);
    videoFiles.forEach(file => {
      attachments.push({
        filename: path.basename(file),
        path: file
      });
    });
  }
} catch (err) {
  console.error("Error processing attachments:", err);
}

// Email content
const mailOptions = {
  from: email,
  to: receiverEmail,
  subject: "🚨 Cypress Test Failed! 🚨",
  text: "Cypress tests failed. Check the attached screenshots/videos.",
  html: `
    <h2>Cypress Test Failure</h2>
    <p>Tests failed in the automated run. Please review the attached files.</p>
    ${attachments.length > 0 ? 
      `<p>Found ${attachments.length} attachments:</p>
       <ul>
         ${attachments.map(a => `<li>${a.filename}</li>`).join('')}
       </ul>` : 
      `<p>No screenshots or videos were found.</p>`
    }
  `,
  attachments,
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email:", error);
    process.exit(1);
  } else {
    console.log("Email successfully sent:", info.response);
    process.exit(0);
  }
});