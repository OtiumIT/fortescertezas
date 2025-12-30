export const API_VERSION = 'v1';

export const API_BASE_PATH = `/api/${API_VERSION}`;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  resumes: ['application/pdf'],
} as const;

export const CONTACT_STATUS = {
  NEW: 'new',
  READ: 'read',
  RESPONDED: 'responded',
} as const;

export const APPLICATION_STATUS = {
  NEW: 'new',
  IN_REVIEW: 'em_analise',
  REJECTED: 'rejeitada',
  HIRED: 'contratada',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
