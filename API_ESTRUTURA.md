# Estrutura da API - Fortes Certezas

## Visão Geral

A API será criada desde o início para gerenciar o CMS. O frontend se comunicará exclusivamente via HTTP/HTTPS com a API para:
- **Leitura**: Obter conteúdo público do site
- **Escrita**: Administradores editam conteúdo via API (protegido)

## Arquitetura

### Stack Tecnológica
- **Framework**: Hono (conforme regras)
- **Runtime**: Node.js
- **Linguagem**: TypeScript (obrigatório)
- **Armazenamento**: Arquivos JSON no repositório (Fase 1)
- **Autenticação**: JWT simples ou session-based

### Estrutura de Pastas

```
api/
├── src/
│   ├── routes/              # Definições de rotas apenas
│   │   ├── public.routes.ts      # Rotas públicas (GET)
│   │   ├── admin.routes.ts       # Rotas administrativas (CRUD)
│   │   ├── auth.routes.ts        # Autenticação
│   │   └── index.ts              # Agregação de rotas
│   ├── controllers/         # Validação e chamadas de serviços
│   │   ├── content.controller.ts
│   │   ├── services.controller.ts
│   │   ├── jobs.controller.ts
│   │   ├── contacts.controller.ts
│   │   ├── applications.controller.ts
│   │   └── auth.controller.ts
│   ├── services/            # Lógica de negócio
│   │   ├── content.service.ts
│   │   ├── services.service.ts
│   │   ├── jobs.service.ts
│   │   ├── contacts.service.ts
│   │   ├── applications.service.ts
│   │   └── auth.service.ts
│   ├── repositories/        # Acesso a dados (JSON)
│   │   ├── content.repository.ts
│   │   ├── services.repository.ts
│   │   ├── jobs.repository.ts
│   │   ├── contacts.repository.ts
│   │   └── applications.repository.ts
│   ├── middleware/          # Middlewares reutilizáveis
│   │   ├── auth.middleware.ts      # Verificação de autenticação
│   │   ├── error-handler.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── validation.middleware.ts
│   ├── lib/                # Utilitários e helpers
│   │   ├── json-storage.ts        # Funções para ler/escrever JSON
│   │   ├── validation.ts          # Schemas de validação (Zod)
│   │   ├── logger.ts               # Sistema de logs
│   │   └── utils.ts
│   ├── types/              # Tipos TypeScript
│   │   ├── content.types.ts
│   │   ├── job.types.ts
│   │   ├── contact.types.ts
│   │   └── auth.types.ts
│   ├── config/             # Configurações
│   │   ├── env.ts                 # Variáveis de ambiente
│   │   └── constants.ts
│   └── index.ts            # Entry point
├── package.json
├── tsconfig.json
└── .env.example
```

## Endpoints da API

### Base URL
```
/api/v1
```

### Rotas Públicas (GET)

#### Conteúdo do Site
```
GET /api/v1/content/homepage
GET /api/v1/content/about
GET /api/v1/content/contact
GET /api/v1/content/seo
```

#### Serviços
```
GET /api/v1/services              # Lista todos os serviços
GET /api/v1/services/:id         # Detalhes de um serviço
```

#### Vagas
```
GET /api/v1/jobs                  # Lista vagas ativas
GET /api/v1/jobs/:id              # Detalhes de uma vaga
```

### Rotas de Envio (POST) - Públicas

#### Contato
```
POST /api/v1/contacts
Body: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
```

#### Candidatura
```
POST /api/v1/applications
Body: FormData {
  jobId: string
  name: string
  email: string
  phone: string
  message?: string
  resume: File (PDF)
}
```

### Rotas Administrativas (Protegidas)

#### Autenticação
```
POST /api/v1/auth/login
Body: {
  username: string
  password: string
}
Response: {
  token: string
  user: { id, username }
}

POST /api/v1/auth/logout
GET /api/v1/auth/me              # Verificar sessão atual
```

#### Conteúdo (CRUD)
```
GET    /api/v1/admin/content/:section    # Obter conteúdo
PUT    /api/v1/admin/content/:section    # Atualizar conteúdo
PATCH  /api/v1/admin/content/:section    # Atualização parcial
```

#### Serviços (CRUD)
```
GET    /api/v1/admin/services            # Lista todos
POST   /api/v1/admin/services            # Criar
GET    /api/v1/admin/services/:id       # Obter um
PUT    /api/v1/admin/services/:id        # Atualizar
DELETE /api/v1/admin/services/:id        # Deletar
```

#### Vagas (CRUD)
```
GET    /api/v1/admin/jobs                # Lista todas
POST   /api/v1/admin/jobs                # Criar
GET    /api/v1/admin/jobs/:id            # Obter uma
PUT    /api/v1/admin/jobs/:id            # Atualizar
DELETE /api/v1/admin/jobs/:id            # Deletar
```

