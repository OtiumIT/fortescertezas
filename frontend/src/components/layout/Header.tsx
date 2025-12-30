import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBranding } from '@/hooks/useBranding';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { branding } = useBranding();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoUrl = branding?.logo.header || '/logos/fortes certezas 2017 sf sletras_1.png';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-sm">
      <nav className="container-modern">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Nome da Empresa */}
          <Link to="/" className="flex items-center gap-4 group">
            <img
              src={logoUrl}
              alt="Fortes Certezas"
              className="h-16 object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden lg:flex flex-col">
              <h1 className="text-xl font-bold text-neutral-900 leading-tight">
                <span className="text-primary-500">F</span>ORTES{' '}
                <span className="text-primary-500">C</span>ERTEZAS,{' '}
                <span className="font-normal text-neutral-700">Unipessoal Lda.</span>
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Supervisão | Portarias | Condomínios
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-neutral-700 hover:text-primary-500 font-medium transition-colors relative group"
            >
              Início
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/sobre"
              className="text-neutral-700 hover:text-primary-500 font-medium transition-colors relative group"
            >
              Sobre Nós
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/servicos"
              className="text-neutral-700 hover:text-primary-500 font-medium transition-colors relative group"
            >
              Serviços
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/vagas"
              className="text-neutral-700 hover:text-primary-500 font-medium transition-colors relative group"
            >
              Vagas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/blog"
              className="text-neutral-700 hover:text-primary-500 font-medium transition-colors relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              to="/admin/login"
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors text-sm"
            >
              Login
            </Link>
            <Link
              to="/contacto"
              className="btn btn-primary px-6 py-2.5 text-sm"
            >
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-500 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-neutral-100 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/sobre"
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link
                to="/servicos"
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                to="/vagas"
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vagas
              </Link>
              <Link
                to="/blog"
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/admin/login"
                className="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/contacto"
                className="btn btn-primary w-full justify-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
