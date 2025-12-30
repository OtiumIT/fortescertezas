import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import { parseMarkdownToHTML } from '@/lib/markdown';
import { PageHeader } from '@/components/layout/PageHeader';
import type { PrivacyContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

export function Privacy() {
  const [privacy, setPrivacy] = useState<PrivacyContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrivacy() {
      try {
        const response = await apiClient.get<ApiResponse<PrivacyContent>>('/content/privacy');
        setPrivacy(response.data.data);
      } catch (error) {
        console.error('Error fetching privacy content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrivacy();
  }, []);

  return (
    <div>
      <PageHeader title="Política de Privacidade" />

      <section className="py-12 md:py-16 bg-white">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">A carregar...</p>
                </div>
              </div>
            ) : (
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-neutral-600 prose-strong:text-gray-900 prose-ul:text-neutral-600 prose-li:text-neutral-600"
                dangerouslySetInnerHTML={{
                  __html: privacy?.content ? parseMarkdownToHTML(privacy.content) : '<p>Conteúdo não disponível.</p>',
                }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
