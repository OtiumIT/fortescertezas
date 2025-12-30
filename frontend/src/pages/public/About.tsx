import { useEffect, useState } from 'react';
import apiClient from '@/lib/api-client';
import { PageHeader } from '@/components/layout/PageHeader';
import type { AboutContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

export function About() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await apiClient.get<ApiResponse<AboutContent>>('/content/about');
        setContent(response.data.data);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container-modern py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-800">Erro ao carregar conteúdo</h1>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Sobre Nós" 
        subtitle="Mais de 20 anos de experiência em serviços de portaria e controlo de acessos"
      />

      {/* História */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">{content.history.title}</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-neutral-700 whitespace-pre-line leading-relaxed">
                {content.history.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Missão</h2>
              <p className="text-lg text-white/95 leading-relaxed">{content.mission}</p>
            </div>

            <div className="card p-8 bg-gradient-to-br from-accent-500 to-accent-600 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Visão</h2>
              <p className="text-lg text-white/95 leading-relaxed">{content.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      {content.values.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container-modern">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center">
                Os Nossos <span className="text-gradient">Valores</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.values.map((value, index) => (
                  <div key={index} className="card card-hover p-8 text-center">
                    {value.icon && (
                      <div className="text-6xl mb-6 transform hover:scale-110 transition-transform">
                        {value.icon}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{value.name}</h3>
                    <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
