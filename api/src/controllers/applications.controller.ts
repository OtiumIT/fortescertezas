import { Context } from 'hono';
import {
  getAllApplications as getAllApplicationsService,
  getApplicationById as getApplicationByIdService,
  getApplicationsByJobId as getApplicationsByJobIdService,
  createApplication as createApplicationService,
  updateApplicationStatus as updateApplicationStatusService,
  deleteApplication as deleteApplicationService,
} from '../services/applications.service.js';
import { createApplicationSchema, updateApplicationStatusSchema } from '../lib/validation.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { env } from '../config/env.js';
import { sanitizeFilename } from '../lib/utils.js';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { Application } from '../types/application.types.js';
import type { ApiResponse } from '../types/api.types.js';

async function saveResume(file: File, applicationId: string, candidateName: string): Promise<string> {
  const uploadsDir = join(env.UPLOADS_DIR, 'resumes');
  
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }

  const sanitizedName = sanitizeFilename(candidateName);
  const extension = file.name.split('.').pop() || 'pdf';
  const filename = `${applicationId}-${sanitizedName}.${extension}`;
  const filePath = join(uploadsDir, filename);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);

  return `/uploads/resumes/${filename}`;
}

export async function handleGetAllApplications(c: Context): Promise<Response> {
  try {
    const jobId = c.req.query('jobId');
    const status = c.req.query('status') || 'all';
    const applications = await getAllApplicationsService({ jobId, status });

    const response: ApiResponse<Application[]> = {
      data: applications,
      meta: {
        total: applications.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetApplicationById(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const application = await getApplicationByIdService(id);

    const response: ApiResponse<Application> = {
      data: application,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetApplicationsByJobId(c: Context): Promise<Response> {
  try {
    const jobId = c.req.param('jobId');
    const applications = await getApplicationsByJobIdService(jobId);

    const response: ApiResponse<Application[]> = {
      data: applications,
      meta: {
        total: applications.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleCreateApplication(c: Context): Promise<Response> {
  try {
    const formData = await c.req.formData();
    
    const jobId = formData.get('jobId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string | null;
    const resume = formData.get('resume') as File;

    if (!resume) {
      throw new Error('Currículo é obrigatório');
    }

    if (resume.type !== 'application/pdf') {
      throw new Error('Currículo deve ser um arquivo PDF');
    }

    if (resume.size > 5 * 1024 * 1024) {
      throw new Error('Currículo deve ter no máximo 5MB');
    }

    const validated = createApplicationSchema.parse({
      jobId,
      name,
      email,
      phone,
      message: message || undefined,
    });

    const applicationId = `app-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const resumePath = await saveResume(resume, applicationId, name);

    const application = await createApplicationService(validated, resumePath);

    const response: ApiResponse<{ id: string; message: string }> = {
      data: {
        id: application.id,
        message: 'Candidatura enviada com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleUpdateApplicationStatus(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updateApplicationStatusSchema.parse(body);
    const application = await updateApplicationStatusService(id, validated);

    const response: ApiResponse<Application> = {
      data: application,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleDeleteApplication(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    await deleteApplicationService(id);

    const response: ApiResponse<{ message: string }> = {
      data: {
        message: 'Candidatura deletada com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
