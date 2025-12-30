import { getSupabaseClient } from '../../lib/supabase.js';
import type { Application } from '../../types/application.types.js';

export async function getAllApplications(filters?: { jobId?: string; status?: string }): Promise<Application[]> {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.jobId) {
    query = query.eq('job_id', filters.jobId);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return (data || []).map((item: any) => ({
    id: item.id,
    jobId: item.job_id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    message: item.message,
    resume: item.resume || item.resume_url,
    status: item.status as Application['status'],
    read: item.read || false,
    createdAt: item.created_at,
  }));
}

export async function getApplicationById(id: string): Promise<Application | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch application: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    jobId: data.job_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    resume: data.resume || data.resume_url,
    status: data.status as Application['status'],
    read: data.read || false,
    createdAt: data.created_at,
  };
}

export async function createApplication(application: Application | Omit<Application, 'id' | 'createdAt'>): Promise<Application> {
  const supabase = getSupabaseClient();
  
  const appData = {
    job_id: (application as any).jobId || (application as any).job_id,
    name: application.name,
    email: application.email,
    phone: application.phone,
    message: application.message,
    resume: application.resume,
    resume_url: (application as any).resumeUrl || (application as any).resume_url,
    status: application.status || 'new',
    read: (application as any).read || false,
    created_at: (application as any).createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const { data, error } = await supabase
    .from('applications')
    .insert(appData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create application: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    jobId: data.job_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    resume: data.resume || data.resume_url,
    status: data.status as Application['status'],
    read: data.read || false,
    createdAt: data.created_at,
  };
}

export async function updateApplication(
  id: string,
  updates: Partial<Application>
): Promise<Application | null> {
  const supabase = getSupabaseClient();
  
  // Converte camelCase para snake_case
  const dbUpdates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.jobId !== undefined) dbUpdates.job_id = updates.jobId;
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.email !== undefined) dbUpdates.email = updates.email;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.message !== undefined) dbUpdates.message = updates.message;
  if (updates.resume !== undefined) dbUpdates.resume = updates.resume;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.read !== undefined) dbUpdates.read = updates.read;
  
  const { data, error } = await supabase
    .from('applications')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to update application: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    jobId: data.job_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    resume: data.resume || data.resume_url,
    status: data.status as Application['status'],
    read: data.read || false,
    createdAt: data.created_at,
  };
}

export async function deleteApplication(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete application: ${error.message}`);
  }

  return true;
}
