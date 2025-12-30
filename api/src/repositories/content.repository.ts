// Usa apenas Supabase
import * as supabaseRepo from './supabase/content.repository.js';
import type { SiteContent } from '../types/content.types.js';
import { env } from '../config/env.js';

function ensureSupabaseConfigured(): void {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.');
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getSiteContent();
}

export async function updateSiteContent(
  section: keyof SiteContent,
  data: Partial<SiteContent[keyof SiteContent]>
): Promise<SiteContent> {
  ensureSupabaseConfigured();
  return await supabaseRepo.updateSiteContent(section, data);
}
