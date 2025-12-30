import { Context } from 'hono';
import {
  getAllServices as getAllServicesService,
  getServiceById as getServiceByIdService,
  createService as createServiceService,
  updateService as updateServiceService,
  deleteService as deleteServiceService,
} from '../services/services.service.js';
import { createServiceSchema, updateServiceSchema } from '../lib/validation.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { Service } from '../types/service.types.js';
import type { ApiResponse } from '../types/api.types.js';

export async function handleGetAllServices(c: Context): Promise<Response> {
  try {
    const activeOnly = c.req.query('active') === 'true';
    const services = await getAllServicesService(activeOnly);

    const response: ApiResponse<Service[]> = {
      data: services,
      meta: {
        total: services.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetServiceById(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const service = await getServiceByIdService(id);

    const response: ApiResponse<Service> = {
      data: service,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleCreateService(c: Context): Promise<Response> {
  try {
    const body = await c.req.json();
    const validated = createServiceSchema.parse(body);
    const service = await createServiceService(validated as Omit<Service, 'id'>);

    const response: ApiResponse<Service> = {
      data: service,
    };

    return c.json(response, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleUpdateService(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updateServiceSchema.parse(body);
    const service = await updateServiceService(id, validated as Partial<Service>);

    const response: ApiResponse<Service> = {
      data: service,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleDeleteService(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    await deleteServiceService(id);

    const response: ApiResponse<{ message: string }> = {
      data: {
        message: 'Serviço deletado com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
