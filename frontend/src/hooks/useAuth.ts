import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import type { User, LoginInput } from '@/types/auth.types';
import type { ApiResponse } from '@/types/api.types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      verifyAuth();
    } else {
      setLoading(false);
    }
  }, []);

  async function verifyAuth() {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/auth/me');
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(input: LoginInput) {
    try {
      const response = await apiClient.post<ApiResponse<{ token: string; user: User }>>(
        '/auth/login',
        input
      );
      const { token, user } = response.data.data;
      localStorage.setItem('auth_token', token);
      setUser(user);
      return { success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Erro ao fazer login' };
    }
  }

  function logout() {
    localStorage.removeItem('auth_token');
    setUser(null);
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
