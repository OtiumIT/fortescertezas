// Usa apenas Supabase
import * as supabaseRepo from './supabase/jobs.repository.js';
import type { Job } from '../types/job.types.js';
import { env } from '../config/env.js';

function ensureSupabaseConfigured(): void {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.');
  }
}

export async function getAllJobs(): Promise<Job[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getAllJobs();
}

export async function getJobById(id: string): Promise<Job | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getJobById(id);
}

export async function getActiveJobs(): Promise<Job[]> {
  ensureSupabaseConfigured();
  // Supabase já filtra por active
  return await supabaseRepo.getAllJobs();
}

export async function createJob(job: Job): Promise<Job> {
  ensureSupabaseConfigured();
  return await supabaseRepo.createJob(job);
}

export async function updateJob(
  id: string,
  updates: Partial<Job>
): Promise<Job | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.updateJob(id, updates);
}

export async function deleteJob(id: string): Promise<boolean> {
  ensureSupabaseConfigured();
  return await supabaseRepo.deleteJob(id);
}

export async function incrementJobApplicationsCount(jobId: string): Promise<void> {
  ensureSupabaseConfigured();
  const job = await getJobById(jobId);
  if (job) {
    const currentCount = job.applicationsCount || 0;
    await updateJob(jobId, { applicationsCount: currentCount + 1 });
  }
}
