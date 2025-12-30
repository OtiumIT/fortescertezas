# Project Rules - Fortes Certezas

This directory contains modular rules organized by responsibility.

## Rules Structure

### Always Applied Rules (`alwaysApply: true`)

1. **`arquitetura-core`** - Fundamental principles of modular architecture and separation of concerns
2. **`typescript`** - TypeScript patterns: mandatory typing, avoid any, type reuse
3. **`seguranca`** - Critical security rules: authentication, validation, attack protection

### Context-Specific Rules

4. **`frontend-react`** - Applies to `frontend/**`
   - React + Vite patterns, mobile-first, component best practices
   - Static site (Phase 1), future logged area (Phase 2)
   - Deploy on Cloudflare Pages

5. **`backend-api`** - Applies to `api/**` (Phase 2 - Future)
   - Node.js backend with Hono, modular structure, database access
   - Supabase integration for database and authentication

6. **`api-design`** - Applies to `api/**` (Phase 2 - Future)
   - REST API design patterns, status codes, response format

### Intelligently Applied Rules (`alwaysApply: false`)

7. **`codigo-padroes`** - Code patterns, naming conventions, Git, documentation
8. **`metodologia-trabalho`** - Planning before implementation, incremental approach

## Benefits of Modular Structure

- ✅ **Focus**: Each rule covers a specific topic
- ✅ **Efficiency**: Rules applied only when relevant
- ✅ **Maintenance**: Easy to update specific rules without affecting others
- ✅ **Performance**: Lower token context consumption
- ✅ **Composition**: Rules can be combined as needed

## How It Works

- Rules with `alwaysApply: true` are always loaded
- Rules with `globs` are applied when files match the patterns
- Rules with `alwaysApply: false` are applied when Cursor detects relevance based on `description`
