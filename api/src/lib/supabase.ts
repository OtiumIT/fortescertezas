import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

let supabaseClient: SupabaseClient | null = null;
let lastSupabaseUrl: string | null = null;
let lastSupabaseKey: string | null = null;

export function getSupabaseClient(): SupabaseClient {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY;

  // Se o cliente já existe e as credenciais são as mesmas, reutiliza
  if (supabaseClient && lastSupabaseUrl === supabaseUrl && lastSupabaseKey === supabaseKey) {
    console.log('[supabase] Usando cliente Supabase existente');
    return supabaseClient;
  }

  // Se as credenciais mudaram ou o cliente não existe, cria novo
  if (supabaseClient) {
    console.log('[supabase] Credenciais mudaram, recriando cliente');
    supabaseClient = null;
  }

  console.log('[supabase] Inicializando cliente Supabase...');
  console.log('[supabase] SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'NÃO CONFIGURADO');
  console.log('[supabase] SUPABASE_ANON_KEY:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NÃO CONFIGURADO');

  if (!supabaseUrl || !supabaseKey) {
    const errorMsg = 'Supabase URL and Anon Key must be configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.';
    console.error('[supabase] ❌ ERRO:', errorMsg);
    console.error('[supabase] Verifique se as variáveis foram configuradas como Secrets no Cloudflare Workers');
    console.error('[supabase] Comando: wrangler secret put SUPABASE_URL');
    console.error('[supabase] Comando: wrangler secret put SUPABASE_ANON_KEY');
    throw new Error(errorMsg);
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false, // Workers não mantêm sessão
      },
    });

    // Armazena as credenciais usadas para verificar mudanças futuras
    lastSupabaseUrl = supabaseUrl;
    lastSupabaseKey = supabaseKey;

    console.log('[supabase] ✅ Cliente Supabase criado com sucesso');
    return supabaseClient;
  } catch (error) {
    console.error('[supabase] ❌ Erro ao criar cliente Supabase:', error);
    throw new Error(`Failed to create Supabase client: ${error instanceof Error ? error.message : String(error)}`);
  }
}
