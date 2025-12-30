import { getSupabaseClient } from '../../lib/supabase.js';
import type { Service } from '../../types/service.types.js';

export async function getAllServices(): Promise<Service[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch services: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    shortDescription: item.short_description,
    description: item.description,
    icon: item.icon,
    image: item.image,
    order: item.order,
    active: item.active,
    features: item.features || [],
    seo: item.seo,
  }));
}

export async function getServiceById(id: string): Promise<Service | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch service: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    shortDescription: data.short_description,
    description: data.description,
    icon: data.icon,
    image: data.image,
    order: data.order,
    active: data.active,
    features: data.features || [],
    seo: data.seo,
  };
}

export async function createService(service: Service): Promise<Service> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('services')
    .insert({
      id: service.id,
      title: service.title,
      short_description: service.shortDescription,
      description: service.description,
      icon: service.icon,
      image: service.image,
      order: service.order,
      active: service.active,
      features: service.features || [],
      seo: service.seo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create service: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    shortDescription: data.short_description,
    description: data.description,
    icon: data.icon,
    image: data.image,
    order: data.order,
    active: data.active,
    features: data.features || [],
    seo: data.seo,
  };
}

export async function updateService(
  id: string,
  updates: Partial<Service>
): Promise<Service | null> {
  const supabase = getSupabaseClient();
  
  // Converte camelCase para snake_case
  const dbUpdates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.shortDescription !== undefined) dbUpdates.short_description = updates.shortDescription;
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
  if (updates.image !== undefined) dbUpdates.image = updates.image;
  if (updates.order !== undefined) dbUpdates.order = updates.order;
  if (updates.active !== undefined) dbUpdates.active = updates.active;
  if (updates.features !== undefined) dbUpdates.features = updates.features;
  if (updates.seo !== undefined) dbUpdates.seo = updates.seo;
  
  const { data, error } = await supabase
    .from('services')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to update service: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    shortDescription: data.short_description,
    description: data.description,
    icon: data.icon,
    image: data.image,
    order: data.order,
    active: data.active,
    features: data.features || [],
    seo: data.seo,
  };
}

export async function deleteService(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete service: ${error.message}`);
  }

  return true;
}
