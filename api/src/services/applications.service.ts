import {
  getAllApplications as getAllApplicationsRepo,
  getApplicationById as getApplicationByIdRepo,
  getApplicationsByJobId as getApplicationsByJobIdRepo,
  createApplication as createApplicationRepo,
  updateApplication as updateApplicationRepo,
  deleteApplication as deleteApplicationRepo,
} from '../repositories/applications.repository.js';
import { incrementApplications } from './jobs.service.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { generateId, sanitizeString } from '../lib/utils.js';
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationStatusInput,
} from '../types/application.types.js';

export async function getAllApplications(filters?: { jobId?: string; status?: string }): Promise<Application[]> {
  let applications = await getAllApplicationsRepo();

  if (filters?.jobId) {
    applications = applications.filter((app) => app.jobId === filters.jobId);
  }

  if (filters?.status && filters.status !== 'all') {
    applications = applications.filter((app) => app.status === filters.status);
  }

  return applications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getApplicationById(id: string): Promise<Application> {
  const application = await getApplicationByIdRepo(id);

  if (!application) {
    throw new AppError('Candidatura não encontrada', HTTP_STATUS.NOT_FOUND, 'APPLICATION_NOT_FOUND');
  }

  return application;
}

export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  return getApplicationsByJobIdRepo(jobId);
}

export async function createApplication(
  input: CreateApplicationInput,
  resumePath: string
): Promise<Application> {
  const id = generateId('app');

  const application: Application = {
    id,
    jobId: input.jobId,
    name: sanitizeString(input.name),
    email: input.email.toLowerCase().trim(),
    phone: input.phone.trim(),
    message: input.message ? sanitizeString(input.message) : undefined,
    resume: resumePath,
    createdAt: new Date().toISOString(),
    status: 'new',
    read: false,
  };

  const created = await createApplicationRepo(application);
  await incrementApplications(input.jobId);

  return created;
}

export async function updateApplicationStatus(
  id: string,
  updates: UpdateApplicationStatusInput
): Promise<Application> {
  const existingApplication = await getApplicationByIdRepo(id);

  if (!existingApplication) {
    throw new AppError('Candidatura não encontrada', HTTP_STATUS.NOT_FOUND, 'APPLICATION_NOT_FOUND');
  }

  const updated = await updateApplicationRepo(id, updates);

  if (!updated) {
    throw new AppError('Erro ao atualizar candidatura', HTTP_STATUS.INTERNAL_SERVER_ERROR, 'UPDATE_ERROR');
  }

  return updated;
}

export async function deleteApplication(id: string): Promise<void> {
  const deleted = await deleteApplicationRepo(id);

  if (!deleted) {
    throw new AppError('Candidatura não encontrada', HTTP_STATUS.NOT_FOUND, 'APPLICATION_NOT_FOUND');
  }
}
