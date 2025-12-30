import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Application } from '@/types/application.types';
import type { ApiResponse } from '@/types/api.types';

export function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [jobFilter, setJobFilter] = useState<string>('');

  useEffect(() => {
    fetchApplications();
  }, [filter, jobFilter]);

  async function fetchApplications() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (jobFilter) params.append('jobId', jobFilter);

      const response = await apiClient.get<ApiResponse<Application[]>>(
        `/admin/applications?${params.toString()}`
      );
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(
    id: string,
    status: 'new' | 'em_analise' | 'rejeitada' | 'contratada'
  ) {
    try {
      await apiClient.patch(`/admin/applications/${id}`, { status, read: true });
      fetchApplications();
      if (selectedApplication?.id === id) {
        setSelectedApplication({ ...selectedApplication, status, read: true });
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Erro ao atualizar status');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar esta candidatura?')) return;

    try {
      await apiClient.delete(`/admin/applications/${id}`);
      fetchApplications();
      if (selectedApplication?.id === id) {
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Erro ao deletar candidatura');
    }
  }

  function handleDownloadResume(resumePath: string) {
    window.open(`${import.meta.env.VITE_API_URL?.replace('/api/v1', '')}${resumePath}`, '_blank');
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">A carregar...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Candidaturas Recebidas</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filtrar por ID da vaga"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button
              variant={filter === 'new' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('new')}
            >
              Novas
            </Button>
            <Button
              variant={filter === 'em_analise' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('em_analise')}
            >
              Em Análise
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Lista de Candidaturas ({applications.length})</h2>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {applications.map((application) => (
                  <div
                    key={application.id}
                    onClick={() => setSelectedApplication(application)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedApplication?.id === application.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{application.name}</p>
                        <p className="text-sm text-gray-500">{application.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Vaga: {application.jobId}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(application.createdAt).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      {application.status === 'new' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Nova
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedApplication.name}</h2>
                    <p className="text-gray-600">{selectedApplication.email}</p>
                    <p className="text-gray-600">{selectedApplication.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">Vaga: {selectedApplication.jobId}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedApplication.status === 'new'
                        ? 'bg-red-100 text-red-800'
                        : selectedApplication.status === 'em_analise'
                        ? 'bg-yellow-100 text-yellow-800'
                        : selectedApplication.status === 'rejeitada'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {selectedApplication.status === 'new'
                      ? 'Nova'
                      : selectedApplication.status === 'em_analise'
                      ? 'Em Análise'
                      : selectedApplication.status === 'rejeitada'
                      ? 'Rejeitada'
                      : 'Contratada'}
                  </span>
                </div>

                {selectedApplication.message && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-1">Mensagem</h3>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedApplication.message}</p>
                  </div>
                )}

                <div className="mb-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadResume(selectedApplication.resume)}
                  >
                    Download Currículo
                  </Button>
                </div>

                <div className="mb-4 text-sm text-gray-500">
                  Recebido em: {new Date(selectedApplication.createdAt).toLocaleString('pt-PT')}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {selectedApplication.status !== 'em_analise' && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'em_analise')}
                    >
                      Marcar como Em Análise
                    </Button>
                  )}
                  {selectedApplication.status !== 'rejeitada' && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'rejeitada')}
                    >
                      Rejeitar
                    </Button>
                  )}
                  {selectedApplication.status !== 'contratada' && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'contratada')}
                    >
                      Contratar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedApplication.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">Selecione uma candidatura para ver os detalhes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
