import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Job, CreateJobInput } from '@/types/job.types';
import type { ApiResponse } from '@/types/api.types';

export function JobsManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<Job[]>>('/admin/jobs');
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar esta vaga?')) return;

    try {
      await apiClient.delete(`/admin/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Erro ao deletar vaga');
    }
  }

  function handleEdit(job: Job) {
    setEditingJob(job);
    setShowForm(true);
  }

  function handleNew() {
    setEditingJob(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingJob(null);
    setShowForm(false);
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
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Vagas</h1>
          <Button onClick={handleNew}>Nova Vaga</Button>
        </div>

        {showForm && (
          <JobForm
            job={editingJob}
            onSave={() => {
              fetchJobs();
              handleCancel();
            }}
            onCancel={handleCancel}
          />
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidaturas
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.contractType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {job.active ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.applicationsCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

function JobForm({
  job,
  onSave,
  onCancel,
}: {
  job: Job | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [requirements, setRequirements] = useState<string[]>(
    job?.requirements || ['']
  );

  const { register, handleSubmit, formState: { errors } } = useForm<CreateJobInput>({
    defaultValues: job
      ? {
          title: job.title,
          description: job.description,
          requirements: job.requirements,
          location: job.location,
          contractType: job.contractType,
          salary: job.salary,
          publishedAt: job.publishedAt,
          expiresAt: job.expiresAt,
          active: job.active,
        }
      : {
          title: '',
          description: '',
          requirements: [''],
          location: '',
          contractType: '',
          salary: '',
          publishedAt: new Date().toISOString().split('T')[0],
          expiresAt: '',
          active: true,
        },
  });

  function addRequirement() {
    setRequirements([...requirements, '']);
  }

  function removeRequirement(index: number) {
    setRequirements(requirements.filter((_, i) => i !== index));
  }

  function updateRequirement(index: number, value: string) {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  }

  async function onSubmit(data: CreateJobInput) {
    setSaving(true);
    try {
      const jobData = {
        ...data,
        requirements: requirements.filter((r) => r.trim() !== ''),
      };

      if (job) {
        await apiClient.put(`/admin/jobs/${job.id}`, jobData);
      } else {
        await apiClient.post('/admin/jobs', jobData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Erro ao salvar vaga');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{job ? 'Editar Vaga' : 'Nova Vaga'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Título"
          {...register('title', { required: 'Título é obrigatório' })}
          error={errors.title?.message}
        />
        <Textarea
          label="Descrição"
          rows={8}
          {...register('description', { required: 'Descrição é obrigatória' })}
          error={errors.description?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requisitos
          </label>
          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={req}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateRequirement(index, e.target.value)}
                placeholder="Requisito"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeRequirement(index)}
                disabled={requirements.length === 1}
              >
                Remover
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addRequirement} size="sm">
            + Adicionar Requisito
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Localização"
            {...register('location', { required: 'Localização é obrigatória' })}
            error={errors.location?.message}
          />
          <Input
            label="Tipo de Contrato"
            {...register('contractType', { required: 'Tipo de contrato é obrigatório' })}
            error={errors.contractType?.message}
          />
          <Input label="Salário (opcional)" {...register('salary')} />
          <Input
            label="Data de Publicação"
            type="date"
            {...register('publishedAt', { required: 'Data de publicação é obrigatória' })}
            error={errors.publishedAt?.message}
          />
          <Input label="Data de Expiração (opcional)" type="date" {...register('expiresAt')} />
        </div>

        <div className="flex items-center">
          <input type="checkbox" {...register('active')} className="mr-2" />
          <label>Ativa</label>
        </div>

        <div className="flex space-x-4">
          <Button type="submit" isLoading={saving}>
            Guardar
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
