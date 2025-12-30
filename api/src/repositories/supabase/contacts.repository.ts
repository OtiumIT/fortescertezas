import { getSupabaseClient } from '../../lib/supabase.js';
import type { Contact } from '../../types/contact.types.js';

export async function getAllContacts(filters?: { status?: string }): Promise<Contact[]> {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    subject: item.subject || '',
    message: item.message,
    status: item.status as Contact['status'],
    read: item.read || false,
    responded: item.responded || false,
    createdAt: item.created_at,
  }));
}

export async function getContactById(id: string): Promise<Contact | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch contact: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject || '',
    message: data.message,
    status: data.status as Contact['status'],
    read: data.read || false,
    responded: data.responded || false,
    createdAt: data.created_at,
  };
}

export async function createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updated_at'> | Contact): Promise<Contact> {
  const supabase = getSupabaseClient();
  
  const contactData = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    subject: (contact as any).subject || '',
    message: contact.message,
    status: contact.status || 'new',
    read: (contact as any).read || false,
    responded: (contact as any).responded || false,
    created_at: (contact as any).createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const { data, error } = await supabase
    .from('contacts')
    .insert(contactData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create contact: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject || '',
    message: data.message,
    status: data.status as Contact['status'],
    read: data.read || false,
    responded: data.responded || false,
    createdAt: data.created_at,
  };
}

export async function updateContactStatus(
  id: string,
  status: string
): Promise<Contact | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('contacts')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to update contact: ${error.message}`);
  }

  return data as Contact;
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact | null> {
  const supabase = getSupabaseClient();
  
  // Converte camelCase para snake_case
  const dbUpdates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.email !== undefined) dbUpdates.email = updates.email;
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
  if (updates.subject !== undefined) dbUpdates.subject = updates.subject;
  if (updates.message !== undefined) dbUpdates.message = updates.message;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.read !== undefined) dbUpdates.read = updates.read;
  if (updates.responded !== undefined) dbUpdates.responded = updates.responded;
  
  const { data, error } = await supabase
    .from('contacts')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to update contact: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject || '',
    message: data.message,
    status: data.status as Contact['status'],
    read: data.read || false,
    responded: data.responded || false,
    createdAt: data.created_at,
  };
}

export async function deleteContact(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete contact: ${error.message}`);
  }

  return true;
}
