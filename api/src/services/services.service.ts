import {
  getAllServices as getAllServicesRepo,
  getServiceById as getServiceByIdRepo,
  createService as createServiceRepo,
  updateService as updateServiceRepo,
  deleteService as deleteServiceRepo,
} from '../repositories/services.repository.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { Service } from '../types/service.types.js';

export async function getAllServices(activeOnly: boolean = false): Promise<Service[]> {
  const services = await getAllServicesRepo();

  if (activeOnly) {
    return services.filter((service) => service.active).sort((a, b) => a.order - b.order);
  }

  return services.sort((a, b) => a.order - b.order);
}

export async function getServiceById(id: string): Promise<Service> {
  const service = await getServiceByIdRepo(id);

  if (!service) {
    throw new AppError('Serviço não encontrado', HTTP_STATUS.NOT_FOUND, 'SERVICE_NOT_FOUND');
  }

  return service;
}

export async function createService(input: Omit<Service, 'id'>): Promise<Service> {
  const id = input.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const service: Service = {
    id,
    ...input,
  };

  return createServiceRepo(service);
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service> {
  const existingService = await getServiceByIdRepo(id);

  if (!existingService) {
    throw new AppError('Serviço não encontrado', HTTP_STATUS.NOT_FOUND, 'SERVICE_NOT_FOUND');
  }

  const updated = await updateServiceRepo(id, updates);

  if (!updated) {
    throw new AppError('Erro ao atualizar serviço', HTTP_STATUS.INTERNAL_SERVER_ERROR, 'UPDATE_ERROR');
  }

  return updated;
}

export async function deleteService(id: string): Promise<void> {
  const deleted = await deleteServiceRepo(id);

  if (!deleted) {
    throw new AppError('Serviço não encontrado', HTTP_STATUS.NOT_FOUND, 'SERVICE_NOT_FOUND');
  }
}
