import {
  readJsonFile,
  appendToJsonArray,
  updateJsonArrayItem,
  deleteJsonArrayItem,
  findJsonArrayItem,
} from '../lib/json-storage.js';
import type { Job } from '../types/job.types.js';

const JOBS_FILE = 'jobs.json';

export async function getAllJobs(): Promise<Job[]> {
  return readJsonFile<Job[]>(JOBS_FILE, {
    createIfNotExists: true,
    defaultData: [],
  });
}

export async function getJobById(id: string): Promise<Job | null> {
  return findJsonArrayItem<Job>(JOBS_FILE, id);
}

export async function getActiveJobs(): Promise<Job[]> {
  const jobs = await getAllJobs();
  const now = new Date().toISOString().split('T')[0];
  return jobs.filter((job) => {
    if (!job.active) return false;
    if (job.expiresAt && job.expiresAt < now) return false;
    return true;
  });
}

export async function createJob(job: Job): Promise<Job> {
  return appendToJsonArray<Job>(JOBS_FILE, job);
}

export async function updateJob(
  id: string,
  updates: Partial<Job>
): Promise<Job | null> {
  return updateJsonArrayItem<Job>(JOBS_FILE, id, updates);
}

export async function deleteJob(id: string): Promise<boolean> {
  return deleteJsonArrayItem<Job>(JOBS_FILE, id);
}

export async function incrementJobApplicationsCount(jobId: string): Promise<void> {
  const job = await getJobById(jobId);
  if (job) {
    const currentCount = job.applicationsCount || 0;
    await updateJob(jobId, { applicationsCount: currentCount + 1 });
  }
}
