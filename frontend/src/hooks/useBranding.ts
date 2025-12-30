import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import type { BrandingContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

export function useBranding() {
  const [branding, setBranding] = useState<BrandingContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBranding() {
      try {
        const response = await apiClient.get<ApiResponse<BrandingContent>>('/content/branding');
        if (response.data.data) {
          setBranding(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching branding:', error);
        // Fallback para valores padrão se a API falhar
        setBranding({
          logo: {
            header: '/logos/fortes certezas 2017 sf sletras_1.png',
            footer: '/logos/fortes certezas 2017 sf sletras.png',
            favicon: '/logos/object1316453987.png',
          },
          colors: {
            primary: '#e40000',
            secondary: '#f88306',
            textPrimary: '#777777',
            textDark: '#000000',
            textLight: '#ffffff',
            backgroundLight: '#ffffff',
            backgroundDark: '#000000',
          },
          typography: {
            fontFamily: "Arvo, Arial, Helvetica, 'Liberation Sans', FreeSans, sans-serif",
            titleLarge: '30px',
            titleMedium: '25px',
            titleSmall: '20px',
            bodyText: '14px',
            smallText: '12px',
          },
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBranding();
  }, []);

  return { branding, loading };
}
