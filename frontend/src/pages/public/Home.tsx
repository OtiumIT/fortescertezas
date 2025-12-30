import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/lib/api-client';
import { useSEO } from '@/hooks/useSEO';
import { useContactInfo } from '@/hooks/useContactInfo';
import { NewsSection } from '@/components/features/NewsSection';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import type { HomepageContent, SeoContent } from '@/types/content.types';
import type { Service } from '@/types/service.types';
import type { ApiResponse } from '@/types/api.types';

export function Home() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [seoContent, setSeoContent] = useState<SeoContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const { contactInfo } = useContactInfo();

  useEffect(() => {
    async function fetchContent() {
      try {
        const [homepageRes, servicesRes, seoRes] = await Promise.all([
          apiClient.get<ApiResponse<HomepageContent>>('/content/homepage'),
          apiClient.get<ApiResponse<Service[]>>('/services?active=true'),
          apiClient.get<ApiResponse<SeoContent>>('/content/seo').catch(() => null),
        ]);
        setContent(homepageRes.data.data);
        setServices(servicesRes.data.data.slice(0, 6));
        if (seoRes) {
          setSeoContent(seoRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  useSEO(
    seoContent
      ? {
          title: 'Fortes Certezas - Serviços de Portaria e Controlo de Acessos em Matosinhos',
          description: seoContent.metaDescription,
          keywords: seoContent.metaKeywords,
        }
      : {}
  );

  // Usar array de heroes ou fallback para hero único (compatibilidade)
  const heroes = content?.heroes || (content?.hero ? [content.hero] : []);
  
  // Auto-rotacionar heroes a cada 5 segundos se houver mais de um
  useEffect(() => {
    if (heroes.length > 1) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroes.length]);

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

  const currentHero = heroes[currentHeroIndex] || null;

  if (!currentHero) {
    return (
      <div className="container-modern py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-800">Nenhum hero configurado</h1>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Design Limpo e Moderno */}
      <section className="relative bg-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-0 min-h-[85vh] lg:min-h-[90vh] w-full">
          {/* Imagem à Esquerda */}
          <div className="relative w-full h-[50vh] lg:h-auto order-2 lg:order-1 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={currentHero.backgroundImage || '/images/hero-image.jpg'}
                alt={currentHero.title || 'Serviços de portaria e controlo de acessos'}
                className="w-full h-full object-cover transition-opacity duration-500"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  const placeholder = target.parentElement?.querySelector('.hero-placeholder') as HTMLElement;
                  if (placeholder) {
                    placeholder.style.display = 'none';
                  }
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.parentElement?.querySelector('.hero-placeholder') as HTMLElement;
                  if (placeholder) {
                    placeholder.style.display = 'flex';
                  }
                }}
              />
              {/* Placeholder que aparece se a imagem não carregar */}
              <div className="hero-placeholder absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🏢</div>
                  <p className="text-neutral-600 text-lg font-medium">Imagem do serviço</p>
                  <p className="text-neutral-500 text-sm mt-2">Adicione a imagem no admin</p>
                </div>
              </div>
            </div>
            
            {/* Overlay sutil para melhorar legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:from-black/30"></div>
          </div>

          {/* Bloco de Conteúdo à Direita */}
          <div className="relative w-full flex items-center bg-primary-500 order-1 lg:order-2 py-12 lg:py-16 xl:py-20">
            <div className="relative z-10 px-8 lg:px-12 xl:px-16 w-full max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-white">
                {currentHero.title || 'FORTES CERTEZAS'}
              </h1>
              
              <p className="text-xl lg:text-2xl mb-6 leading-relaxed text-white/95 font-medium">
                {currentHero.subtitle}
              </p>
              
              <p className="text-base lg:text-lg mb-10 leading-relaxed text-white/90">
                {currentHero.description}
              </p>
              
              <div className="flex flex-col gap-4 w-full">
                {currentHero.ctaText && (
                  <Link
                    to={currentHero.ctaLink || '/contacto'}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-500 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300 group text-lg shadow-lg hover:shadow-xl"
                  >
                    {currentHero.ctaText}
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
                
                <Link
                  to="/servicos"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg"
                >
                  Ver Serviços
                </Link>
              </div>
            </div>

            {/* Indicador de paginação */}
            {heroes.length > 1 && (
              <div className="absolute bottom-8 right-8 flex gap-2">
                {heroes.map((_: unknown, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentHeroIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Ir para hero ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights Section - Cards Modernos */}
      {content.highlights.length > 0 && (
        <section className="section bg-white">
          <div className="container-modern">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.highlights.map((highlight: { title: string; description: string; icon?: string }, index: number) => (
                <div
                  key={index}
                  className="card card-hover p-6 text-center group"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {highlight.icon}
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section - Destaque Principal */}
      {services.length > 0 && (
        <section className="section bg-neutral-50">
          <div className="container-modern">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
                Os Nossos <span className="text-gradient">Serviços</span>
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Soluções completas de portaria e controlo de acessos para o seu condomínio ou empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/servicos/${service.id}`}
                  className="card card-hover group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-2xl">
                          {service.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-500 transition-colors mb-2">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    {service.features.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {service.features.slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="text-sm text-neutral-600 flex items-start">
                            <svg className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="text-primary-500 font-semibold group-hover:underline flex items-center">
                      Saber mais
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/servicos"
                className="btn btn-primary px-8 py-4 text-lg"
              >
                Ver Todos os Serviços
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      <NewsSection />

      {/* About Section - Moderna */}
      <section className="section bg-white">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
                Sobre <span className="text-gradient">Nós</span>
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-base text-neutral-700 leading-relaxed mb-4">
                {content.about.description.split('\n\n')[0]}
              </p>
              <p className="text-base text-neutral-700 leading-relaxed mb-4">
                {content.about.description.split('\n\n')[1]}
              </p>
              <p className="text-base text-neutral-700 leading-relaxed mb-8">
                {content.about.description.split('\n\n')[2]}
              </p>
            </div>

            <div className="text-center">
              <Link
                to="/sobre"
                className="btn btn-outline inline-flex items-center"
              >
                Conheça a nossa história completa
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Final */}
      <section className="section relative overflow-hidden gradient-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container-modern relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg mb-8 text-white/90 leading-relaxed">
              Entre em contacto connosco e solicite um orçamento personalizado para o seu condomínio ou empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contacto"
                className="btn bg-white text-primary-500 hover:bg-neutral-50 px-10 py-4 text-lg shadow-xl hover:shadow-2xl"
              >
                Solicitar Orçamento
              </Link>
              {contactInfo?.whatsapp && (
                <a
                  href={getWhatsAppUrl(contactInfo.whatsapp, 'Olá! Gostaria de solicitar um orçamento para serviços de portaria.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
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
