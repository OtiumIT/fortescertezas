import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useBranding } from '@/hooks/useBranding';
import { Button } from '@/components/ui/Button';
import { ReportBug } from './ReportBug';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  locked?: boolean;
}

interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
  defaultOpen?: boolean;
}

const menuCategories: MenuCategory[] = [
  {
    id: 'site',
    label: 'Site',
    icon: '🌐',
    defaultOpen: true,
    items: [
      { path: '/admin/content', label: 'Conteúdos', icon: '📝' },
      { path: '/admin/services', label: 'Serviços', icon: '🛠️' },
      { path: '/admin/privacy', label: 'Política de Privacidade', icon: '🔒' },
      { path: '/admin/posts', label: 'Blog', icon: '📰' },
    ],
  },
  {
    id: 'vagas',
    label: 'Vagas',
    icon: '💼',
    defaultOpen: false,
    items: [
      { path: '/admin/jobs', label: 'Cadastro de Vagas', icon: '📋' },
      { path: '/admin/applications', label: 'Candidatos', icon: '👤' },
    ],
  },
  {
    id: 'contato',
    label: 'Contato',
    icon: '✉️',
    defaultOpen: false,
    items: [
      { path: '/admin/contacts', label: 'Respostas de Contato', icon: '📬' },
    ],
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: '👥',
    defaultOpen: false,
    items: [
      { path: '/admin/clients', label: 'Cadastro', icon: '📇', locked: true },
      { path: '/admin/contracts', label: 'Contratos', icon: '📄', locked: true },
      { path: '/admin/enterprises', label: 'Empreendimentos', icon: '🏢', locked: true },
      { path: '/admin/occurrences', label: 'Gestão de Ocorrências', icon: '🚨', locked: true },
    ],
  },
  {
    id: 'funcionarios',
    label: 'Funcionários',
    icon: '👷',
    defaultOpen: false,
    items: [
      { path: '/admin/employees', label: 'Cadastro', icon: '👤', locked: true },
      { path: '/admin/schedule', label: 'Gerador de Escala', icon: '🗓️', locked: true },
      { path: '/admin/working-hours', label: 'Relatórios Horas Trabalhadas', icon: '⏱️', locked: true },
    ],
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const { branding } = useBranding();
  const navigate = useNavigate();
  const location = useLocation();
  
  const logoUrl = branding?.logo.header || '/logos/fortes certezas 2017 sf sletras_1.png';
  
  // Estado para controlar quais categorias estão expandidas
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(menuCategories.filter(cat => cat.defaultOpen).map(cat => cat.id))
  );

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  // Expandir automaticamente categorias com itens ativos
  useEffect(() => {
    setExpandedCategories((prev) => {
      const categoriesToExpand = new Set(prev);
      menuCategories.forEach((category) => {
        const hasActiveItem = category.items.some((item) => isActive(item.path));
        if (hasActiveItem) {
          categoriesToExpand.add(category.id);
        }
      });
      return categoriesToExpand;
    });
  }, [location.pathname]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.has(categoryId);
  };

  const [isReportBugOpen, setIsReportBugOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg fixed h-full">
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-200">
            <Link to="/admin" className="flex flex-col items-center gap-2 group">
              <div className="flex items-end gap-3">
                <img
                  src={logoUrl}
                  alt="Fortes Certezas"
                  className="h-16 object-contain transition-transform group-hover:scale-105 flex-shrink-0"
                />
                <div className="flex flex-col gap-0">
                  <h1 className="text-lg font-bold text-gray-900 leading-none">
                    <span className="text-primary-500">F</span>ORTES
                  </h1>
                  <h1 className="text-lg font-bold text-gray-900 leading-none">
                    <span className="text-primary-500">C</span>ERTEZAS
                  </h1>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Supervisão | Portarias | Condomínios
              </p>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider mt-1">
                Painel Administrativo
              </span>
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* Dashboard - sempre visível no topo */}
            <Link
              to="/admin"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-4 ${
                location.pathname === '/admin'
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">📊</span>
              <span className="flex-1">Dashboard</span>
            </Link>

            {/* Categorias */}
            <ul className="space-y-2">
              {menuCategories.map((category) => {
                const isExpanded = isCategoryExpanded(category.id);
                const hasActiveItem = category.items.some((item) => isActive(item.path));

                return (
                  <li key={category.id}>
                    {/* Botão da categoria */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        hasActiveItem
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="flex-1 text-left">{category.label}</span>
                      </div>
                      <svg
                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Itens da categoria (quando expandida) */}
                    {isExpanded && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-2">
                        {category.items.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                                isActive(item.path)
                                  ? 'bg-primary-100 text-primary-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              } ${item.locked ? 'opacity-75' : ''}`}
                            >
                              <span className="text-lg">{item.icon}</span>
                              <span className="flex-1">{item.label}</span>
                              {item.locked && <span className="text-gray-400 text-xs">🔒</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Top Header with Menu */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              {/* User Info */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                <button
                  onClick={() => setIsReportBugOpen(true)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <span>🐛</span>
                  <span>Reportar Bug</span>
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>

      {/* Report Bug Modal */}
      <ReportBug isOpen={isReportBugOpen} onClose={() => setIsReportBugOpen(false)} />
    </div>
  );
}
