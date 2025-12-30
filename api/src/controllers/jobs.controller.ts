import { Context } from 'hono';
import {
  getAllJobs as getAllJobsService,
  getJobById as getJobByIdService,
  createJob as createJobService,
  updateJob as updateJobService,
  deleteJob as deleteJobService,
} from '../services/jobs.service.js';
import { createJobSchema, updateJobSchema } from '../lib/validation.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { Job } from '../types/job.types.js';
import type { ApiResponse } from '../types/api.types.js';

export async function handleGetAllJobs(c: Context): Promise<Response> {
  try {
    const activeOnly = c.req.query('status') === 'active';
    const jobs = await getAllJobsService(activeOnly);

    const response: ApiResponse<Job[]> = {
      data: jobs,
      meta: {
        total: jobs.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetJobById(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const job = await getJobByIdService(id);

    const response: ApiResponse<Job> = {
      data: job,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleCreateJob(c: Context): Promise<Response> {
  try {
    const body = await c.req.json();
    const validated = createJobSchema.parse(body);
    const job = await createJobService(validated);

    const response: ApiResponse<Job> = {
      data: job,
    };

    return c.json(response, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleUpdateJob(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updateJobSchema.parse(body);
    const job = await updateJobService(id, validated);

    const response: ApiResponse<Job> = {
      data: job,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleDeleteJob(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    await deleteJobService(id);

    const response: ApiResponse<{ message: string }> = {
      data: {
        message: 'Vaga deletada com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
