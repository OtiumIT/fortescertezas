export interface User {
  id: string;
  username: string;
  role: 'admin';
  createdAt: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthPayload {
  userId: string;
  username: string;
  role: string;
}
