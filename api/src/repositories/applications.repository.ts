import {
  readJsonFile,
  appendToJsonArray,
  updateJsonArrayItem,
  deleteJsonArrayItem,
  findJsonArrayItem,
} from '../lib/json-storage.js';
import type { Application } from '../types/application.types.js';

const APPLICATIONS_FILE = 'applications.json';

export async function getAllApplications(): Promise<Application[]> {
  return readJsonFile<Application[]>(APPLICATIONS_FILE, {
    createIfNotExists: true,
    defaultData: [],
  });
}

export async function getApplicationById(id: string): Promise<Application | null> {
  return findJsonArrayItem<Application>(APPLICATIONS_FILE, id);
}

export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  const applications = await getAllApplications();
  return applications.filter((app) => app.jobId === jobId);
}

export async function createApplication(application: Application): Promise<Application> {
  return appendToJsonArray<Application>(APPLICATIONS_FILE, application);
}

export async function updateApplication(
  id: string,
  updates: Partial<Application>
): Promise<Application | null> {
  return updateJsonArrayItem<Application>(APPLICATIONS_FILE, id, updates);
}

export async function deleteApplication(id: string): Promise<boolean> {
  return deleteJsonArrayItem<Application>(APPLICATIONS_FILE, id);
}
