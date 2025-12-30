// Usa apenas Supabase
import * as supabaseRepo from './supabase/contacts.repository.js';
import type { Contact } from '../types/contact.types.js';
import { env } from '../config/env.js';

function ensureSupabaseConfigured(): void {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.');
  }
}

export async function getAllContacts(filters?: { status?: string }): Promise<Contact[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getAllContacts(filters);
}

export async function getContactById(id: string): Promise<Contact | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getContactById(id);
}

export async function createContact(contact: Contact): Promise<Contact> {
  ensureSupabaseConfigured();
  return await supabaseRepo.createContact(contact);
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.updateContact(id, updates);
}

export async function deleteContact(id: string): Promise<boolean> {
  ensureSupabaseConfigured();
  return await supabaseRepo.deleteContact(id);
}
