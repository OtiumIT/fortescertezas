import { Link } from 'react-router-dom';
import { useBranding } from '@/hooks/useBranding';
import { useContactInfo } from '@/hooks/useContactInfo';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export function Footer() {
  const { branding } = useBranding();
  const { contactInfo } = useContactInfo();
  const logoUrl = branding?.logo.footer || '/logos/fortes certezas 2017 sf sletras.png';

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-auto">
      <div className="container-modern py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
              {/* Mobile: Layout igual ao admin (logo + 3 linhas) */}
              <div className="flex items-end gap-3 md:hidden">
                <img
                  src={logoUrl}
                  alt="Fortes Certezas"
                  className="h-16 object-contain flex-shrink-0"
                />
                <div className="flex flex-col gap-0">
                  <h2 className="text-lg font-bold text-neutral-900 leading-none">
                    <span className="text-primary-500">F</span>ORTES
                  </h2>
                  <h2 className="text-lg font-bold text-neutral-900 leading-none">
                    <span className="text-primary-500">C</span>ERTEZAS
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Supervisão | Portarias | Condomínios
                  </p>
                </div>
              </div>
              
              {/* Desktop: Layout original */}
              <div className="hidden md:flex flex-col md:flex-row items-start gap-4">
                <img
                  src={logoUrl}
                  alt="Fortes Certezas"
                  className="h-20 object-contain flex-shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-neutral-900 mb-2 leading-tight">
                    <span className="text-primary-500">F</span>ORTES{' '}
                    <span className="text-primary-500">C</span>ERTEZAS,{' '}
                    <span className="font-normal text-neutral-700">Unipessoal Lda.</span>
                  </h2>
                  <p className="text-sm text-neutral-500 mb-4">
                    Supervisão | Portarias | Condomínios
                  </p>
                  <p className="text-neutral-600 leading-relaxed max-w-md">
                    Mais de 20 anos de experiência em serviços de portaria e controlo de acessos em Matosinhos e Porto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-6 uppercase tracking-wider">
              Navegação
            </h3>
            <nav className="space-y-3">
              <Link 
                to="/" 
                className="block text-neutral-600 hover:text-primary-500 transition-colors text-sm"
              >
                Início
              </Link>
              <Link 
                to="/sobre" 
                className="block text-neutral-600 hover:text-primary-500 transition-colors text-sm"
              >
                Sobre Nós
              </Link>
              <Link 
                to="/servicos" 
                className="block text-neutral-600 hover:text-primary-500 transition-colors text-sm"
              >
                Serviços
              </Link>
              <Link 
                to="/vagas" 
                className="block text-neutral-600 hover:text-primary-500 transition-colors text-sm"
              >
                Vagas
              </Link>
              <Link 
                to="/blog" 
                className="block text-neutral-600 hover:text-primary-500 transition-colors text-sm"
              >
                Blog
              </Link>
              <Link 
                to="/contacto" 
                className="block text-neutral-600 hover:text-primary-500 transition-colors text-sm"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-6 uppercase tracking-wider">
              Contacto
            </h3>
            <div className="space-y-5">
              {contactInfo?.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898 1.857 1.867 2.881 4.35 2.881 6.99 0 5.45-4.436 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Telefone / WhatsApp</p>
                    {contactInfo.whatsapp ? (
                      <a
                        href={getWhatsAppUrl(contactInfo.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-900 hover:text-[#25D366] transition-colors font-semibold text-sm block"
                      >
                        {contactInfo.phone}
                      </a>
                    ) : (
                      <a href={`tel:${contactInfo.phone}`} className="text-neutral-900 hover:text-primary-500 transition-colors font-semibold text-sm block">
                        {contactInfo.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Email</p>
                  <a href="mailto:geral@fortescertezas.pt" className="text-neutral-900 hover:text-primary-500 transition-colors font-semibold text-sm break-all block">
                    {contactInfo?.email || 'geral@fortescertezas.pt'}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Localização</p>
                  <p className="text-neutral-900 font-semibold text-sm leading-relaxed">
                    {contactInfo?.address?.city || 'Matosinhos, Porto'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wide mb-1.5">Facebook</p>
                  <a
                    href="https://www.facebook.com/fortescertezas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 hover:text-[#1877F2] transition-colors font-semibold text-sm block"
                  >
                    @fortescertezas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()}{' '}
              <span className="text-primary-500 font-semibold">F</span>ortes{' '}
              <span className="text-primary-500 font-semibold">C</span>ertezas, Unipessoal Lda. Todos os direitos reservados.
            </p>
            <Link
              to="/privacidade"
              className="text-neutral-500 hover:text-primary-500 transition-colors text-sm"
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
