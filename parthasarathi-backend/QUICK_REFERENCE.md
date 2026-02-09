# Quick Reference: Authentication System

## Key Files

| File                                       | Purpose                             |
| ------------------------------------------ | ----------------------------------- |
| `src/controllers/authController.ts`        | All auth endpoint handlers          |
| `src/routes/authRoutes.ts`                 | Route definitions and rate limiting |
| `src/middleware/authJWT.middleware.ts`     | JWT validation and user attachment  |
| `src/middleware/role.middleware.ts`        | RBAC enforcement                    |
| `src/middleware/csrf.middleware.ts`        | CSRF token validation               |
| `src/middleware/rateLimiter.middleware.ts` | Rate limiting configuration         |
| `src/models/user.ts`                       | User schema and password hashing    |
| `src/services/authService.ts`              | User creation and super admin init  |
| `src/services/emailService.ts`             | Email sending via nodemailer        |
| `src/utils/tokenUtils.ts`                  | JWT generation and verification     |
| `src/utils/otpUtils.ts`                    | OTP generation and validation       |
| `src/utils/passwordUtils.ts`               | Password validation and strength    |
| `.env.example`                             | Configuration template              |
| `AUTH_GUIDE.md`                            | Complete API documentation          |

## Environment Variables

**Required**:

```
MONGODB_URI
JWT_SECRET
JWT_REFRESH_SECRET
SUPER_ADMIN_EMAIL
SUPER_ADMIN_PASSWORD
```

**Optional but Important**:

```
EMAIL_PROVIDER=smtp
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

## Endpoint Summary

| Method | Path                                  | Auth    | Rate Limit | Description             |
| ------ | ------------------------------------- | ------- | ---------- | ----------------------- |
| POST   | `/api/auth/register`                  | No      | 5/15min    | Register new user       |
| POST   | `/api/auth/verify-email`              | No      | 3/hour     | Verify email with OTP   |
| POST   | `/api/auth/login`                     | No      | 5/15min    | Login with credentials  |
| POST   | `/api/auth/forgot-password`           | No      | 3/hour     | Request password reset  |
| POST   | `/api/auth/reset-password`            | No      | 3/hour     | Reset password with OTP |
| POST   | `/api/auth/resend-email-verification` | No      | 3/hour     | Resend email OTP        |
| POST   | `/api/auth/resend-password-reset`     | No      | 3/hour     | Resend reset OTP        |
| POST   | `/api/auth/google`                    | No      | 5/15min    | Google OAuth callback   |
| POST   | `/api/auth/refresh`                   | No      | -          | Refresh access token    |
| GET    | `/api/auth/profile`                   | **Yes** | -          | Get user profile        |
| POST   | `/api/auth/logout`                    | **Yes** | -          | Logout user             |

## Common Tasks

### Protect a Route

```typescript
import {
  authMiddleware,
  requireAuth,
} from "../middleware/authJWT.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

router.post(
  "/admin-endpoint",
  authMiddleware,
  requireAuth,
  allowRoles("ADMIN", "SUPER_ADMIN"),
  handler,
);
```

### Get User from Request

```typescript
export const myHandler = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userId = req.user.id;
  const email = req.user.email;
  const role = req.user.role;

  // Use user info...
};
```

### Check User Status

```typescript
const user = await User.findById(userId);

if (!user.isActive) {
  // User account disabled
}

if (user.isBlocked) {
  // User is blocked
}

if (!user.emailVerified) {
  // Email not verified
}
```

### Send Email

```typescript
import { sendEmailVerificationOTP } from "../services/emailService.js";

await sendEmailVerificationOTP(
  "user@example.com",
  "123456", // OTP code
  "John Doe", // User name
);
```

### Generate OTP

```typescript
import { generateOTP, getOTPExpiry } from "../utils/otpUtils.js";

const otp = generateOTP(); // "123456"
const expiry = getOTPExpiry(10); // 10 minutes from now
```

### Validate Password Strength

```typescript
import { isValidPassword } from "../utils/passwordUtils.js";

