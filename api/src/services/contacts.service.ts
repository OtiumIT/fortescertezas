import {
  getAllContacts as getAllContactsRepo,
  getContactById as getContactByIdRepo,
  createContact as createContactRepo,
  updateContact as updateContactRepo,
  deleteContact as deleteContactRepo,
} from '../repositories/contacts.repository.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { generateId, sanitizeString } from '../lib/utils.js';
import type { Contact, CreateContactInput, UpdateContactStatusInput } from '../types/contact.types.js';

export async function getAllContacts(filters?: { status?: string }): Promise<Contact[]> {
  const contacts = await getAllContactsRepo();

  if (filters?.status && filters.status !== 'all') {
    return contacts.filter((contact) => contact.status === filters.status);
  }

  return contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getContactById(id: string): Promise<Contact> {
  const contact = await getContactByIdRepo(id);

  if (!contact) {
    throw new AppError('Contato não encontrado', HTTP_STATUS.NOT_FOUND, 'CONTACT_NOT_FOUND');
  }

  return contact;
}

export async function createContact(input: CreateContactInput): Promise<Contact> {
  const id = generateId('contact');

  const contact: Contact = {
    id,
    name: sanitizeString(input.name),
    email: input.email.toLowerCase().trim(),
    phone: input.phone.trim(),
    subject: sanitizeString(input.subject),
    message: sanitizeString(input.message),
    createdAt: new Date().toISOString(),
    status: 'new',
    read: false,
    responded: false,
  };

  return createContactRepo(contact);
}

export async function updateContactStatus(
  id: string,
  updates: UpdateContactStatusInput
): Promise<Contact> {
  const existingContact = await getContactByIdRepo(id);

  if (!existingContact) {
    throw new AppError('Contato não encontrado', HTTP_STATUS.NOT_FOUND, 'CONTACT_NOT_FOUND');
  }

  const updated = await updateContactRepo(id, updates);

  if (!updated) {
    throw new AppError('Erro ao atualizar contato', HTTP_STATUS.INTERNAL_SERVER_ERROR, 'UPDATE_ERROR');
  }

  return updated;
}

export async function deleteContact(id: string): Promise<void> {
  const deleted = await deleteContactRepo(id);

  if (!deleted) {
    throw new AppError('Contato não encontrado', HTTP_STATUS.NOT_FOUND, 'CONTACT_NOT_FOUND');
  }
}
