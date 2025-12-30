import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { useContactInfo } from '@/hooks/useContactInfo';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import type { Service } from '@/types/service.types';
import type { ApiResponse } from '@/types/api.types';

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { contactInfo } = useContactInfo();

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await apiClient.get<ApiResponse<Service[]>>('/services?active=true');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar serviços...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Os Nossos Serviços" 
        subtitle="Soluções completas de portaria e controlo de acessos para o seu condomínio ou empresa"
      />

      {/* Services Grid */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            {services.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-neutral-600 text-lg">Nenhum serviço disponível no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/servicos/${service.id}`}
                    className="card card-hover group"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <div className="text-3xl">
                            {service.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold text-neutral-900 group-hover:text-primary-500 transition-colors mb-2">
                            {service.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
                        {service.shortDescription}
                      </p>
                      
                      {service.features.length > 0 && (
                        <ul className="mb-4 space-y-2">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-sm text-neutral-600 flex items-start">
                              <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="text-primary-500 font-semibold group-hover:underline flex items-center text-sm">
                        Saber mais
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contacto">
                <Button size="lg">
                  Solicitar Orçamento
                </Button>
              </Link>
              {contactInfo?.whatsapp && (
                <a
                  href={getWhatsAppUrl(contactInfo.whatsapp, 'Olá! Gostaria de solicitar um orçamento para serviços de portaria.')}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
