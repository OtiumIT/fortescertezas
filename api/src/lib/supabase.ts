import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    console.log('[supabase] Usando cliente Supabase existente');
    return supabaseClient;
  }

  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_ANON_KEY;

  console.log('[supabase] Inicializando cliente Supabase...');
  console.log('[supabase] SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'NÃO CONFIGURADO');
  console.log('[supabase] SUPABASE_ANON_KEY:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NÃO CONFIGURADO');

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key must be configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false, // Workers não mantêm sessão
    },
  });

  console.log('[supabase] Cliente Supabase criado com sucesso');
  return supabaseClient;
}
