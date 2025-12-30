---
description: "Node.js backend with Hono: modular structure, exclusive database access, error handling"
globs:
  - "api/**"
alwaysApply: false
---

**Note: API is Phase 2 - Future implementation. Current phase is 100% static frontend.**

You are an expert in TypeScript, Node.js, and Hono, with deep understanding of best practices and performance optimization techniques in backend API development.

Technology:
- Node.js for main REST API (api/) - Phase 2
- Framework: Hono - The project uses Hono as official framework
  - Check api/package.json if in doubt about dependencies
  - Use Hono Context types: import { Context } from 'hono'
  - Middlewares follow Hono pattern: (c: Context, next: Next) => Promise<Response>
  - Routes are Hono instances: new Hono<{ Bindings: Env }>()
- TypeScript mandatory in backend
- Modular structure: routes/, controllers/, services/, middleware/, lib/
- Database: Supabase (PostgreSQL with Row-Level Security)
- Future features: Client management, employee management, work schedule generator, site administration

Code style and structure:
- Write concise maintainable technically accurate TypeScript code with relevant examples
- Use functional and declarative programming patterns, avoid classes when possible
- Favor iteration and modularization to adhere to DRY principles and avoid code duplication
- Use descriptive variable names with auxiliary verbs (isLoading, hasError, shouldValidate)
- Organize files systematically: each file should contain only related content, such as exported functions helpers types and constants
- Use early returns whenever possible to make code more readable
- Always use function keyword for pure functions to benefit from hoisting and clarity

Naming conventions:
- Use lowercase with dashes for directories (auth-middleware, user-controller)
- Use kebab-case for files (error-handler.ts, rate-limit.middleware.ts)
- Favor named exports for functions and constants
- Use descriptive function names, event handlers should be named with handle prefix (handleRequest, handleError)

TypeScript usage:
- Use TypeScript for all code, prefer interfaces over types for their extendability and ability to merge
- Avoid enums, use const objects with as const or maps instead for better type safety and flexibility
- Always define explicit types for function parameters, returns, and variables
- Use generics when appropriate to create reusable code
- Avoid any, use unknown when type is truly unknown

Database access rules:
- API is the ONLY layer with database access
- All database queries must be within the API using Supabase client
- Frontends must never know database structure
- Use Supabase client (@supabase/supabase-js) for all database operations
- Supabase migrations should be managed via Supabase dashboard or CLI
- Database connection variables (Supabase URL and keys): ONLY in API environment (never expose to frontend)
- Leverage Supabase Row-Level Security (RLS) policies for data access control
- Use Supabase Auth for authentication when Phase 2 is implemented

Error handling:
- API: Always use centralized error handler (handleError or similar)
- Create custom error classes (AppError, ApiError) with appropriate status codes
- NEVER return generic error messages, be specific when safe
- Differentiate error types (400, 401, 404, 500) with appropriate HTTP codes
- Log errors with context (userId, requestId, timestamp) before returning
- In production, do not expose stack trace details to client

Data validation:
- API: Always validate input data using Zod or similar library
- Create validation schemas for all routes that receive data
- Return validation errors with status 400 and specific details
- Validate on client before sending requests when possible
- Sanitize user inputs (especially strings)

Logging:
- Do not use only console.log or console.error
- Use centralized logger with levels (info, warn, error, debug)
- Include context in logs: userId, requestId, route, timestamp
- In production, send logs to external service when available
- Do not log sensitive information (passwords, tokens, personal data)

Performance optimization:
- Implement efficient database queries with proper indexing and query optimization
- Use connection pooling for database connections
- Implement caching strategies for frequently accessed data (Redis, in-memory cache)
- Use async/await for all asynchronous operations, avoid blocking the event loop
- Implement request timeout handling to prevent hanging requests
- Use streaming for large file operations when possible
- Optimize JSON serialization/deserialization
- Monitor and optimize API response times
- Implement rate limiting to prevent abuse and ensure fair resource usage
- Use compression middleware for responses when appropriate
