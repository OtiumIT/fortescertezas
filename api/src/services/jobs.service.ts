import {
  getAllJobs as getAllJobsRepo,
  getActiveJobs as getActiveJobsRepo,
  getJobById as getJobByIdRepo,
  createJob as createJobRepo,
  updateJob as updateJobRepo,
  deleteJob as deleteJobRepo,
  incrementJobApplicationsCount,
} from '../repositories/jobs.repository.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { generateId } from '../lib/utils.js';
import type { Job, CreateJobInput, UpdateJobInput } from '../types/job.types.js';

export async function getAllJobs(activeOnly: boolean = false): Promise<Job[]> {
  if (activeOnly) {
    return getActiveJobsRepo();
  }

  return getAllJobsRepo();
}

export async function getJobById(id: string): Promise<Job> {
  const job = await getJobByIdRepo(id);

  if (!job) {
    throw new AppError('Vaga não encontrada', HTTP_STATUS.NOT_FOUND, 'JOB_NOT_FOUND');
  }

  return job;
}

export async function createJob(input: CreateJobInput): Promise<Job> {
  const id = generateId('job');

  const job: Job = {
    id,
    ...input,
    applicationsCount: 0,
  };

  return createJobRepo(job);
}

export async function updateJob(id: string, updates: UpdateJobInput): Promise<Job> {
  const existingJob = await getJobByIdRepo(id);

  if (!existingJob) {
    throw new AppError('Vaga não encontrada', HTTP_STATUS.NOT_FOUND, 'JOB_NOT_FOUND');
  }

  const updated = await updateJobRepo(id, updates);

  if (!updated) {
    throw new AppError('Erro ao atualizar vaga', HTTP_STATUS.INTERNAL_SERVER_ERROR, 'UPDATE_ERROR');
  }

  return updated;
}

export async function deleteJob(id: string): Promise<void> {
  const deleted = await deleteJobRepo(id);

  if (!deleted) {
    throw new AppError('Vaga não encontrada', HTTP_STATUS.NOT_FOUND, 'JOB_NOT_FOUND');
  }
}

export async function incrementApplications(jobId: string): Promise<void> {
  await incrementJobApplicationsCount(jobId);
}
