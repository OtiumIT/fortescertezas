# API Fortes Certezas

API REST para gestão de conteúdo do site Fortes Certezas, construída com Hono e TypeScript.

## Estrutura

A API segue a arquitetura em camadas:

- **Routes** → Definições de rotas apenas
- **Controllers** → Validação e chamadas de serviços
- **Services** → Lógica de negócio
- **Repositories** → Acesso a dados (JSON)

## Setup

### Instalação

```bash
cd api
npm install
```

### Configuração

Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
PORT=3007
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
DATA_DIR=../dados
UPLOADS_DIR=../frontend/public/uploads
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Executar

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

## Endpoints

### Base URL
```
http://localhost:3007/api/v1
```

### Rotas Públicas

- `GET /api/v1/content/:section` - Obter conteúdo (homepage, about, contact, seo)
- `GET /api/v1/services` - Listar serviços
- `GET /api/v1/services/:id` - Detalhes do serviço
- `GET /api/v1/jobs` - Listar vagas ativas
- `GET /api/v1/jobs/:id` - Detalhes da vaga
- `POST /api/v1/contacts` - Enviar contato
- `POST /api/v1/applications` - Enviar candidatura

### Autenticação

- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Verificar sessão
- `POST /api/v1/auth/logout` - Logout

### Rotas Administrativas (Requerem autenticação)

- `GET /api/v1/admin/content/:section` - Obter conteúdo
- `PUT /api/v1/admin/content/:section` - Atualizar conteúdo
- `GET /api/v1/admin/services` - Listar todos os serviços
- `POST /api/v1/admin/services` - Criar serviço
- `PUT /api/v1/admin/services/:id` - Atualizar serviço
- `DELETE /api/v1/admin/services/:id` - Deletar serviço
- `GET /api/v1/admin/jobs` - Listar todas as vagas
- `POST /api/v1/admin/jobs` - Criar vaga
- `PUT /api/v1/admin/jobs/:id` - Atualizar vaga
- `DELETE /api/v1/admin/jobs/:id` - Deletar vaga
- `GET /api/v1/admin/contacts` - Listar contatos
- `GET /api/v1/admin/contacts/:id` - Detalhes do contato
- `PATCH /api/v1/admin/contacts/:id` - Atualizar status do contato
- `DELETE /api/v1/admin/contacts/:id` - Deletar contato
- `GET /api/v1/admin/applications` - Listar candidaturas
- `GET /api/v1/admin/applications/:id` - Detalhes da candidatura
- `PATCH /api/v1/admin/applications/:id` - Atualizar status da candidatura
- `DELETE /api/v1/admin/applications/:id` - Deletar candidatura

## Autenticação

Para acessar rotas administrativas, é necessário fazer login e incluir o token no header:

```http
Authorization: Bearer {token}
```

## Armazenamento

Os dados são armazenados em arquivos JSON na pasta `dados/`:

- `site-content.json` - Conteúdo do site
- `services.json` - Serviços
- `jobs.json` - Vagas
- `contacts.json` - Contatos recebidos
- `applications.json` - Candidaturas recebidas

## Validação

A API usa Zod para validação de dados. Erros de validação retornam status 400 com detalhes.

## Segurança

- ✅ Validação de todos os inputs
- ✅ Autenticação JWT
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Sanitização de strings
- ✅ Validação de tipos de arquivo

## Desenvolvimento

### Estrutura de Pastas

```
api/
├── src/
│   ├── config/         # Configurações
│   ├── controllers/    # Controllers
│   ├── lib/           # Utilitários
│   ├── middleware/    # Middlewares
│   ├── repositories/  # Repositórios
│   ├── routes/        # Rotas
│   ├── services/      # Serviços
│   ├── types/         # Tipos TypeScript
│   └── index.ts       # Entry point
├── package.json
└── tsconfig.json
```

### Scripts

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Compilar TypeScript
- `npm start` - Executar produção
- `npm run type-check` - Verificar tipos

## Notas

- A API está preparada para migração futura para Supabase
- Os dados são versionados via Git
- Uploads são salvos em `../frontend/public/uploads/` (relativo à raiz do projeto)
- A pasta `dados/` está na raiz do projeto, junto com `api/` e `frontend/`
