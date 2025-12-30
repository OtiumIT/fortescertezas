# Guia de Deploy no Cloudflare Pages

## Configuração do Frontend no Cloudflare Pages

### Configurações Básicas

1. **Framework preset**: `Vite`
2. **Build command**: `cd frontend && npm install && npm run build`
3. **Build output directory**: `frontend/dist`
4. **Root directory**: `/` (raiz do repositório)

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Cloudflare Pages:

```
VITE_API_URL=https://sua-api-url.com/api/v1
```

**Importante**: Substitua `https://sua-api-url.com` pela URL real da sua API.

### Configuração Detalhada

#### No painel do Cloudflare Pages:

1. **Project name**: `fortes-certezas` (ou o nome que preferir)

2. **Production branch**: `main` (ou `master`)

3. **Build settings**:
   - **Framework preset**: `Vite`
   - **Build command**: 
     ```bash
     cd frontend && npm install && npm run build
     ```
   - **Build output directory**: 
     ```
     frontend/dist
     ```
   - **Root directory**: 
     ```
     /
     ```

4. **Environment variables** (Settings > Environment variables):
   - **Variable name**: `VITE_API_URL`
   - **Value**: URL completa da sua API (ex: `https://api.fortes-certezas.com/api/v1`)
   - **Environment**: Production, Preview, Development

### Comandos Alternativos (se necessário)

Se o Cloudflare não detectar automaticamente o Vite, use:

**Build command**:
```bash
cd frontend && npm ci && npm run build
```

**Ou se preferir yarn**:
```bash
cd frontend && yarn install && yarn build
```

## Deploy da API

A API precisa ser deployada separadamente. Opções:

### Opção 1: Cloudflare Workers (Recomendado)

1. Crie um novo Worker no Cloudflare
2. Configure o build:
   - **Build command**: `cd api && npm install && npm run build`
   - **Output directory**: `api/dist`

### Opção 2: Outro serviço (Railway, Render, etc.)

Configure a API em um serviço que suporte Node.js:
- **Build command**: `cd api && npm install && npm run build`
- **Start command**: `cd api && npm start`
- **Port**: Configure a variável `PORT` (padrão: 3007)

## Checklist de Deploy

- [ ] Frontend configurado no Cloudflare Pages
- [ ] Variável `VITE_API_URL` configurada
- [ ] API deployada e acessível
- [ ] CORS configurado na API para aceitar o domínio do Cloudflare Pages
- [ ] Arquivo `robots.txt` presente em `frontend/public/`
- [ ] Meta tags `noindex/nofollow` configuradas (se necessário)

## Verificação Pós-Deploy

1. Acesse o site no domínio do Cloudflare Pages
2. Verifique se as requisições à API estão funcionando
3. Teste o login administrativo
4. Verifique se o `robots.txt` está acessível em `https://seu-dominio.com/robots.txt`

## Troubleshooting

### Erro: "Cannot find module"
- Verifique se o `Root directory` está configurado corretamente
- Certifique-se de que o comando `cd frontend` está no build command

### Erro: "API request failed"
- Verifique se a variável `VITE_API_URL` está configurada
- Verifique se a API está acessível e o CORS está configurado

### Build falha
- Verifique os logs de build no Cloudflare Pages
- Certifique-se de que todas as dependências estão no `package.json`
