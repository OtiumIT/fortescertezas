# Como Corrigir CORS - API não aceita chamadas de fcu.otiumit.com.br

## Problema
A API está rejeitando requisições do domínio `fcu.otiumit.com.br` devido à configuração de CORS.

## Solução

### 1. Configurar CORS_ORIGIN no Cloudflare Workers

No painel do Cloudflare Workers:

1. Vá em **Settings** > **Variables and Secrets**
2. Na seção **Environment Variables**, encontre ou adicione:
   - **Name**: `CORS_ORIGIN`
   - **Value**: `https://fcu.otiumit.com.br,https://www.fcu.otiumit.com.br,http://localhost:5173`
   - **Type**: Plain text

**Importante**: 
- Separe múltiplos domínios com vírgula
- Inclua todas as variações (com/sem www, com/sem https)
- Não deixe espaços extras

### 2. Verificar se está configurado corretamente

Após configurar, faça um novo deploy. O middleware de CORS agora:
- ✅ Aceita variações do domínio (com/sem www, com/sem https)
- ✅ Aceita subdomínios
- ✅ Permite todas as origens se `CORS_ORIGIN` não estiver configurado (apenas em desenvolvimento)

### 3. Testar

Após o deploy, teste fazendo uma requisição do frontend:

```javascript
fetch('https://sua-api.workers.dev/api/v1/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => console.log(data));
```

### 4. Verificar logs

Se ainda não funcionar, verifique os logs no Cloudflare:
- **Logs** > **Real-time Logs**
- Procure por mensagens de CORS

### 5. Valores de exemplo para CORS_ORIGIN

```
https://fcu.otiumit.com.br,https://www.fcu.otiumit.com.br,http://localhost:5173
```

Ou se quiser permitir apenas o domínio principal:

```
https://fcu.otiumit.com.br
```

## Troubleshooting

### Erro: "Access to fetch has been blocked by CORS policy"
- Verifique se `CORS_ORIGIN` está configurado no Cloudflare Workers
- Verifique se o domínio está exatamente como aparece no erro do navegador
- Certifique-se de que fez um novo deploy após configurar a variável

### Ainda não funciona
- Verifique os logs do Worker em tempo real
- Teste com `*` temporariamente para ver se é problema de CORS ou outro
- Certifique-se de que o frontend está fazendo requisições para a URL correta da API
