# Authentication System Guide

## Overview

The Parthasarathi Musicals backend uses a **custom JWT-based authentication system** with the following features:

- **Local Authentication**: Email & password with bcryptjs hashing
- **Email Verification**: OTP-based verification via nodemailer
- **Password Reset**: OTP-based secure password reset
- **Google OAuth 2.0**: Single sign-on via Google
- **JWT Tokens**: Access tokens (15 min) + Refresh tokens (7 days) with rotation
- **Rate Limiting**: Protection against brute force attacks
- **CSRF Protection**: Token-based CSRF validation
- **RBAC**: Role-based access control (SUPER_ADMIN, ADMIN, SUPPORT, CUSTOMER)
- **Secure Cookies**: HttpOnly, Secure, SameSite for production

---

## Architecture

### Key Components

```
┌─────────────────────────────────────────────────────────┐
│             Authentication System                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Controllers (authController.ts)                       │
│  ├─ register()                                        │
│  ├─ verifyEmail()                                     │
│  ├─ login()                                           │
│  ├─ forgotPassword()                                  │
│  ├─ resetPassword()                                   │
│  ├─ googleOAuthCallback()                             │
│  ├─ refreshAccessToken()                              │
│  ├─ logout()                                          │
│  ├─ getProfile()                                      │
│  └─ resend*() endpoints                               │
│                                                         │
│  Services                                              │
│  ├─ authService.ts (user mgmt, super admin init)     │
│  ├─ emailService.ts (nodemailer)                      │
│  └─ (removed) clerkService.ts (deprecated)           │
│                                                         │
│  Middleware                                            │
│  ├─ authJWT.middleware.ts (JWT validation)           │
│  ├─ csrf.middleware.ts (CSRF protection)              │
│  ├─ rateLimiter.middleware.ts (rate limiting)        │
│  └─ role.middleware.ts (RBAC)                         │
│                                                         │
│  Models                                                │
│  └─ user.ts (MongoDB schema with hashing)            │
│                                                         │
│  Utilities                                             │
│  ├─ tokenUtils.ts (JWT generation/verification)      │
│  ├─ otpUtils.ts (OTP generation/validation)          │
│  ├─ passwordUtils.ts (strength validation)            │
│  └─ logger.ts (Winston logging)                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Register New User

```
POST /api/auth/register
Rate Limited: 5 attempts per 15 minutes

Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}

Response:
{
  "success": true,
  "message": "Registration successful. Please check your email for verification code.",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "requiresEmailVerification": true
  }
}

Password Requirements:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)
```

#### 2. Verify Email with OTP

```
POST /api/auth/verify-email
Rate Limited: 3 attempts per hour

Request:
{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "Email verified successfully",
  "code": "EMAIL_VERIFIED"
}

OTP Format:
- 6 digits
- Expires in 10 minutes
- Sent via email
```

#### 3. Login

```
POST /api/auth/login
Rate Limited: 5 attempts per 15 minutes

Request:
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CUSTOMER",
      "avatar": "https://..."
    }
  }
}

Cookies Set:
- refreshToken (HttpOnly, Secure, SameSite=Strict, 7 days)
```

#### 4. Forgot Password

```
POST /api/auth/forgot-password
Rate Limited: 3 attempts per hour

Request:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "If an account exists with this email, a reset code will be sent",
  "code": "PASSWORD_RESET_EMAIL_SENT"
}

Note:
- Returns same message whether email exists or not (security)
- OTP sent via email, valid for 1 hour
- User receives 6-digit reset code
```

#### 5. Reset Password

```
POST /api/auth/reset-password
Rate Limited: 3 attempts per hour

Request:
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePassword123!"
}

Response:
{
  "success": true,
  "message": "Password reset successful. Please login with your new password.",
  "code": "PASSWORD_RESET_SUCCESS"
}

Security:
- Validates OTP expiry (1 hour)
- Validates password strength
- Clears all refresh tokens (force re-login)
```

#### 6. Google OAuth Callback

```
POST /api/auth/google
Rate Limited: 5 attempts per 15 minutes

