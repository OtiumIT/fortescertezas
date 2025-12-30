---
description: "Critical security rules: authentication, validation, attack protection, security headers"
alwaysApply: true
---

Authentication and authorization:
- API: Use authentication middleware (authMiddleware) on ALL protected routes
- Zero Trust: Never trust client data, always validate on server
- JWT tokens with adequate expiration (15min access, 7d refresh)
- Refresh tokens must be rotated (invalidate old token when generating new one)
- Implement logout that invalidates tokens on server when possible
- Never expose tokens or credentials in logs, URLs, or error messages
- Validate JWT tokens before processing ANY protected request
- Validate user permissions BEFORE accessing resources (RBAC when necessary)

Validation and sanitization:
- Validate ALL inputs in API (never trust frontend)
- Use robust validation libraries (Zod, Joi, Yup)
- Sanitize strings: remove scripts, dangerous HTML, SQL injection attempts
- Validate types, sizes, formats (email, URL, phone)
- Normalize inputs (trim, lowercase when appropriate)
- Validate limits: max length, max array size, max file size

Protection against common attacks:
- SQL Injection: Use prepared statements or ORM (NEVER concatenate strings in queries)
- XSS (Cross-Site Scripting): Sanitize outputs, use Content-Security-Policy headers
- CSRF: Validate CSRF tokens on write operations (POST, PUT, DELETE)
- Rate Limiting: Implement on ALL routes (public and authenticated)
  - Public routes: more restrictive limits (ex: 100 req/min per IP)
  - Authenticated routes: limits per user (ex: 1000 req/min per user)
  - Sensitive routes (login, registration): very restrictive limits (ex: 5 attempts/min per IP)
- DDoS: Use CDN/WAF, rate limiting in multiple layers
- Brute Force: Block IPs after N failed login attempts
- Session Fixation: Regenerate session ID after login

Security headers:
- Always send HTTP security headers:
  - Content-Security-Policy: Restrict resources that can be loaded
  - X-Content-Type-Options: nosniff - Prevent MIME type sniffing
  - X-Frame-Options: DENY or SAMEORIGIN - Prevent clickjacking
  - Strict-Transport-Security: Force HTTPS
  - X-XSS-Protection: Additional XSS protection
  - Referrer-Policy: Control referrer information
- Remove headers that expose technology (ex: X-Powered-By)

Data security:
- Encryption: Passwords always with hash (bcrypt, argon2), NEVER store in plain text
- Supabase Auth: Use Supabase authentication for user management (Phase 2), handles password hashing automatically
- Sensitive Data: Encrypt sensitive data at rest when necessary (PII, financial data)
- Supabase: Data is encrypted at rest by default, ensure proper RLS policies are in place
- Transmission: ALWAYS use HTTPS in production (TLS 1.2+)
- Secrets: Never commit secrets in code, use environment variables or secret managers
- Supabase Keys: Never expose Supabase service_role key to frontend, use anon key only in frontend if needed (prefer API calls)
- Logs: Never log passwords, tokens, complete personal data, Supabase keys
- Backups: Supabase handles backups automatically, test restoration regularly

Access control:
- Principle of Least Privilege: Users should have minimum necessary access
- Validate resource ownership: user only accesses their own data
- Implement Row-Level Security (RLS) in Supabase database - use Supabase RLS policies for data access control
- Validate permissions in multiple layers (middleware + service + database)
- Supabase RLS: Define policies at database level to enforce access control, complement API-level validation

Monitoring and auditing:
- Log all access attempts (success and failure)
- Log sensitive operations (creation, modification, deletion of critical data)
- Monitor suspicious patterns (many requests, access outside normal hours)
- Alerts for mass authentication failures
- Maintain audit logs for minimum period required by regulation (LGPD)

Environment variables and secrets:
- NEVER commit .env or files with secrets
- Use .env.example with dummy values
- Secrets in production: use secret managers (AWS Secrets Manager, Azure Key Vault, etc)
- Rotate secrets regularly (API tokens, database passwords)
- Limit access to secrets only for services that need them

Security checklist:
- Inputs validated in API (never trust frontend)
- Passwords never in plain text (always hash, use Supabase Auth in Phase 2)
- Tokens/credentials never in logs or URLs
- HTTPS in production (never HTTP)
- Rate limiting implemented
- CORS configured correctly (no wildcard in production)
- HTTP security headers present
- SQL injection prevented (Supabase client uses parameterized queries, never raw SQL)
- XSS prevented (output sanitization)
- CSRF tokens on write operations
- Authentication on all protected routes (Supabase Auth in Phase 2)
- Permissions validated before resource access (API + Supabase RLS)
- Secrets in environment variables (never in code, especially Supabase keys)
- Database accessible only through API (never direct Supabase connection from frontend)
- Supabase RLS policies configured for all tables
- Errors do not expose stack traces in production
