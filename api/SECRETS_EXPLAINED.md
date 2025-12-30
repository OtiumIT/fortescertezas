# Como Secrets Funcionam no Cloudflare Workers

## ⚠️ IMPORTANTE: Secrets Não São Enumeráveis!

No Cloudflare Workers, **Secrets configuradas não aparecem em `Object.keys(env)`** por segurança. Isso é intencional para prevenir exposição acidental de informações sensíveis.

### ❌ ERRADO - Não Funciona

```typescript
// Isso NÃO vai mostrar Secrets!
const keys = Object.keys(workerEnv);
console.log(keys); // Só mostra Variables, não Secrets

// Isso também NÃO funciona
if ('SUPABASE_URL' in workerEnv) {
  // Pode retornar false mesmo que o Secret esteja configurado
}
```

### ✅ CORRETO - Acesse Diretamente

```typescript
// Acesse Secrets diretamente pela propriedade
const supabaseUrl = workerEnv.SUPABASE_URL;
const supabaseKey = workerEnv.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  // Secrets estão disponíveis!
}
```

## Como Funciona

### Variables (vars) - Enumeráveis

```toml
# wrangler.toml
[vars]
NODE_ENV = "production"
CORS_ORIGIN = "https://..."
```

- ✅ Aparecem em `Object.keys(env)`
- ✅ Aparecem em `for...in` loops
- ✅ Podem ser verificadas com `in` operator
- ✅ Visíveis no código (versionadas no git)

### Secrets - Não Enumeráveis

```bash
wrangler secret put SUPABASE_URL
```

- ❌ **NÃO aparecem** em `Object.keys(env)`
- ❌ **NÃO aparecem** em `for...in` loops  
- ❌ **NÃO podem** ser verificadas com `in` operator
- ✅ **Disponíveis** via acesso direto `env.SECRET_NAME`
- ✅ Criptografadas e seguras

## Por Que Isso Existe?

Esta é uma **feature de segurança** do Cloudflare Workers:

1. **Previne vazamento acidental**: Se você fizer `JSON.stringify(env)`, Secrets não serão incluídos
2. **Protege em logs**: Secrets não aparecem em logs acidentais
3. **Segurança por padrão**: Você precisa acessar explicitamente cada Secret

## Exemplo Prático

```typescript
export default {
  async fetch(request: Request, env: Env) {
    // ❌ ERRADO - Secrets não aparecem aqui
    console.log('Keys:', Object.keys(env));
    // Output: ['NODE_ENV', 'CORS_ORIGIN', ...] (sem Secrets)
    
    // ✅ CORRETO - Acesse diretamente
    const supabaseUrl = env.SUPABASE_URL; // Funciona!
    const supabaseKey = env.SUPABASE_ANON_KEY; // Funciona!
    
    if (supabaseUrl && supabaseKey) {
      // Use os Secrets normalmente
      const client = createClient(supabaseUrl, supabaseKey);
    }
  }
}
```

## Verificação de Secrets

Para verificar se um Secret está configurado:

```typescript
// ✅ CORRETO
const secret = env.MY_SECRET;
if (secret) {
  // Secret está configurado e disponível
}

// ❌ ERRADO - Não funciona para Secrets
if ('MY_SECRET' in env) {
  // Pode retornar false mesmo que o Secret esteja configurado
}
```

## Resumo

- **Variables**: Enumeráveis, aparecem em `Object.keys()`
- **Secrets**: Não enumeráveis, acesse diretamente `env.SECRET_NAME`
- **Segurança**: Por design, Secrets são invisíveis para enumeração
- **Acesso**: Sempre use acesso direto: `env.SECRET_NAME`
