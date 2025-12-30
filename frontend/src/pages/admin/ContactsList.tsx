import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Contact } from '@/types/contact.types';
import type { ApiResponse } from '@/types/api.types';

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  async function fetchContacts() {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<Contact[]>>(
        `/admin/contacts?status=${filter}`
      );
      setContacts(response.data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, status: 'new' | 'read' | 'responded') {
    try {
      await apiClient.patch(`/admin/contacts/${id}`, { status, read: status !== 'new' });
      fetchContacts();
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status, read: status !== 'new' });
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Erro ao atualizar status');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar este contato?')) return;

    try {
      await apiClient.delete(`/admin/contacts/${id}`);
      fetchContacts();
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Erro ao deletar contato');
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Contatos Recebidos</h1>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button
              variant={filter === 'new' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('new')}
            >
              Novos
            </Button>
            <Button
              variant={filter === 'read' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              Lidos
            </Button>
            <Button
              variant={filter === 'responded' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('responded')}
            >
              Respondidos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Lista de Contatos ({contacts.length})</h2>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedContact?.id === contact.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString('pt-PT')}
                        </p>
                      </div>
                      {contact.status === 'new' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Novo
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedContact.name}</h2>
                    <p className="text-gray-600">{selectedContact.email}</p>
                    <p className="text-gray-600">{selectedContact.phone}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedContact.status === 'new'
                        ? 'bg-red-100 text-red-800'
                        : selectedContact.status === 'read'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {selectedContact.status === 'new'
                      ? 'Novo'
                      : selectedContact.status === 'read'
                      ? 'Lido'
                      : 'Respondido'}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-1">Assunto</h3>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-1">Mensagem</h3>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>

                <div className="mb-4 text-sm text-gray-500">
                  Recebido em: {new Date(selectedContact.createdAt).toLocaleString('pt-PT')}
                </div>

                <div className="flex gap-2">
                  {selectedContact.status !== 'read' && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(selectedContact.id, 'read')}
                    >
                      Marcar como Lido
                    </Button>
                  )}
                  {selectedContact.status !== 'responded' && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(selectedContact.id, 'responded')}
                    >
                      Marcar como Respondido
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedContact.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">Selecione um contato para ver os detalhes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
