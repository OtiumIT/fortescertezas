import { Context } from 'hono';
import {
  getAllContacts as getAllContactsService,
  getContactById as getContactByIdService,
  createContact as createContactService,
  updateContactStatus as updateContactStatusService,
  deleteContact as deleteContactService,
} from '../services/contacts.service.js';
import { createContactSchema, updateContactStatusSchema } from '../lib/validation.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { Contact } from '../types/contact.types.js';
import type { ApiResponse } from '../types/api.types.js';

export async function handleGetAllContacts(c: Context): Promise<Response> {
  try {
    const status = c.req.query('status') || 'all';
    const contacts = await getAllContactsService({ status });

    const response: ApiResponse<Contact[]> = {
      data: contacts,
      meta: {
        total: contacts.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetContactById(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const contact = await getContactByIdService(id);

    const response: ApiResponse<Contact> = {
      data: contact,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleCreateContact(c: Context): Promise<Response> {
  try {
    const body = await c.req.json();
    const validated = createContactSchema.parse(body);
    const contact = await createContactService(validated);

    const response: ApiResponse<{ id: string; message: string }> = {
      data: {
        id: contact.id,
        message: 'Contato enviado com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleUpdateContactStatus(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updateContactStatusSchema.parse(body);
    const contact = await updateContactStatusService(id, validated);

    const response: ApiResponse<Contact> = {
      data: contact,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleDeleteContact(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    await deleteContactService(id);

    const response: ApiResponse<{ message: string }> = {
      data: {
        message: 'Contato deletado com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
