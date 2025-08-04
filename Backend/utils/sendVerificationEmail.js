// ✅ Import dependencies
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// ✅ Load environment variables (EMAIL_USER, EMAIL_PASS)
dotenv.config();

// ✅ Create email transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g. gmail, or use 'smtp.mailtrap.io' for dev
  auth: {
    user: process.env.EMAIL_USER, // Gmail address
    pass: process.env.EMAIL_PASS, // App password, not main password
  },
});

/**
 * ✅ Send email verification link to new user
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 * @param {string} link - Verification link
 */
export const sendVerificationEmail = async (to, name, link) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify Your Email - Demo Ecommerce',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thanks for registering on our website.</p>
      <p>Click the button below to verify your email:</p>
      <a href="${link}" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions); // ✅ Send the email
};

/**
 * ✅ Send OTP email (e.g. for login, password reset)
 * @param {string} to - Recipient email
 * @param {string} name - Recipient name
 * @param {string} otp - The OTP to send
 */
export const sendOtpEmail = async (to, name, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your OTP Code - Demo Ecommerce',
    html: `
      <h2>Hello ${name},</h2>
      <p>Your OTP code is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    `,
  };

  await transporter.sendMail(mailOptions); // ✅ Send the email
};
