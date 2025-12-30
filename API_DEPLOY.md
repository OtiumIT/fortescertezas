# Guia de Deploy da API

## Como a API Funciona

A API é um servidor Hono que:
- **Roda em uma porta** (padrão: 3007) quando executada localmente com Node.js
- **Expõe endpoints REST** em `/api/v1/*`
- **Funciona em Cloudflare Workers** com `nodejs_compat` habilitado
- **Não precisa de porta visível** quando deployada em Workers (usa URL diretamente)

## Opções de Deploy

### Opção 1: Cloudflare Workers (Recomendado - Gratuito)

**Vantagens:**
- ✅ Gratuito até 100.000 requisições/dia
- ✅ Sem gerenciar servidor/porta
- ✅ CDN global (muito rápido)
- ✅ Mesmo domínio do Cloudflare Pages
- ✅ Suporta Node.js APIs com `nodejs_compat`

**Como funciona:**
- A API usa `nodejs_compat` para habilitar APIs do Node.js (`fs`, `path`, etc.)
- Você cria um Worker no Cloudflare
- O Worker recebe requisições em uma URL como: `https://api.seudominio.com` ou `https://seudominio.com/api`
- **Não precisa configurar porta** - o Cloudflare gerencia isso

**Configuração:**
1. No Cloudflare Dashboard, vá em Workers & Pages
2. Crie um novo Worker
3. Conecte seu repositório GitHub
4. Configure:
   - **Root Directory**: `api`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: (deixe vazio, wrangler gerencia)
   - **Entry point**: `src/index.ts` (wrangler compila automaticamente)

**Variáveis de Ambiente no Cloudflare Worker:**
Configure via Secrets no painel do Cloudflare:
```
JWT_SECRET=sua-chave-secreta-muito-forte
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://seudominio.com,https://www.seudominio.com
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua-senha-segura
```

**Nota sobre DATA_DIR e UPLOADS_DIR:**
- Os arquivos JSON devem estar incluídos no bundle do Worker
- Para uploads, considere usar Cloudflare R2 Storage (recomendado)
- Ou configure `DATA_DIR` e `UPLOADS_DIR` como caminhos relativos no bundle

**URL da API:**
- Se usar subdomínio: `https://api.seudominio.com/api/v1`
- Se usar path: `https://seudominio.com/api/v1`

**Deploy via CLI:**
```bash
cd api
npm install
npm run deploy
```

**Configuração do wrangler.toml:**
O arquivo `wrangler.toml` já está configurado com `nodejs_compat` habilitado, permitindo o uso de APIs do Node.js (`fs`, `path`, etc.) dentro do Worker.

**Importante sobre arquivos JSON:**
- Os arquivos JSON da pasta `dados/` precisam estar incluídos no bundle do Worker
- O Wrangler automaticamente inclui arquivos estáticos quando faz o build
- Certifique-se de que a pasta `dados/` está acessível no Worker (pode precisar ajustar `DATA_DIR`)

---

### Opção 2: Railway (Pago mas simples)

**Vantagens:**
- ✅ Muito fácil de configurar
- ✅ Deploy automático do GitHub
- ✅ $5/mês (plano básico)
- ✅ Suporta Node.js nativamente

**Como funciona:**
- Railway cria um servidor para você
- Você recebe uma URL automática: `https://sua-api.railway.app`
- **A porta é gerenciada automaticamente** - você só precisa da URL

**Configuração:**
1. Acesse [Railway.app](https://railway.app) e crie uma conta
2. Conecte seu repositório GitHub
3. Crie um novo projeto e adicione um serviço
4. Configure:
   - **Root Directory**: `api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Port**: Railway detecta automaticamente via variável `PORT` (ou use a porta padrão)

**Variáveis de Ambiente no Railway:**
```
PORT=3007 (ou deixe Railway gerenciar - ele define automaticamente)
JWT_SECRET=sua-chave-secreta-muito-forte-aqui
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://seudominio.com,https://www.seudominio.com
NODE_ENV=production
DATA_DIR=/app/dados
UPLOADS_DIR=/app/uploads
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua-senha-segura-aqui
```

**Nota sobre DATA_DIR e UPLOADS_DIR:**
- Railway cria um volume persistente automaticamente
- Você pode usar caminhos relativos ou absolutos
- Os arquivos JSON ficam no repositório Git, então podem ser copiados no build

**URL da API:**
- `https://sua-api.railway.app/api/v1`

---

### Opção 3: Render (Gratuito com limitações)

**Vantagens:**
- ✅ Plano gratuito disponível
- ✅ Deploy automático
- ⚠️ Serviço "dorme" após inatividade (primeira requisição é lenta)

**Configuração:**
1. Conecte repositório no Render
2. Crie um novo "Web Service"
3. Configure:
   - **Root Directory**: `api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

**Variáveis de Ambiente:**
```
PORT=10000 (Render usa porta 10000)
JWT_SECRET=sua-chave-secreta
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://seudominio.com
NODE_ENV=production
DATA_DIR=/opt/render/project/src/dados
UPLOADS_DIR=/opt/render/project/src/uploads
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua-senha
```

**URL da API:**
- `https://sua-api.onrender.com/api/v1`

---

### Opção 4: VPS/Servidor Próprio

Se você tem um servidor próprio:

**Configuração:**
1. Instale Node.js no servidor
2. Configure um reverse proxy (Nginx) para:
   - Receber requisições em `https://api.seudominio.com`
   - Encaminhar para `http://localhost:3007`
3. Use PM2 para gerenciar o processo:
   ```bash
   pm2 start dist/index.js --name fortes-api
   pm2 save
   pm2 startup
   ```

**Nginx Config:**
```nginx
server {
    listen 80;
    server_name api.seudominio.com;
    
    location / {
        proxy_pass http://localhost:3007;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Configuração do Frontend

Depois de fazer deploy da API, configure a variável de ambiente no Cloudflare Pages:

**Variável:**
- **Nome**: `VITE_API_URL`
- **Valor**: URL completa da sua API (ex: `https://api.seudominio.com/api/v1`)

---

## Checklist de Deploy

- [ ] API deployada em um serviço
- [ ] URL da API funcionando (teste: `https://sua-api.com/api/v1/content/homepage`)
- [ ] Variável `VITE_API_URL` configurada no Cloudflare Pages
- [ ] CORS configurado na API para aceitar o domínio do frontend
- [ ] Variáveis de ambiente da API configuradas (JWT_SECRET, etc.)
- [ ] Teste de login administrativo funcionando

---

## Exemplo de URLs Finais

**Cenário 1: Subdomínio**
- Frontend: `https://www.seudominio.com`
- API: `https://api.seudominio.com/api/v1`

**Cenário 2: Mesmo domínio**
- Frontend: `https://seudominio.com`
- API: `https://seudominio.com/api/v1` (usando Cloudflare Workers com path routing)

---

## Importante

⚠️ **A API NÃO precisa expor uma porta publicamente!**

Quando você faz deploy em serviços modernos:
- **Railway/Render**: Eles criam uma URL HTTPS para você (porta gerenciada internamente)
- **Cloudflare Workers**: Não usa porta, usa URL diretamente
- **VPS**: Você usa Nginx para receber na porta 80/443 e encaminhar para a porta interna

O frontend só precisa saber a **URL completa da API**, não a porta!
