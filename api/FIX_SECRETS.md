# Como Corrigir o Problema das Variáveis do Supabase

## Problema Identificado

Os logs mostram que `SUPABASE_URL` e `SUPABASE_ANON_KEY` **não estão sendo passadas no `workerEnv`**, mesmo que estejam configuradas no dashboard do Cloudflare.

**Logs mostram:**
```
workerEnv keys: ADMIN_USERNAME, CORS_ORIGIN, DATA_DIR, JWT_EXPIRES_IN, NODE_ENV, UPLOADS_DIR
SUPABASE_URL presente: false
SUPABASE_ANON_KEY presente: false
```

## Solução

No Cloudflare Workers, variáveis sensíveis (como credenciais do Supabase) **DEVEM** ser configuradas como **Secrets** via CLI, não apenas no dashboard.

### Passo 1: Remover do Dashboard (se necessário)

Se você configurou as variáveis no dashboard como "Environment Variables", elas podem não estar sendo passadas corretamente. É melhor usar apenas Secrets via CLI.

### Passo 2: Configurar como Secrets via CLI

Execute os seguintes comandos no terminal (na pasta `api/`):

```bash
cd api

# Configure cada secret (será solicitado o valor)
wrangler secret put SUPABASE_URL
# Cole: https://jtgdugrmyjpfthkbjlgl.supabase.co

wrangler secret put SUPABASE_ANON_KEY
# Cole: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Z2R1Z3JteWpwZnRoa2JqbGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMjgyMTcsImV4cCI6MjA4MjcwNDIxN30.aJ8Cc0gKwQIeFi5Z6SEoRvsa0zsmZER-8kMnPzKGn_c

wrangler secret put SUPABASE_SERVICE_KEY
# Cole: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0Z2R1Z3JteWpwZnRoa2JqbGdsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzEyODIxNywiZXhwIjoyMDgyNzA0MjE3fQ.l0F-9DN67USqVLM5WTab2B9fF1yXmh3kNfBzOWDc6Tw

wrangler secret put JWT_SECRET
# Cole: sua-chave-jwt-secreta

wrangler secret put ADMIN_PASSWORD
# Cole: FortesCertezas2026!
```

### Passo 3: Verificar Secrets Configurados

```bash
wrangler secret list
```

Deve mostrar todas as secrets configuradas, incluindo:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY
- JWT_SECRET
- ADMIN_PASSWORD

### Passo 4: Fazer Deploy

Após configurar os secrets, faça um novo deploy:

```bash
npm run build
npm run deploy
```

### Passo 5: Testar

Após o deploy, teste novamente:

```bash
curl https://api-fcu.otiumit.com.br/api/v1/posts?status=active
```

Os logs agora devem mostrar:
```
workerEnv keys: ..., SUPABASE_URL, SUPABASE_ANON_KEY, ...
SUPABASE_URL presente: true
SUPABASE_ANON_KEY presente: true
```

## Diferença entre Variables e Secrets

- **Variables (vars)**: Configuradas no `wrangler.toml` ou dashboard, são públicas e versionadas
- **Secrets**: Configuradas via `wrangler secret put`, são criptografadas e não versionadas

Para credenciais sensíveis como Supabase, **sempre use Secrets**.

## Nota Importante

Se você já configurou as variáveis no dashboard, elas podem estar conflitando. O Cloudflare Workers prioriza Secrets sobre Variables, então configurar via CLI deve resolver o problema.
