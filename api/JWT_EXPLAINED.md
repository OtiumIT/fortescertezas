# Como o JWT Funciona na API

## O que é JWT?

JWT (JSON Web Token) é um padrão para autenticação stateless. É como um "passe de acesso" que o servidor emite após o login e o cliente usa para provar sua identidade em requisições subsequentes.

## Como Funciona na Nossa API

### 1. Login (Criação do Token)

Quando o usuário faz login em `/api/v1/auth/login`:

```typescript
// 1. Usuário envia credenciais
POST /api/v1/auth/login
{
  "username": "admin",
  "password": "senha123"
}

// 2. Servidor valida credenciais
if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
  // 3. Cria um payload com informações do usuário
  const payload = {
    userId: "admin-001",
    username: "admin",
    role: "admin"
  };
  
  // 4. Assina o token com JWT_SECRET
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d" // Token expira em 7 dias
  });
  
  // 5. Retorna o token para o cliente
  return { token, user };
}
```

### 2. Uso do Token (Verificação)

Quando o cliente faz uma requisição autenticada:

```typescript
// 1. Cliente envia token no header
GET /api/v1/admin/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// 2. Middleware de autenticação verifica o token
const token = authHeader.substring(7); // Remove "Bearer "
const decoded = jwt.verify(token, env.JWT_SECRET);

// 3. Se válido, permite acesso
// 4. Se inválido/expirado, retorna 401 Unauthorized
```

### 3. Estrutura do Token JWT

Um JWT tem 3 partes separadas por pontos:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbi0wMDEiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0.signature
│─────────────────────────────────││──────────────────────────────────────────││──────────│
         Header (algoritmo)                    Payload (dados)                  Assinatura
```

- **Header**: Define o algoritmo de criptografia (HS256)
- **Payload**: Contém os dados do usuário (userId, username, role)
- **Signature**: Assinatura digital criada com `JWT_SECRET`

## Por que JWT_SECRET é Crítico?

O `JWT_SECRET` é usado para:
1. **Assinar tokens**: Quando cria um token, usa o secret para gerar a assinatura
2. **Verificar tokens**: Quando recebe um token, usa o secret para verificar se foi assinado pelo mesmo servidor

**Se alguém descobrir o JWT_SECRET:**
- Pode criar tokens falsos
- Pode se passar por qualquer usuário
- Pode acessar áreas administrativas

Por isso, `JWT_SECRET` **DEVE** ser:
- ✅ Longo e aleatório (mínimo 32 caracteres)
- ✅ Único para cada ambiente (dev, produção)
- ✅ Mantido em segredo (nunca no código ou git)
- ✅ Configurado como **Secret** no Cloudflare

## Diferença: Variables vs Secrets

### Variables (vars) - Públicas

```toml
# wrangler.toml
[vars]
NODE_ENV = "production"
CORS_ORIGIN = "https://fcu.otiumit.com.br"
ADMIN_USERNAME = "admin"
```

**Características:**
- ✅ Versionadas no código (git)
- ✅ Visíveis no dashboard
- ✅ Acessíveis via `env.VAR_NAME`
- ❌ **NÃO são criptografadas**
- ❌ **Qualquer pessoa com acesso ao código pode ver**

**Uso:** Configurações não sensíveis (URLs, nomes, flags)

### Secrets - Privadas

```bash
# Configuradas via CLI
wrangler secret put JWT_SECRET
wrangler secret put SUPABASE_URL
wrangler secret put ADMIN_PASSWORD
```

**Características:**
- ✅ Criptografadas no Cloudflare
- ✅ Não versionadas (não vão no git)
- ✅ Acessíveis via `env.SECRET_NAME`
- ✅ **Nunca aparecem em logs ou código**
- ✅ **Apenas quem tem acesso ao Cloudflare pode ver**

**Uso:** Credenciais sensíveis (senhas, API keys, tokens)

## Comparação Visual

| Aspecto | Variables | Secrets |
|---------|-----------|---------|
| **Onde configurar** | `wrangler.toml` ou Dashboard | CLI (`wrangler secret put`) |
| **Versionado no Git** | ✅ Sim | ❌ Não |
| **Criptografado** | ❌ Não | ✅ Sim |
| **Visível no Dashboard** | ✅ Sim (valor completo) | ✅ Sim (apenas nome) |
| **Seguro para credenciais** | ❌ Não | ✅ Sim |
| **Uso recomendado** | Configs públicas | Senhas, API keys, tokens |

## Exemplo Prático

### ❌ ERRADO - JWT_SECRET como Variable

```toml
# wrangler.toml
[vars]
JWT_SECRET = "minha-chave-secreta-123"  # ❌ NUNCA FAÇA ISSO!
```

**Problemas:**
- Fica no git (qualquer um pode ver)
- Não é criptografado
- Qualquer pessoa pode criar tokens falsos

### ✅ CORRETO - JWT_SECRET como Secret

```bash
# Via CLI
wrangler secret put JWT_SECRET
# Digite: minha-chave-super-secreta-e-longa-que-nunca-deve-ser-exposta
```

**Vantagens:**
- Não fica no git
- Criptografado no Cloudflare
- Apenas pessoas autorizadas podem ver

## Fluxo Completo de Autenticação

```
1. Cliente → POST /api/v1/auth/login
   { username: "admin", password: "senha123" }

2. Servidor → Valida credenciais
   ✅ Username correto?
   ✅ Password correto?

3. Servidor → Cria token JWT
   jwt.sign({ userId, username, role }, JWT_SECRET, { expiresIn: "7d" })

4. Servidor → Retorna token
   { token: "eyJhbGc...", user: {...} }

5. Cliente → Armazena token (localStorage, cookie, etc.)

6. Cliente → GET /api/v1/admin/posts
   Header: Authorization: Bearer eyJhbGc...

7. Servidor → Verifica token
   jwt.verify(token, JWT_SECRET)
   ✅ Token válido? → Permite acesso
   ❌ Token inválido? → 401 Unauthorized

8. Servidor → Retorna dados
   { data: [...] }
```

## Por que JWT é Stateless?

**Stateless** = O servidor não precisa armazenar sessões

**Vantagens:**
- ✅ Escalável (múltiplos servidores podem verificar o mesmo token)
- ✅ Rápido (não precisa consultar banco de dados)
- ✅ Funciona bem com Cloudflare Workers (stateless por natureza)

**Como funciona:**
- O token **contém** todas as informações necessárias (userId, role)
- O servidor **verifica** a assinatura (prova que foi criado por ele)
- Não precisa consultar banco de dados para validar

## Resumo

1. **JWT_SECRET** é usado para assinar e verificar tokens
2. **Deve ser Secret** (não Variable) por segurança
3. **Token contém** informações do usuário (payload)
4. **Token é assinado** com JWT_SECRET para garantir autenticidade
5. **Middleware verifica** o token em cada requisição autenticada
6. **Stateless** = não precisa armazenar sessões no servidor
