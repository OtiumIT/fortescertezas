import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      // Mostra o banner após um pequeno delay para melhor UX
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-primary shadow-2xl animate-slide-up">
      <div className="container-modern py-4 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                Este site utiliza cookies para melhorar a sua experiência de navegação e para fins de análise. 
                Ao continuar a navegar, concorda com a nossa{' '}
                <Link 
                  to="/privacidade" 
                  className="text-primary-500 hover:text-primary-600 font-semibold underline"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Aceitar
              </button>
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold rounded-xl transition-colors whitespace-nowrap"
              >
                Recusar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