#### Contatos (Leitura e Gestão)
```
GET    /api/v1/admin/contacts            # Lista todos
GET    /api/v1/admin/contacts/:id        # Detalhes
PATCH  /api/v1/admin/contacts/:id        # Atualizar status
DELETE /api/v1/admin/contacts/:id       # Deletar
```

#### Candidaturas (Leitura e Gestão)
```
GET    /api/v1/admin/applications        # Lista todas
GET    /api/v1/admin/applications/:id    # Detalhes
GET    /api/v1/admin/applications/job/:jobId  # Por vaga
PATCH  /api/v1/admin/applications/:id    # Atualizar status
DELETE /api/v1/admin/applications/:id    # Deletar
GET    /api/v1/admin/applications/:id/resume  # Download currículo
```

#### Uploads
```
POST   /api/v1/admin/upload               # Upload de imagens/arquivos
Body: FormData { file: File }
Response: {
  url: string
  filename: string
}
```

## Fluxo de Dados

### Leitura (Público)
1. Frontend faz requisição GET para API
2. API lê arquivo JSON correspondente
3. API retorna dados formatados
4. Frontend renderiza conteúdo

### Escrita (Admin)
1. Admin faz login → recebe token JWT
2. Admin faz requisição PUT/POST/DELETE com token
3. Middleware valida token
4. Controller valida dados
5. Service processa lógica de negócio
6. Repository escreve no JSON
7. API retorna sucesso/erro

## Repositório de Dados (JSON)

### Estrutura de Arquivos
```
dados/
├── site-content.json
├── services.json
├── jobs.json
├── contacts.json
├── applications.json
├── testimonials.json
├── team.json
└── uploads/              # Arquivos enviados
    ├── images/
    └── resumes/
```

### Funções do Repositório
- `readJsonFile(filePath: string): Promise<T>`
- `writeJsonFile(filePath: string, data: T): Promise<void>`
- `appendToJsonArray(filePath: string, item: T): Promise<void>`
- `updateJsonArrayItem(filePath: string, id: string, updates: Partial<T>): Promise<void>`
- `deleteJsonArrayItem(filePath: string, id: string): Promise<void>`

## Autenticação

### Estratégia
- **JWT** (JSON Web Tokens) simples
- Token armazenado em variável de ambiente ou arquivo de configuração
- Usuários admin em arquivo JSON ou variável de ambiente

### Middleware de Autenticação
```typescript
// Verifica token JWT no header Authorization
// Protege rotas /admin/**
```

### Estrutura de Usuário
```json
{
  "id": "admin-001",
  "username": "admin",
  "passwordHash": "...",  // bcrypt
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Validação

### Biblioteca
- **Zod** para validação de schemas

### Schemas de Validação
- Validação de inputs em controllers
- Validação de tipos, formatos, tamanhos
- Mensagens de erro claras

## Tratamento de Erros

### Estrutura de Resposta de Erro
```json
{
  "error": "Mensagem de erro",
  "code": "ERROR_CODE",
  "details": { ... }
}
```

### Códigos HTTP
- 200: Sucesso
- 201: Criado
- 400: Bad Request (validação)
- 401: Unauthorized (não autenticado)
- 403: Forbidden (sem permissão)
- 404: Not Found
- 500: Internal Server Error

## Segurança

### Implementações
- ✅ Validação de todos os inputs
- ✅ Sanitização de strings
- ✅ Rate limiting (rotas públicas e admin)
- ✅ CORS configurado
- ✅ Headers de segurança
- ✅ Autenticação JWT
- ✅ Hash de senhas (bcrypt)
- ✅ Validação de tipos de arquivo (uploads)
- ✅ Limite de tamanho de arquivos

## Logging

### Sistema de Logs
- Logs de requisições
- Logs de erros
- Logs de operações administrativas
- Contexto: userId, requestId, timestamp

## Performance

### Otimizações
- Cache de leitura de JSONs (em memória, TTL)
- Compressão de respostas
- Rate limiting para prevenir abuso
- Validação rápida com Zod

## Deploy

### Ambiente
- **Desenvolvimento**: Local com Node.js
- **Produção**: Cloudflare Workers ou similar
- Variáveis de ambiente para configuração

## Próximos Passos

1. Setup do projeto API (Hono + TypeScript)
2. Implementar repositório de JSON
3. Criar rotas públicas (GET)
4. Implementar autenticação
5. Criar rotas administrativas (CRUD)
6. Implementar uploads
7. Adicionar validações e segurança
8. Testes e documentação
