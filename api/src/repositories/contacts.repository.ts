import {
  readJsonFile,
  appendToJsonArray,
  updateJsonArrayItem,
  deleteJsonArrayItem,
  findJsonArrayItem,
} from '../lib/json-storage.js';
import type { Contact } from '../types/contact.types.js';

const CONTACTS_FILE = 'contacts.json';

export async function getAllContacts(): Promise<Contact[]> {
  return readJsonFile<Contact[]>(CONTACTS_FILE, {
    createIfNotExists: true,
    defaultData: [],
  });
}

export async function getContactById(id: string): Promise<Contact | null> {
  return findJsonArrayItem<Contact>(CONTACTS_FILE, id);
}

export async function createContact(contact: Contact): Promise<Contact> {
  return appendToJsonArray<Contact>(CONTACTS_FILE, contact);
}

export async function updateContact(
  id: string,
  updates: Partial<Contact>
): Promise<Contact | null> {
  return updateJsonArrayItem<Contact>(CONTACTS_FILE, id, updates);
}

export async function deleteContact(id: string): Promise<boolean> {
  return deleteJsonArrayItem<Contact>(CONTACTS_FILE, id);
}
