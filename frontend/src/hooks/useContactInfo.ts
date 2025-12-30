import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import type { ContactContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await apiClient.get<ApiResponse<ContactContent>>('/content/contact');
        setContactInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContactInfo();
  }, []);

  return { contactInfo, loading };
}
