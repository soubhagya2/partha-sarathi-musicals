/**
 * Email service using Nodemailer
 * Handles sending verification emails, password reset emails, and notifications
 */

import nodemailer from "nodemailer";
import { logger } from "../utils/logger";

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Create nodemailer transporter based on environment configuration
 */
function createTransporter() {
  const emailProvider = process.env.EMAIL_PROVIDER || "console";

  // For development, use console logging
  if (emailProvider === "console") {
    return nodemailer.createTransport({
      streamTransport: true,
      buffer: true,
      newline: "unix",
    });
  }

  // For production, use configured SMTP service
  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback to console
  return nodemailer.createTransport({
    streamTransport: true,
    buffer: true,
    newline: "unix",
  });
}

const transporter = createTransporter();

/**
 * Send email
 */
async function sendEmail(options: MailOptions): Promise<boolean> {
  try {
    const from = process.env.EMAIL_FROM || "noreply@parthasarathi-musicals.com";

    const info = await transporter.sendMail({
      from,
      ...options,
    });

    logger.info(`Email sent to ${options.to}: ${options.subject}`, {
      messageId: info.messageId,
    });
    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${options.to}`, { error });
    return false;
  }
}

/**
 * Send email verification OTP
 */
export async function sendEmailVerificationOTP(
  email: string,
  otp: string,
  name: string,
): Promise<boolean> {
  const html = `
    <h2>Email Verification</h2>
    <p>Hi ${name},</p>
    <p>Your email verification code is:</p>
    <h1 style="letter-spacing: 5px; font-family: monospace;">${otp}</h1>
    <p>This code expires in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
    <hr />
    <p><small>Parthasarathi Musicals</small></p>
  `;

  return sendEmail({
    to: email,
    subject: "Email Verification - Parthasarathi Musicals",
    html,
  });
}

/**
 * Send password reset OTP
 */
export async function sendPasswordResetOTP(
  email: string,
  otp: string,
  name: string,
): Promise<boolean> {
  const html = `
    <h2>Password Reset Request</h2>
    <p>Hi ${name},</p>
    <p>Use the following code to reset your password:</p>
    <h1 style="letter-spacing: 5px; font-family: monospace;">${otp}</h1>
    <p>This code expires in 1 hour.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <hr />
    <p><small>Parthasarathi Musicals</small></p>
  `;

  return sendEmail({
    to: email,
    subject: "Password Reset Code - Parthasarathi Musicals",
    html,
  });
}

/**
 * Send welcome email after successful registration
 */
export async function sendWelcomeEmail(
  email: string,
  name: string,
): Promise<boolean> {
  const html = `
    <h2>Welcome to Parthasarathi Musicals!</h2>
    <p>Hi ${name},</p>
    <p>Thank you for joining us. We're excited to have you as part of our community.</p>
    <p>You can now:</p>
    <ul>
      <li>Browse our product catalog</li>
      <li>Add items to your wishlist</li>
      <li>Track your orders</li>
      <li>Access your account dashboard</li>
    </ul>
    <p>If you have any questions, feel free to contact us.</p>
    <hr />
    <p><small>Parthasarathi Musicals</small></p>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Parthasarathi Musicals!",
    html,
  });
}

/**
 * Send account blocked notification
 */
export async function sendAccountBlockedNotification(
  email: string,
  name: string,
  reason?: string,
): Promise<boolean> {
  const reasonText = reason ? `Reason: ${reason}` : "";

  const html = `
    <h2>Account Blocked</h2>
    <p>Hi ${name},</p>
    <p>Your account has been blocked.${reasonText ? ` ${reasonText}` : ""}</p>
    <p>If you believe this is a mistake, please contact our support team.</p>
    <hr />
    <p><small>Parthasarathi Musicals</small></p>
  `;

  return sendEmail({
    to: email,
    subject: "Account Blocked - Parthasarathi Musicals",
    html,
  });
}
