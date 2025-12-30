import { getSupabaseClient } from '../../lib/supabase.js';
import type { Job } from '../../types/job.types.js';

export async function getAllJobs(): Promise<Job[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('active', true)
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    contractType: item.contract_type,
    salary: item.salary || item.salary_range,
    requirements: item.requirements || [],
    benefits: item.benefits || [],
    active: item.active,
    publishedAt: item.published_at,
    expiresAt: item.expires_at,
    applicationsCount: item.applications_count || 0,
  }));
}

export async function getJobById(id: string): Promise<Job | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch job: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    location: data.location,
    contractType: data.contract_type,
    salary: data.salary || data.salary_range,
    requirements: data.requirements || [],
    active: data.active,
    publishedAt: data.published_at,
    expiresAt: data.expires_at,
    applicationsCount: data.applications_count || 0,
  };
}

export async function createJob(job: Job): Promise<Job> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location,
      contract_type: job.contractType,
      salary: job.salary,
      salary_range: job.salary,
      requirements: job.requirements || [],
      active: job.active,
      published_at: job.publishedAt,
      expires_at: job.expiresAt,
      applications_count: job.applicationsCount || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create job: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    location: data.location,
    contractType: data.contract_type,
    salary: data.salary || data.salary_range,
    requirements: data.requirements || [],
    active: data.active,
    publishedAt: data.published_at,
    expiresAt: data.expires_at,
    applicationsCount: data.applications_count || 0,
  };
}

export async function updateJob(
  id: string,
  updates: Partial<Job>
): Promise<Job | null> {
  const supabase = getSupabaseClient();
  
  // Converte camelCase para snake_case
  const dbUpdates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.location !== undefined) dbUpdates.location = updates.location;
  if (updates.contractType !== undefined) dbUpdates.contract_type = updates.contractType;
  if (updates.salary !== undefined) dbUpdates.salary = updates.salary;
  if (updates.requirements !== undefined) dbUpdates.requirements = updates.requirements;
  if (updates.active !== undefined) dbUpdates.active = updates.active;
  if (updates.publishedAt !== undefined) dbUpdates.published_at = updates.publishedAt;
  if (updates.expiresAt !== undefined) dbUpdates.expires_at = updates.expiresAt;
  if (updates.applicationsCount !== undefined) dbUpdates.applications_count = updates.applicationsCount;
  
  const { data, error } = await supabase
    .from('jobs')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to update job: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    location: data.location,
    contractType: data.contract_type,
    salary: data.salary || data.salary_range,
    requirements: data.requirements || [],
    active: data.active,
    publishedAt: data.published_at,
    expiresAt: data.expires_at,
    applicationsCount: data.applications_count || 0,
  };
}

export async function deleteJob(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete job: ${error.message}`);
  }

  return true;
}
