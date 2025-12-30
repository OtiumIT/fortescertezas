# Guia de Configuração no Cloudflare Workers

## Passo a Passo no Painel do Cloudflare

### 1. Criar o Worker

1. Acesse o [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecione sua conta
3. No menu lateral, clique em **Workers & Pages**
4. Clique em **Create application**
5. Escolha **Create Worker**
6. Dê um nome ao Worker (ex: `fortes-api`)
7. Clique em **Deploy**

### 2. Conectar ao Repositório GitHub (Deploy Automático)

1. No Worker criado, vá em **Settings** > **Versions**
2. Clique em **Connect to Git**
3. Autorize o Cloudflare a acessar seu GitHub
4. Selecione o repositório `fortes` (ou o nome do seu repo)
5. Configure:
   - **Production branch**: `main` (ou `master`)
   - **Root directory**: `api`
   - **Build command**: `npm install`
     - ⚠️ **IMPORTANTE**: Não use `npm run build` aqui!
     - O Wrangler compila automaticamente o TypeScript
     - Apenas instale as dependências
   - **Deploy command**: `npx wrangler deploy`
     - Este comando faz o deploy do Worker após o build
     - O Wrangler compila o TypeScript automaticamente durante o deploy
   - **Output directory**: (deixe vazio - o wrangler gerencia)
   - **Environment variables**: (vamos configurar depois)

### 3. Configurar Variáveis de Ambiente (Secrets)

**IMPORTANTE**: Secrets são valores sensíveis (senhas, chaves) que não aparecem nos logs.

1. No Worker, vá em **Settings** > **Variables and Secrets**
2. Na seção **Secrets**, clique em **Add secret**
3. Adicione cada secret individualmente:

#### Secrets Obrigatórios:

**JWT_SECRET**
- **Name**: `JWT_SECRET`
- **Value**: Uma chave secreta forte (ex: `sua-chave-super-secreta-aqui-123456`)
- **Type**: Secret (encrypted)

**ADMIN_USERNAME**
- **Name**: `ADMIN_USERNAME`
- **Value**: `admin` (ou o username que preferir)
- **Type**: Secret (encrypted)

**ADMIN_PASSWORD**
- **Name**: `ADMIN_PASSWORD`
- **Value**: Sua senha administrativa forte
- **Type**: Secret (encrypted)

#### Variáveis de Ambiente (não são secrets):

Na seção **Environment Variables**, adicione:

**JWT_EXPIRES_IN**
- **Name**: `JWT_EXPIRES_IN`
- **Value**: `7d`
- **Type**: Plain text

**CORS_ORIGIN**
- **Name**: `CORS_ORIGIN`
- **Value**: `https://seudominio.com,https://www.seudominio.com` (substitua pelo seu domínio)
- **Type**: Plain text

**NODE_ENV**
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Type**: Plain text

**DATA_DIR**
- **Name**: `DATA_DIR`
- **Value**: `/dados` (ou caminho relativo aos arquivos JSON)
- **Type**: Plain text

**UPLOADS_DIR**
- **Name**: `UPLOADS_DIR`
- **Value**: `/uploads` (ou considere usar R2 Storage)
- **Type**: Plain text

### 4. Configurar Domínio (Opcional)

Se quiser usar um subdomínio personalizado:

1. No Worker, vá em **Settings** > **Triggers**
2. Em **Routes**, clique em **Add route**
3. Configure:
   - **Route**: `api.seudominio.com/*` (substitua pelo seu domínio)
   - **Zone**: Selecione seu domínio no Cloudflare
   - Clique em **Save**

**OU** se quiser usar o mesmo domínio com path:

1. Configure a rota como: `seudominio.com/api/*`
2. Isso fará a API responder em `https://seudominio.com/api/v1/...`

### 5. Configurar Build Settings (se necessário)

Se o deploy automático não funcionar, ajuste:

1. Vá em **Settings** > **Versions**
2. Clique no ícone de engrenagem ao lado do deploy
3. Configure:
   - **Build command**: `npm install`
     - ⚠️ **NÃO use `npm run build`** - o Wrangler compila automaticamente
   - **Deploy command**: `npx wrangler deploy`
     - Este comando faz o deploy do Worker
   - **Root directory**: `api`
   - **Output directory**: (deixe vazio - o Wrangler gerencia)

### 6. Verificar Deploy

1. Após o deploy, você verá uma URL como: `https://fortes-api.seu-account.workers.dev`
2. Teste a API acessando: `https://fortes-api.seu-account.workers.dev/health`
3. Deve retornar: `{"status":"ok","timestamp":"..."}`

### 7. Configurar o Frontend

No Cloudflare Pages (frontend), configure:

1. Vá em **Settings** > **Environment variables**
2. Adicione:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://fortes-api.seu-account.workers.dev/api/v1` (ou sua URL customizada)
   - **Environment**: Production, Preview, Development

## Resumo das Configurações

### Secrets (Settings > Variables and Secrets > Secrets):
```
✅ JWT_SECRET
✅ ADMIN_USERNAME
✅ ADMIN_PASSWORD
```

### Environment Variables (Settings > Variables and Secrets > Environment Variables):
```
✅ JWT_EXPIRES_IN = 7d
✅ CORS_ORIGIN = https://seudominio.com,https://www.seudominio.com
✅ NODE_ENV = production
✅ DATA_DIR = /dados
✅ UPLOADS_DIR = /uploads
```

### Build Settings (Settings > Versions):
```
✅ Root directory: api
✅ Build command: npm install
✅ Deploy command: npx wrangler deploy
✅ Output directory: (vazio - Wrangler gerencia)
```

**⚠️ IMPORTANTE sobre Build Command:**
- **NÃO use**: `npm install && npm run build`
- **USE apenas**: `npm install`
- O Wrangler compila o TypeScript automaticamente usando o `wrangler.toml`
- O `npm run build` (que executa `tsc`) não é necessário e pode causar conflitos

## Troubleshooting

### Erro: "JWT_SECRET is required"
- Verifique se o secret `JWT_SECRET` foi adicionado corretamente
- Certifique-se de que está marcado como **Secret** (não Plain text)

### Erro: "Cannot find module"
- Verifique se o **Root directory** está configurado como `api`
- Certifique-se de que o `package.json` está na pasta `api/`

### Erro: "File not found" (arquivos JSON)
- Os arquivos da pasta `dados/` precisam estar incluídos no bundle
- Verifique se a pasta `dados/` está no repositório Git
- Considere ajustar `DATA_DIR` para um caminho relativo

### API não responde
- Verifique os logs em **Logs** > **Real-time Logs**
- Teste o endpoint `/health` primeiro
- Verifique se o Worker está ativo (não pausado)

## URLs Finais

Após configurar tudo:

- **API Worker URL**: `https://fortes-api.seu-account.workers.dev`
- **API com subdomínio**: `https://api.seudominio.com` (se configurado)
- **API com path**: `https://seudominio.com/api` (se configurado)
- **Health check**: `https://sua-url/health`
- **API base**: `https://sua-url/api/v1`