Request:
{
  "googleId": "110123456789...",
  "email": "user@gmail.com",
  "name": "John Doe",
  "picture": "https://lh3.googleapis.com/..."
}

Response:
{
  "success": true,
  "message": "Google OAuth login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@gmail.com",
      "name": "John Doe",
      "role": "CUSTOMER",
      "avatar": "https://lh3.googleapis.com/..."
    }
  }
}

Features:
- Auto-creates user if doesn't exist
- Email is auto-verified (Google emails are pre-verified)
- Updates avatar from Google profile
- Links existing email to Google OAuth
```

#### 7. Refresh Access Token

```
POST /api/auth/refresh

Cookies Sent:
- refreshToken (from previous login/refresh)

Response:
{
  "success": true,
  "message": "Access token refreshed",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Cookies Set:
- New refreshToken (rotated for security)

Security:
- Validates refresh token signature
- Checks token family for rotation attacks
- Updates lastLogin timestamp
```

#### 8. Get Profile

```
GET /api/auth/profile
Authentication Required: Yes

Headers:
Authorization: Bearer <accessToken>

Response:
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "avatar": "https://...",
    "role": "CUSTOMER",
    "emailVerified": true,
    "isActive": true,
    "isBlocked": false,
    "lastLogin": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-10T08:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 9. Logout

```
POST /api/auth/logout
Authentication Required: Yes

Headers:
Authorization: Bearer <accessToken>

Response:
{
  "success": true,
  "message": "Logout successful",
  "code": "LOGOUT_SUCCESS"
}

Security:
- Clears all refresh tokens (logout from all devices)
- Clears refreshToken cookie
```

#### 10. Resend Email Verification OTP

```
POST /api/auth/resend-email-verification
Rate Limited: 3 attempts per hour

Request:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "If an account exists with this email, a verification code will be sent",
  "code": "VERIFICATION_OTP_SENT"
}
```

#### 11. Resend Password Reset OTP

```
POST /api/auth/resend-password-reset
Rate Limited: 3 attempts per hour

Request:
{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "If an account exists with this email, a reset code will be sent",
  "code": "PASSWORD_RESET_EMAIL_SENT"
}
```

---

## Authentication Flow Diagrams

### Local Authentication (Email & Password)

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ POST /api/auth/register
       │ {email, password, name}
       ▼
┌─────────────────┐
│ Validate Input  │
│ Hash Password   │
│ Create User     │
└────────┬────────┘
         │
         │ Generate OTP
         │ Send Email
         ▼
    ┌────────────┐
    │ Awaiting   │
    │ Email Verify
    │ (10 mins)  │
    └──────┬─────┘
           │
           │ POST /api/auth/verify-email
           │ {email, otp}
           ▼
    ┌──────────────┐
    │ Validate OTP │
    │ Mark Email   │
    │ Verified     │
    └──────┬───────┘
           │
           │ POST /api/auth/login
           │ {email, password}
           ▼
    ┌──────────────────┐
    │ Verify Password  │
    │ Check Account    │
    │ Status           │
    └────────┬─────────┘
             │
             │ Generate Tokens
             │ Set Cookie
             ▼
         ┌─────────────────┐
         │ Authenticated   │
         │ Access Token(15m)
         │ Refresh Token(7d)
         └─────────────────┘
```

### Password Reset Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       │ POST /api/auth/forgot-password
       │ {email}
       ▼
┌─────────────────────┐
│ Find User by Email  │
│ Generate Reset OTP  │
│ Send Email          │
└────────┬────────────┘
         │
         │ User checks email
         │ Valid for 1 hour
         ▼
    ┌─────────────────┐
    │ POST /api/auth/ │
    │ reset-password  │
    │ {email, otp,    │
    │  newPassword}   │
    └────────┬────────┘
             │
             │ Validate OTP
             │ Hash Password
             │ Clear Tokens
             ▼
         ┌──────────────┐
         │ Password     │
         │ Reset OK     │
         │ User logs in │
         │ again        │
         └──────────────┘
```

### Token Refresh Flow

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       │ 1. Has valid refreshToken
       │    cookie (HttpOnly)
       ▼
┌─────────────────────────┐
│ POST /api/auth/refresh  │
│ (Cookie auto-sent)      │
└────────┬────────────────┘
         │
         │ 2. Server validates
         │    refresh token
         ▼
    ┌─────────────────────┐
    │ Check Token Family  │
    │ Detect Rotation     │
    │ Attacks             │
    └────────┬────────────┘
             │
             │ 3. Generate New Tokens
             │    Rotate Refresh Token
             ▼
         ┌──────────────────────────┐
         │ New Access Token (15min) │
         │ New Refresh Token (7d)   │
         │ New Cookie Set           │
         └──────────────────────────┘
```

### Google OAuth Flow

```
┌─────────────────┐
│ Frontend        │
│ Opens Google    │
│ Login Dialog    │
└────────┬────────┘
         │
         │ User authenticates
         │ at Google
         ▼
┌──────────────────────────┐
│ Google returns:          │
│ - googleId               │
│ - email                  │
│ - name                   │
│ - picture (avatar)       │
└────────┬─────────────────┘
         │
         │ POST /api/auth/google
         │ {googleId, email, ...}
         ▼
┌──────────────────────┐
│ Check if User Exists │
└────────┬─────────────┘
         │
         ├─ YES: Update googleId
         │       if not already set
         │       ▼
         │   ┌────────────┐
         │   │ Login User │
         │   └────────────┘
         │
         └─ NO: Create new user
                Auto-verify email
                ▼
            ┌──────────────┐
            │ Create User  │
            │ Send Welcome │
            └──────┬───────┘
                   │
                   ▼
            ┌──────────────┐
            │ Generate     │
            │ Tokens       │
            │ Set Cookie   │
            └──────────────┘
```

---

## Security Features

### 1. Password Security

- **Hashing**: bcryptjs with 10 salt rounds
- **Validation**: Minimum 8 chars, uppercase, lowercase, number, special char
- **Storage**: Never stored in plaintext, only bcrypt hash
- **Reset**: Forces re-login on all devices

### 2. Token Security

- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used only to get new access token
- **JWT Signature**: HS256 with secret key
- **Rotation**: Refresh tokens rotated on each use, family ID prevents reuse attacks

### 3. Cookie Security

```
HttpOnly: true      // Prevents JavaScript access (XSS protection)
Secure: true        // Only sent over HTTPS in production
SameSite: strict    // Prevents cross-site requests (CSRF protection)
Path: /api/auth/refresh  // Limits cookie to specific path
MaxAge: 7 days      // 604800000 milliseconds
```

### 4. Rate Limiting

```
General API:       100 requests per 15 minutes
Auth Endpoints:    5 requests per 15 minutes (login, register)
Password Reset:    3 requests per hour
Email Verification: 3 requests per hour
```

### 5. CSRF Protection

- Token-based validation via csurf middleware
- Tokens required for POST, PUT, DELETE, PATCH requests
- Safe methods (GET, HEAD, OPTIONS) exempt
- Tokens sent in X-CSRF-Token header or \_csrf form field

### 6. Account Status

- **isActive**: User can login (false = account disabled)
- **isBlocked**: User is blocked from platform (false = normal)
- **emailVerified**: Email has been verified
- **lastLogin**: Timestamp tracking

---

## Error Codes

### Authentication Errors

```
VALIDATION_ERROR           - Missing or invalid input
INVALID_EMAIL              - Email format invalid
WEAK_PASSWORD              - Password doesn't meet requirements
EMAIL_EXISTS               - Email already registered
USER_NOT_FOUND             - User not found in database
INVALID_CREDENTIALS        - Email or password incorrect
ACCOUNT_BLOCKED            - User account is blocked
ACCOUNT_INACTIVE           - User account is inactive
INVALID_OTP                - OTP is incorrect or expired
VERIFICATION_EXPIRED       - Verification code expired
EMAIL_ALREADY_VERIFIED     - Email already verified
NO_VERIFICATION_TOKEN      - No verification token found
NO_RESET_TOKEN             - No password reset request found
RESET_EXPIRED              - Reset code expired
```

### Token Errors

```
NO_TOKEN                   - Missing authorization token
INVALID_TOKEN              - Token is invalid or malformed
USER_BLOCKED               - User is blocked
USER_INACTIVE              - User is inactive
NO_REFRESH_TOKEN           - Refresh token missing
INVALID_REFRESH_TOKEN      - Refresh token invalid/expired
TOKEN_REVOKED              - Token family invalidated (rotation attack)
```

### Rate Limiting

```
RATE_LIMIT_EXCEEDED        - Too many requests (general)
AUTH_RATE_LIMIT_EXCEEDED   - Too many auth attempts
ADMIN_RATE_LIMIT_EXCEEDED  - Too many admin requests
```

### CSRF

```
CSRF_VALIDATION_ERROR      - CSRF token invalid or missing
```

---

## Implementation Guide

### Setup

1. **Install Dependencies**

```bash
npm install
```

2. **Configure Environment**

```bash
cp .env.example .env
# Edit .env with your values
```

3. **Initialize Database**

```bash
npm run seed
# Creates super admin and role permissions
```

4. **Start Server**

```bash
npm run dev
```

### Using the API

#### With cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePassword123!","name":"John Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePassword123!"}' \
  -c cookies.txt

# Get Profile
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <accessToken>"

# Refresh Token
curl -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt
```

#### With JavaScript/Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // Include cookies
});

