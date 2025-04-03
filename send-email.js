const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const screenshotPath = 'cypress/screenshots';
const videoPath = 'cypress/videos';

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Find the latest screenshot and video
const findLatestFile = (dir) => {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir).map(file => ({ file, time: fs.statSync(`${dir}/${file}`).mtime.getTime() }));
    files.sort((a, b) => b.time - a.time);
    return files.length ? `${dir}/${files[0].file}` : null;
};

const screenshotFile = findLatestFile(screenshotPath);
const videoFile = findLatestFile(videoPath);

const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.RECEIVER_EMAIL,
    subject: '🚨 Cypress Test Failed',
    text: 'One or more Cypress tests have failed. Please check the attached files.',
    attachments: [
        ...(screenshotFile ? [{ filename: 'screenshot.png', path: screenshotFile }] : []),
        ...(videoFile ? [{ filename: 'test-video.mp4', path: videoFile }] : [])
    ]
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
