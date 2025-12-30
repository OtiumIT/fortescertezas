import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FileUpload } from '@/components/ui/FileUpload';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Service } from '@/types/service.types';
import type { ApiResponse } from '@/types/api.types';

export function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<Service[]>>('/admin/services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar este serviço?')) return;

    try {
      await apiClient.delete(`/admin/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Erro ao deletar serviço');
    }
  }

  function handleEdit(service: Service) {
    setEditingService(service);
    setShowForm(true);
  }

  function handleNew() {
    setEditingService(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingService(null);
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
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Serviços</h1>
          <Button onClick={handleNew}>Novo Serviço</Button>
        </div>

        {showForm && (
          <ServiceForm
            service={editingService}
            onSave={() => {
              fetchServices();
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
                  Ordem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-500">{service.shortDescription}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {service.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
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

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Omit<Service, 'id'>>({
    defaultValues: service
      ? {
          title: service.title,
          shortDescription: service.shortDescription,
          description: service.description,
          icon: service.icon,
          image: service.image,
          order: service.order,
          active: service.active,
          features: service.features,
        }
      : {
          title: '',
          shortDescription: '',
          description: '',
          icon: '',
          image: '',
          order: 0,
          active: true,
          features: [],
        },
  });

  async function onSubmit(data: Omit<Service, 'id'>) {
    setSaving(true);
    try {
      if (service) {
        await apiClient.put(`/admin/services/${service.id}`, data);
      } else {
        await apiClient.post('/admin/services', data);
      }
      onSave();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Erro ao salvar serviço');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        {service ? 'Editar Serviço' : 'Novo Serviço'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Título"
          {...register('title', { required: 'Título é obrigatório' })}
          error={errors.title?.message}
        />
        <Textarea
          label="Descrição Curta"
          rows={2}
          {...register('shortDescription', { required: 'Descrição curta é obrigatória' })}
          error={errors.shortDescription?.message}
        />
        <Textarea
          label="Descrição Completa"
          rows={6}
          {...register('description', { required: 'Descrição é obrigatória' })}
          error={errors.description?.message}
        />
        <Input label="Ícone (emoji ou código)" {...register('icon')} />
        <FileUpload
          label="Imagem"
          value={watch('image')}
          onChange={(url: string) => setValue('image', url)}
        />
        <Input
          label="Ordem"
          type="number"
          {...register('order', { valueAsNumber: true, required: 'Ordem é obrigatória' })}
          error={errors.order?.message}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('active')}
            className="mr-2"
          />
          <label>Ativo</label>
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
