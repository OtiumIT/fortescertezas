// Usa apenas Supabase
import * as supabaseRepo from './supabase/applications.repository.js';
import type { Application } from '../types/application.types.js';
import { env } from '../config/env.js';

function ensureSupabaseConfigured(): void {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.');
  }
}

export async function getAllApplications(filters?: { jobId?: string; status?: string }): Promise<Application[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getAllApplications(filters);
}

export async function getApplicationById(id: string): Promise<Application | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getApplicationById(id);
}

export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getAllApplications({ jobId });
}

export async function createApplication(application: Application): Promise<Application> {
  ensureSupabaseConfigured();
  return await supabaseRepo.createApplication(application);
}

export async function updateApplication(
  id: string,
  updates: Partial<Application>
): Promise<Application | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.updateApplication(id, updates);
}

export async function deleteApplication(id: string): Promise<boolean> {
  ensureSupabaseConfigured();
  return await supabaseRepo.deleteApplication(id);
}
