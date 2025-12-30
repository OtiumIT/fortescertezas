export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  contractType: string;
  salary?: string;
  publishedAt: string;
  expiresAt?: string;
  active: boolean;
  applicationsCount?: number;
}
