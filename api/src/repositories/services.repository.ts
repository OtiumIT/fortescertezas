import {
  readJsonFile,
  appendToJsonArray,
  updateJsonArrayItem,
  deleteJsonArrayItem,
  findJsonArrayItem,
} from '../lib/json-storage.js';
import type { Service } from '../types/service.types.js';

const SERVICES_FILE = 'services.json';

export async function getAllServices(): Promise<Service[]> {
  return readJsonFile<Service[]>(SERVICES_FILE, {
    createIfNotExists: true,
    defaultData: [],
  });
}

export async function getServiceById(id: string): Promise<Service | null> {
  return findJsonArrayItem<Service>(SERVICES_FILE, id);
}

export async function createService(service: Service): Promise<Service> {
  return appendToJsonArray<Service>(SERVICES_FILE, service);
}

export async function updateService(
  id: string,
  updates: Partial<Service>
): Promise<Service | null> {
  return updateJsonArrayItem<Service>(SERVICES_FILE, id, updates);
}

export async function deleteService(id: string): Promise<boolean> {
  return deleteJsonArrayItem<Service>(SERVICES_FILE, id);
}