const validation = isValidPassword("TestPassword123!");
if (!validation.valid) {
  console.log(validation.message); // "Password must contain..."
}
```

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Action successful",
  "code": "ACTION_SUCCESS",
  "data": {
    "key": "value"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

## Common Error Codes

| Code                    | Meaning                  |
| ----------------------- | ------------------------ |
| `VALIDATION_ERROR`      | Missing or invalid input |
| `INVALID_CREDENTIALS`   | Wrong email or password  |
| `EMAIL_EXISTS`          | Email already registered |
| `ACCOUNT_BLOCKED`       | User is blocked          |
| `ACCOUNT_INACTIVE`      | User account disabled    |
| `INVALID_OTP`           | OTP incorrect or expired |
| `NO_TOKEN`              | Missing JWT token        |
| `INVALID_TOKEN`         | Token invalid or expired |
| `RATE_LIMIT_EXCEEDED`   | Too many requests        |
| `CSRF_VALIDATION_ERROR` | CSRF token invalid       |

## Client Implementation Pattern

```javascript
// Login
const res = await fetch("/api/auth/login", {
  method: "POST",
  credentials: "include", // Send cookies
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const { data } = await res.json();
localStorage.setItem("accessToken", data.accessToken);

// Use Token
const profileRes = await fetch("/api/auth/profile", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// Refresh Token
const refreshRes = await fetch("/api/auth/refresh", {
  method: "POST",
  credentials: "include", // Cookie auto-sent
});

// Logout
await fetch("/api/auth/logout", {
  method: "POST",
  credentials: "include",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
localStorage.removeItem("accessToken");
```

## Database Queries

```javascript
// Get user by email
const user = await User.findOne({ email: "user@example.com" });

// Get user with password (normally hidden)
const user = await User.findById(id).select("+password");

// Verify password
const isMatch = await user.comparePassword("plainPassword");

// Block user
await User.findByIdAndUpdate(id, { isBlocked: true });

// Disable account
await User.findByIdAndUpdate(id, { isActive: false });

// Update last login
await User.findByIdAndUpdate(id, { lastLogin: new Date() });

// Get all admins
const admins = await User.find({ role: "ADMIN" });
```

## Testing Checklist

- [ ] User can register with valid email
- [ ] Registration requires strong password
- [ ] Email verification OTP sent and works
- [ ] User can login after email verification
- [ ] Login fails with incorrect password
- [ ] Cannot login before email verification
- [ ] Forgot password sends OTP email
- [ ] Password reset works with correct OTP
- [ ] Old passwords don't work after reset
- [ ] Access token expires after 15 minutes
- [ ] Refresh token allows getting new access token
- [ ] Refresh token expires after 7 days
- [ ] Logout clears all refresh tokens
- [ ] Cannot use token after logout
- [ ] Google OAuth creates new user
- [ ] Google OAuth links existing email
- [ ] Rate limiting blocks excess requests
- [ ] Blocked users cannot login
- [ ] Inactive users cannot login
- [ ] Profile endpoint returns correct user data
- [ ] Admin endpoints require ADMIN role

## Debugging

### Enable Debug Logging

```javascript
// In .env
LOG_LEVEL = debug;
```

### Check Token Contents

```javascript
import jwt from "jsonwebtoken";

const decoded = jwt.decode(token); // Without verification
console.log(decoded);
```

### Test Rate Limiting

```bash
# Make 6 login attempts quickly
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}'
done
# 6th request should fail with 429
```

### View Logs

```bash
tail -f logs/combined-*.log      # All logs
tail -f logs/error-*.log          # Error logs only
```

## Production Deployment

1. **Security**
   - Use strong, random JWT secrets (32+ characters)
   - Enable HTTPS/TLS
   - Set `NODE_ENV=production`

2. **Environment**
   - Use environment-specific .env file
   - Don't commit .env to version control
   - Use secret management service (AWS Secrets Manager, etc.)

3. **Email**
   - Configure real SMTP service
   - Enable email bounce handling
   - Set realistic from address

4. **Monitoring**
   - Setup log aggregation (ELK, Sumo Logic, etc.)
   - Monitor failed login attempts
   - Alert on unusual patterns

5. **Backup**
   - Regular database backups
   - Store JWT secrets securely
   - Document recovery procedures

## Common Issues & Solutions

**Email not sending?**

- Check `EMAIL_PROVIDER` setting
- Verify SMTP credentials
- Check Gmail App Password (if using Gmail)
- Check spam folder
- Review logs for errors

**Login failing?**

- Verify email is registered
- Check password is correct
- Verify email is verified
- Check account not blocked
- Check account is active

**Token expired?**

- Use refresh endpoint to get new access token
- Login again if refresh token expired
- Clear localStorage and cookies if issues persist

**CORS errors?**

- Verify `CORS_ORIGIN` matches frontend URL
- Check credentials: true enabled
- Verify cookies sent with requests

**Rate limiting too strict?**

- Adjust in .env: `AUTH_RATE_LIMIT_MAX_REQUESTS`
- Adjust in .env: `AUTH_RATE_LIMIT_WINDOW_MS`

## Resources

- Full API docs: `AUTH_GUIDE.md`
- Migration details: `MIGRATION_SUMMARY.md`
- Config template: `.env.example`
- User model: `src/models/user.ts`
- Error codes: List above

---

## Quick Start

```bash
# 1. Setup
cp .env.example .env
# Edit .env with your values

# 2. Seed database
npm run seed

# 3. Start server
npm run dev

# 4. Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"TestPassword123!",
    "name":"Test User"
  }'
```

Done! Your authentication system is ready.
