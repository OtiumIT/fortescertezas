import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-lg">
      <div className="container-modern py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-neutral-700 leading-relaxed">
              Este site utiliza cookies para melhorar a sua experiência de navegação. 
              Ao continuar a navegar, concorda com a nossa{' '}
              <Link 
                to="/privacidade" 
                className="text-primary-500 hover:text-primary-600 font-medium underline"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm whitespace-nowrap"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
