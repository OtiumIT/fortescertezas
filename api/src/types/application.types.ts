export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  resume: string;
  createdAt: string;
  status: 'new' | 'em_analise' | 'rejeitada' | 'contratada';
  read: boolean;
}

export interface CreateApplicationInput {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface UpdateApplicationStatusInput {
  status?: 'new' | 'em_analise' | 'rejeitada' | 'contratada';
  read?: boolean;
}
