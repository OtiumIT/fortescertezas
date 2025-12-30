# Configuração do Supabase

## Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Anote a **URL do projeto** e as **API Keys**

## Passo 2: Executar o Schema SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Abra o arquivo `api/supabase/schema.sql`
3. Copie e cole o conteúdo no SQL Editor
4. Execute o script (botão "Run")

Isso criará todas as tabelas necessárias:
- `site_content`
- `posts`
- `services`
- `jobs`
- `contacts`
- `applications`
- `team`
- `testimonials`

## Passo 3: Configurar Variáveis de Ambiente

### No Cloudflare Workers (Produção):

Configure os seguintes **Secrets**:

```bash
# Via CLI
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_ANON_KEY
wrangler secret put SUPABASE_SERVICE_KEY  # Opcional, para operações admin
```

Ou via Painel Cloudflare:
- Workers > seu-worker > Settings > Variables > Secrets
- Adicione:
  - `SUPABASE_URL` = `https://seu-projeto.supabase.co`
  - `SUPABASE_ANON_KEY` = `sua-chave-anon`
  - `SUPABASE_SERVICE_KEY` = `sua-service-key` (opcional)

### Para Desenvolvimento Local:

Crie um arquivo `.env` em `api/`:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_KEY=sua-service-key
```

## Passo 4: Migrar Dados dos JSONs para Supabase

Execute o script de migração:

```bash
cd api
npm run migrate-to-supabase
```

Este script irá:
- Ler todos os arquivos JSON de `dados/`
- Migrar para as tabelas correspondentes no Supabase
- Manter os IDs existentes (usando `upsert`)

## Passo 5: Verificar Funcionamento

Após configurar, a API automaticamente:
- **Usa Supabase** se `SUPABASE_URL` e `SUPABASE_ANON_KEY` estiverem configurados
- **Faz fallback para JSON** se Supabase não estiver disponível

Teste fazendo uma requisição:
```bash
curl https://sua-api.com/api/v1/posts
```

## Como Funciona

O código detecta automaticamente se Supabase está configurado:

- ✅ **Se `SUPABASE_URL` e `SUPABASE_ANON_KEY` existem**: Usa Supabase
- ⚠️ **Se não existem ou falham**: Usa JSON como fallback

Isso permite uma migração gradual sem quebrar o sistema.

## Troubleshooting

### Erro: "Supabase URL and Anon Key must be configured"
- Verifique se as variáveis estão configuradas corretamente
- No desenvolvimento local, certifique-se de ter um arquivo `.env`

### Erro: "Failed to fetch posts: ..."
- Verifique se o schema SQL foi executado
- Verifique se as políticas RLS estão configuradas corretamente
- Verifique os logs do Supabase no painel

### Dados não aparecem
- Execute o script de migração: `npm run migrate-to-supabase`
- Verifique se os dados foram inseridos no Supabase (SQL Editor > Table Editor)
