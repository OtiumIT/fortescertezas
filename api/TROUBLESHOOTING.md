# Troubleshooting - API Fortes Certezas

## Erro: "Internal server error" em Produção

Se você está recebendo `{"error":"Internal server error","code":"INTERNAL_ERROR"}` em produção, siga estes passos:

### 1. Verificar se as variáveis de ambiente estão configuradas

As variáveis do Supabase **DEVEM** estar configuradas como **Secrets** no Cloudflare Workers:

```bash
# Verificar secrets configurados
wrangler secret list

# Configurar secrets (se não estiverem configurados)
wrangler secret put SUPABASE_URL
# Cole: https://seu-projeto.supabase.co

wrangler secret put SUPABASE_ANON_KEY
# Cole: sua-chave-anon-do-supabase

wrangler secret put SUPABASE_SERVICE_KEY
# Cole: sua-service-key-do-supabase (opcional)

wrangler secret put JWT_SECRET
# Cole: sua-chave-secreta-jwt

wrangler secret put ADMIN_PASSWORD
# Cole: sua-senha-admin
```

### 2. Verificar logs no Cloudflare

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá em **Workers & Pages** > **api-fortescertezas**
3. Clique em **Logs** ou **Real-time Logs**
4. Procure por mensagens de erro que começam com:
   - `[env] ❌ ERRO CRÍTICO`
   - `[supabase] ❌ ERRO`
   - `[posts.repository]`

### 3. Verificar se o deploy foi feito corretamente

```bash
# Fazer build
npm run build

# Fazer deploy
npm run deploy
# ou
wrangler deploy
```

### 4. Testar endpoint de health

```bash
curl https://api-fcu.otiumit.com.br/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"2024-..."}
```

### 5. Testar endpoint que usa Supabase

```bash
curl https://api-fcu.otiumit.com.br/api/v1/posts?status=active
```

Se retornar erro, verifique os logs no Cloudflare para ver a mensagem exata.

### 6. Problemas comuns

#### Problema: "Supabase URL and Anon Key must be configured"

**Solução**: Configure os secrets no Cloudflare:
```bash
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
```

#### Problema: "Failed to fetch posts"

**Possíveis causas**:
1. Tabela `posts` não existe no Supabase
2. RLS (Row-Level Security) bloqueando acesso
3. Credenciais incorretas

**Solução**:
1. Execute o schema SQL em `api/supabase/schema.sql` no Supabase
2. Verifique as políticas RLS no Supabase
3. Verifique se as credenciais estão corretas

#### Problema: Erro 500 genérico sem detalhes

**Solução**: Verifique os logs no Cloudflare Dashboard. Os logs agora incluem mensagens detalhadas sobre o que está falhando.

### 7. Verificar configuração local vs produção

**Local (.dev.vars)**:
```bash
# Arquivo: api/.dev.vars
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=eyJ...
```

**Produção (Cloudflare Secrets)**:
```bash
# Configure via CLI ou Dashboard
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
```

### 8. Re-deploy após configurar secrets

Após configurar os secrets, faça um novo deploy:

```bash
npm run build
npm run deploy
```

### 9. Contato

Se o problema persistir, verifique:
- Logs no Cloudflare Dashboard
- Status do Supabase (https://status.supabase.com)
- Mensagens de erro específicas nos logs
