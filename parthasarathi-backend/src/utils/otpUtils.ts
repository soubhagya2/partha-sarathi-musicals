/**
 * OTP (One-Time Password) utility functions
 * Handles generation and validation of numeric OTPs for email verification and password reset
 */

/**
 * Generate numeric OTP
 * @param length Length of OTP (default 6 digits)
 */
export function generateOTP(length: number = 6): string {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
  )
    .toString()
    .substring(0, length);
}

/**
 * Get OTP expiry time from now
 * @param minutes Minutes until expiry (default 10 minutes)
 */
export function getOTPExpiry(minutes: number = 10): Date {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60 * 1000);
}

/**
 * Check if OTP has expired
 */
export function isOTPExpired(expiryTime: Date): boolean {
  return new Date() > expiryTime;
}

/**
 * Validate OTP format (numeric only, correct length)
 */
export function isValidOTPFormat(otp: string, length: number = 6): boolean {
  return /^\d+$/.test(otp) && otp.length === length;
}
