export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    limit?: number;
    offset?: number;
    [key: string]: unknown;
  };
}

export interface ApiError {
  error: string;
  code: string;
  details?: Record<string, unknown>;
}
