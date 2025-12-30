import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import apiClient from '@/lib/api-client';
import type { ApiResponse } from '@/types/api.types';

interface DashboardStats {
  contacts: number;
  applications: number;
  jobs: number;
  services: number;
  posts: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [contactsRes, applicationsRes, jobsRes, servicesRes, postsRes] = await Promise.all([
          apiClient.get<ApiResponse<unknown[]>>('/admin/contacts').catch(() => ({ data: { meta: { total: 0 } } })),
          apiClient.get<ApiResponse<unknown[]>>('/admin/applications').catch(() => ({ data: { meta: { total: 0 } } })),
          apiClient.get<ApiResponse<unknown[]>>('/admin/jobs').catch(() => ({ data: { meta: { total: 0 } } })),
          apiClient.get<ApiResponse<unknown[]>>('/admin/services').catch(() => ({ data: { meta: { total: 0 } } })),
          apiClient.get<ApiResponse<unknown[]>>('/admin/posts').catch(() => ({ data: { meta: { total: 0 } } })),
        ]);

        setStats({
          contacts: contactsRes.data?.meta?.total || 0,
          applications: applicationsRes.data?.meta?.total || 0,
          jobs: jobsRes.data?.meta?.total || 0,
          services: servicesRes.data?.meta?.total || 0,
          posts: postsRes.data?.meta?.total || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do sistema</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">A carregar...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards - Funcionalidades Ativas */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Funcionalidades Ativas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link to="/admin/services" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🛠️</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Ativo</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">Serviços</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats?.services || 0}</p>
                  <p className="text-xs text-gray-500 mt-2">cadastrados</p>
                </Link>

                <Link to="/admin/posts" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📰</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Ativo</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">Posts do Blog</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats?.posts || 0}</p>
                  <p className="text-xs text-gray-500 mt-2">publicados</p>
                </Link>

                <Link to="/admin/jobs" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">💼</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Ativo</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">Vagas</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats?.jobs || 0}</p>
                  <p className="text-xs text-gray-500 mt-2">ativas</p>
                </Link>

                <Link to="/admin/applications" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👤</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Ativo</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">Candidaturas</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats?.applications || 0}</p>
                  <p className="text-xs text-gray-500 mt-2">recebidas</p>
                </Link>

                <Link to="/admin/contacts" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">✉️</span>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Ativo</span>
                  </div>
                  <h3 className="text-gray-600 text-sm mb-1">Contatos</h3>
                  <p className="text-3xl font-bold text-primary-600">{stats?.contacts || 0}</p>
                  <p className="text-xs text-gray-500 mt-2">recebidos</p>
                </Link>
              </div>
            </div>

            {/* Stats Cards - Funcionalidades em Desenvolvimento */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Funcionalidades em Desenvolvimento</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/admin/clients" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👥</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <span>🔒</span> Em desenvolvimento
                    </span>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">Clientes</h3>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total de clientes:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Contratos ativos:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Novos este mês:</span>
                      <span className="font-semibold text-green-600">—</span>
                    </div>
                  </div>
                </Link>

                <Link to="/admin/contracts" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">📄</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <span>🔒</span> Em desenvolvimento
                    </span>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">Contratos</h3>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Contratos ativos:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Vencendo em 30 dias:</span>
                      <span className="font-semibold text-yellow-600">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxa de renovação:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                  </div>
                </Link>

                <Link to="/admin/employees" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">👷</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <span>🔒</span> Em desenvolvimento
                    </span>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">Funcionários</h3>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total de funcionários:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Em atividade:</span>
                      <span className="font-semibold text-green-600">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">De férias/licença:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                  </div>
                </Link>

                <Link to="/admin/occurrences" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🚨</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                      <span>🔒</span> Em desenvolvimento
                    </span>
                  </div>
                  <h3 className="text-gray-800 font-semibold mb-1">Ocorrências</h3>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Abertas:</span>
                      <span className="font-semibold text-red-600">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Em andamento:</span>
                      <span className="font-semibold text-yellow-600">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tempo médio resolução:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Additional Modules Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Escalas Preview */}
              <Link to="/admin/schedule" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🗓️</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Gerador de Escalas</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1 mt-1">
                        <span>🔒</span> Em desenvolvimento
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Próxima escala</span>
                      <span className="text-xs text-gray-500">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Funcionários escalados:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Empreendimentos:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Sistema inteligente para gerar escalas automaticamente, considerando preferências, disponibilidade e regras de negócio.
                  </p>
                </div>
              </Link>

              {/* Relatórios de Horas Preview */}
              <Link to="/admin/working-hours" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⏱️</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Horas Trabalhadas</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1 mt-1">
                        <span>🔒</span> Em desenvolvimento
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Este mês</span>
                      <span className="text-xs text-gray-500">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total de horas:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Horas extras:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxa de assiduidade:</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Relatórios detalhados de horas trabalhadas, faltas, atrasos e presenças para cálculo de salários.
                  </p>
                </div>
              </Link>

              {/* Empreendimentos Preview */}
              <Link to="/admin/enterprises" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 border-primary-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏢</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Empreendimentos</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1 mt-1">
                        <span>🔒</span> Em desenvolvimento
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total de empreendimentos</span>
                      <span className="font-semibold text-gray-800">—</span>
                    </div>
                    <div className="flex justify-between text-sm mt-3">
                      <span className="text-gray-600">Com serviços ativos:</span>
                      <span className="font-semibold text-green-600">—</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Gestão completa de todos os locais onde a empresa presta serviços, com informações detalhadas de cada empreendimento.
                  </p>
                </div>
              </Link>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
                <div className="space-y-2">
                  <Link to="/admin/content" className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📝</span>
                      <span className="text-sm font-medium">Editar Conteúdos</span>
                    </div>
                  </Link>
                  <Link to="/admin/services" className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🛠️</span>
                      <span className="text-sm font-medium">Gerir Serviços</span>
                    </div>
                  </Link>
                  <Link to="/admin/posts" className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📰</span>
                      <span className="text-sm font-medium">Criar Post no Blog</span>
                    </div>
                  </Link>
                  <Link to="/admin/jobs" className="block bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💼</span>
                      <span className="text-sm font-medium">Publicar Nova Vaga</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity Section (Placeholder) */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividade Recente</h3>
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-2 block">📊</span>
                <p className="text-sm">Quando as funcionalidades estiverem ativas, esta seção mostrará:</p>
                <ul className="text-sm mt-4 space-y-1 text-left max-w-md mx-auto">
                  <li>• Últimos contatos recebidos</li>
                  <li>• Novas candidaturas</li>
                  <li>• Ocorrências recentes</li>
                  <li>• Alterações em contratos</li>
                  <li>• Escalas publicadas</li>
                  <li>• Posts publicados</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
