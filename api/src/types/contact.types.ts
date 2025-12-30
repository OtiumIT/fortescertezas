export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'responded';
  read: boolean;
  responded: boolean;
}

export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface UpdateContactStatusInput {
  status?: 'new' | 'read' | 'responded';
  read?: boolean;
  responded?: boolean;
}
