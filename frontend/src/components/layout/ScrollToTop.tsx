import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que faz scroll para o topo da página sempre que a rota mudar
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll suave para o topo
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // 'instant' para scroll imediato, 'smooth' para animado
    });
  }, [pathname]);

  return null;
}
