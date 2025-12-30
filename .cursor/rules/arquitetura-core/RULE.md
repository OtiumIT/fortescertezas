---
description: "Fundamental principles of modular architecture and separation of concerns"
alwaysApply: true
---

You are an expert in software architecture and system design. You enforce architectural rules automatically and validate code structure before implementation.

Project structure:
- frontend/: Public site React + Vite (static site Phase 1, logged area Phase 2)
- api/: REST API Node.js Hono (Phase 2 - Future)
- Database: Supabase (PostgreSQL with Row-Level Security)

Import validation:
- NEVER import database libraries (Supabase client, pg, mysql2) in frontend code
- NEVER import ORM types or database schemas in frontend code
- Frontend communicates with backend ONLY via HTTP/HTTPS API calls
- NEVER import from api/** into frontend code directly

File location import rules:
- api/src/routes/ can ONLY import from: controllers/, middleware/, lib/, types/
- api/src/controllers/ can ONLY import from: services/, lib/, types/
- api/src/services/ can ONLY import from: repositories/, lib/, types/
- api/src/repositories/ can ONLY import from: lib/, types/, config/
- frontend/src/components/ can ONLY import from: shared/, lib/, hooks/, types/
- frontend/src/pages/ can ONLY import from: components/, shared/, lib/, hooks/, types/

Dependency direction strict:
- Routes → Controllers → Services → Repositories → Database
- Controllers CANNOT import from Routes
- Services CANNOT import from Controllers or Routes
- Repositories CANNOT import from Services, Controllers, or Routes

Access layers:
- Frontend communicates EXCLUSIVELY via HTTP/HTTPS with API (Phase 2)
- API is the ONLY layer that accesses Supabase database directly
- Frontend must never know or access database directly
- Never create database connections in frontend code
- Never expose Supabase connection variables or keys to frontend
- NEVER import Supabase client or database libraries (pg, mysql2) in frontend code
- NEVER execute SQL or NoSQL queries in React components or frontend code
- Phase 1: Frontend is 100% static, no API calls
- Phase 2: Frontend will call API endpoints, API will access Supabase

Folder structure:
- api/src/routes/ - route definitions only (Phase 2)
- api/src/controllers/ - validation and service calls (Phase 2)
- api/src/services/ - business logic only (Phase 2)
- api/src/repositories/ - Supabase database queries only (Phase 2)
- api/src/middleware/ - reusable middlewares (Phase 2)
- api/src/lib/ - utilities helpers configurations (Phase 2)
- api/src/types/ - TypeScript types specific to API (Phase 2)
- api/src/config/ - configurations including Supabase (Phase 2)
- frontend/src/pages/ - main pages routes
- frontend/src/components/ - application-specific components
- frontend/src/components/ui/ - basic UI components
- frontend/src/components/features/ - feature-specific components
- frontend/src/shared/ - shared code within app
- frontend/src/lib/ - utilities and configurations
- frontend/src/hooks/ - custom hooks
- frontend/src/types/ - TypeScript types

Module organization:
- One responsibility per module
- Frontend and API are separate, communicate only via HTTP/HTTPS
- NEVER import from api/** into frontend code
- NEVER import from frontend/** into api code

Dependency validation:
- Before creating import, check if it creates circular dependency
- If file A imports B, and B imports A, REJECT and refactor
- Frontend can import from own src/** only
- Backend API can import from own src/** only
- Use @/ alias for app's own src/, never for cross-app imports
- Frontend and API are completely independent, communicate only via HTTP/HTTPS

Communication patterns:
- Frontend ↔ Backend: ONLY HTTP/HTTPS calls to api/, ONLY use lib/api-client.ts, NEVER WebSocket direct TCP or file system access, NEVER import backend code directly
- Backend ↔ Database: ONLY through repositories/ folder, ONLY using Supabase client, NEVER raw SQL strings in controllers or services, NEVER database connections outside repositories/ or config/
- Phase 1: Frontend is 100% static, no backend communication
- Phase 2: Frontend will make HTTP calls to API, API will use Supabase client

File organization:
- Routes: api/src/routes/*.routes.ts - routing only no business logic (Phase 2)
- Controllers: api/src/controllers/*.controller.ts - validation + service calls (Phase 2)
- Services: api/src/services/*.service.ts - business logic only (Phase 2)
- Repositories: api/src/repositories/*.repository.ts - Supabase queries only (Phase 2)
- Components: frontend/src/components/[feature]/ComponentName.tsx - one component per file
- Hooks: frontend/src/hooks/use*.ts or frontend/src/shared/hooks/use*.ts
- Types: frontend/src/types/*.ts (frontend-specific)

Naming conventions:
- Routes: *.routes.ts
- Controllers: *.controller.ts
- Services: *.service.ts
- Repositories: *.repository.ts
- Components: PascalCase.tsx
- Hooks: use*.ts
- Utils: *.util.ts or *.helper.ts

Barrel exports:
- ALLOWED: index.ts in feature folders for component exports
- FORBIDDEN: Barrel exports that create circular dependencies
- VALIDATE: Before adding to barrel export, check all imports

Implementation checklist:
1. Location check: Frontend UI → frontend/src/, API endpoint → api/src/routes/ (Phase 2), Business logic → api/src/services/ (Phase 2), Database query → api/src/repositories/ (Phase 2)
2. Import check: Check file location rules, verify no circular dependencies, verify no cross-app imports (frontend ↔ api)
3. Database access check: Frontend → NO (use API call in Phase 2), Backend → YES but only through repositories/ using Supabase client
4. Phase check: Phase 1 is 100% static frontend, Phase 2 adds API and database access

Forbidden patterns auto-reject:
- import ... from 'api/...' in frontend → REJECT use HTTP API calls
- import ... from 'frontend/...' in api → REJECT
- import { createClient } from '@supabase/supabase-js' in frontend → REJECT (use API instead)
- import { pg } from 'pg' in frontend → REJECT
- Controller importing from Routes → REJECT
- Service importing from Controller → REJECT
- Business logic in routes/ → REJECT move to services/
- Database queries in controllers/ → REJECT move to repositories/
- Validation logic in repositories/ → REJECT move to controllers/ or services/
- API calls in repositories/ → REJECT repositories only access Supabase
- Frontend making direct Supabase connection → REJECT (use API in Phase 2)
- Frontend importing backend types directly → REJECT
- Backend importing frontend components → REJECT
- Direct communication between frontend and api folders → REJECT use HTTP/HTTPS only
