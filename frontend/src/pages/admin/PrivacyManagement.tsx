import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { PrivacyContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

export function PrivacyManagement() {
  const [privacy, setPrivacy] = useState<PrivacyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPrivacy();
  }, []);

  async function fetchPrivacy() {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<PrivacyContent>>('/admin/content/privacy');
      setPrivacy(response.data.data);
    } catch (error) {
      console.error('Error fetching privacy content:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(data: PrivacyContent) {
    setSaving(true);
    setSuccess(false);
    try {
      await apiClient.put(`/admin/content/privacy`, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving privacy content:', error);
      alert('Erro ao salvar política de privacidade');
    } finally {
      setSaving(false);
    }
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestão de Política de Privacidade</h1>

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            Política de privacidade salva com sucesso!
          </div>
        )}

        {privacy && <PrivacyForm data={privacy} onSave={handleSave} saving={saving} />}
      </div>
    </AdminLayout>
  );
}

function PrivacyForm({
  data,
  onSave,
  saving,
}: {
  data: PrivacyContent;
  onSave: (data: PrivacyContent) => void;
  saving: boolean;
}) {
  const { register, handleSubmit } = useForm<PrivacyContent>({
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Edite o conteúdo da política de privacidade. Use Markdown para formatação (títulos, listas, etc).
        </p>
        <Textarea
          label="Conteúdo da Política de Privacidade"
          rows={30}
          className="font-mono text-sm"
          {...register('content', { required: 'Conteúdo é obrigatório' })}
        />
      </div>

      <Button type="submit" isLoading={saving}>
        Guardar Alterações
      </Button>
    </form>
  );
}
