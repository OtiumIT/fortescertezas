import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { useSEO } from '@/hooks/useSEO';
import { useContactInfo } from '@/hooks/useContactInfo';
import { parseMarkdownToHTML } from '@/lib/markdown';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import type { Service } from '@/types/service.types';
import type { ApiResponse } from '@/types/api.types';

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { contactInfo } = useContactInfo();

  useEffect(() => {
    async function fetchService() {
      if (!id) return;

      try {
        const response = await apiClient.get<ApiResponse<Service>>(`/services/${id}`);
        setService(response.data.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id]);

  useSEO(
    service?.seo
      ? {
          title: service.seo.title,
          description: service.seo.metaDescription,
          keywords: service.seo.metaKeywords,
        }
      : {}
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar serviço...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container-modern py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">Serviço não encontrado</h1>
        <Link to="/servicos">
          <Button>Voltar para Serviços</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b-4 border-primary bg-white">
        <div className="container-modern py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/servicos"
              className="text-neutral-600 hover:text-primary mb-4 inline-flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para Serviços
            </Link>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl">{service.icon}</div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{service.title}</h1>
            </div>
            <p className="text-lg text-neutral-600 leading-relaxed">{service.shortDescription}</p>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            {service.image && service.image.trim() && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const container = target.parentElement;
                    if (container) {
                      container.style.display = 'none';
                    }
                  }}
                />
              </div>
            )}

            <article className="prose prose-lg max-w-none mb-12">
              <div
                className="text-neutral-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownToHTML(service.description),
                }}
              />
            </article>

            {service.features.length > 0 && (
              <div className="card p-8 mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Características</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contacto">
                <Button size="lg">Solicitar Orçamento</Button>
              </Link>
              {contactInfo?.whatsapp && (
                <a
                  href={getWhatsAppUrl(contactInfo.whatsapp, `Olá! Gostaria de solicitar um orçamento para ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898 1.857 1.867 2.881 4.35 2.881 6.99 0 5.45-4.436 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Fale no WhatsApp
                </a>
              )}
              <Link to="/servicos">
                <Button variant="outline" size="lg">
                  Ver Outros Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