// Register
const register = async () => {
  const res = await api.post("/api/auth/register", {
    email: "user@example.com",
    password: "SecurePassword123!",
    name: "John Doe",
  });
  return res.data;
};

// Login
const login = async () => {
  const res = await api.post("/api/auth/login", {
    email: "user@example.com",
    password: "SecurePassword123!",
  });
  const { accessToken } = res.data.data;
  localStorage.setItem("accessToken", accessToken);
  return res.data;
};

// Get Profile
const getProfile = async () => {
  const token = localStorage.getItem("accessToken");
  const res = await api.get("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Refresh Token
const refreshToken = async () => {
  const res = await api.post("/api/auth/refresh");
  const { accessToken } = res.data.data;
  localStorage.setItem("accessToken", accessToken);
  return res.data;
};

// Logout
const logout = async () => {
  const token = localStorage.getItem("accessToken");
  await api.post(
    "/api/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  localStorage.removeItem("accessToken");
};
```

### Frontend Integration

See `parthasarathi-client/src/context/AuthContext.tsx` for complete client-side implementation with:

- JWT token storage and refresh
- User context and hooks
- Protected routes
- Error handling

---

## Troubleshooting

### Issue: "Email already registered"

**Solution**: Use a different email or reset password if you forgot it

### Issue: "Rate limit exceeded"

**Solution**: Wait 15 minutes before trying again. For development, adjust rate limits in `.env`

### Issue: "Invalid refresh token"

**Solution**: Login again. Refresh tokens expire after 7 days

### Issue: "CORS error in browser"

**Solution**: Ensure `CORS_ORIGIN` in `.env` matches your frontend URL

### Issue: "Emails not sending"

**Solution**:

- Check `EMAIL_PROVIDER` is configured
- For Gmail: Use App Password, enable 2FA
- Check spam folder
- Use console provider for development

### Issue: "Google OAuth not working"

**Solution**:

- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Check callback URL matches Google console
- Ensure email scope is requested

---

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (32+ random characters)
- [ ] Enable HTTPS/TLS
- [ ] Set `COOKIE_SECURE=true`
- [ ] Configure real SMTP service
- [ ] Setup Google OAuth credentials
- [ ] Configure rate limiting values
- [ ] Enable CSRF protection
- [ ] Setup logging and monitoring
- [ ] Test token rotation
- [ ] Load test authentication endpoints
- [ ] Implement audit logging
- [ ] Setup backup for tokens if using Redis
- [ ] Document password reset procedures
- [ ] Setup email bounce handling
- [ ] Configure admin override procedures

---

## References

- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)
- [jsonwebtoken Documentation](https://github.com/auth0/node-jsonwebtoken)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Passport.js Documentation](http://www.passportjs.org/)
