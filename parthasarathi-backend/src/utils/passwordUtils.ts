/**
 * Password utility functions
 * Handles password validation, strength checking, and hashing
 */

/**
 * Password strength requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character (!@#$%^&*)
 */
interface PasswordStrengthResult {
  isStrong: boolean;
  errors: string[];
  score: number; // 0-5
}

export function validatePasswordStrength(
  password: string,
): PasswordStrengthResult {
  const errors: string[] = [];
  let score = 0;

  // Check minimum length
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else {
    score += 1;
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  } else {
    score += 1;
  }

  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  } else {
    score += 1;
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  } else {
    score += 1;
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (!@#$%^&*)",
    );
  } else {
    score += 1;
  }

  return {
    isStrong: errors.length === 0,
    errors,
    score,
  };
}

/**
 * Check if password meets minimum requirements for account creation
 */
export function isValidPassword(password: string): {
  valid: boolean;
  message?: string;
} {
  const result = validatePasswordStrength(password);
  return {
    valid: result.isStrong,
    message: result.errors.length > 0 ? result.errors.join("; ") : undefined,
  };
}

/**
 * Sanitize password input
 */
export function sanitizePassword(password: string): string {
  return password.trim();
}
