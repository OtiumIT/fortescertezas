// Usa apenas Supabase
import * as supabaseRepo from './supabase/services.repository.js';
import type { Service } from '../types/service.types.js';
import { env } from '../config/env.js';

function ensureSupabaseConfigured(): void {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.');
  }
}

export async function getAllServices(): Promise<Service[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getAllServices();
}

export async function getServiceById(id: string): Promise<Service | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getServiceById(id);
}

export async function createService(service: Service): Promise<Service> {
  ensureSupabaseConfigured();
  return await supabaseRepo.createService(service);
}

export async function updateService(
  id: string,
  updates: Partial<Service>
): Promise<Service | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.updateService(id, updates);
}

export async function deleteService(id: string): Promise<boolean> {
  ensureSupabaseConfigured();
  return await supabaseRepo.deleteService(id);
}
