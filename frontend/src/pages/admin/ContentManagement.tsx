import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FileUpload } from '@/components/ui/FileUpload';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { HomepageContent, HomepageHero, AboutContent, ContactContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

type ContentSection = 'homepage' | 'about' | 'contact';

export function ContentManagement() {
  const [activeSection, setActiveSection] = useState<ContentSection>('homepage');
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [about, setAbout] = useState<AboutContent | null>(null);
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [activeSection]);

  async function fetchContent() {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<HomepageContent | AboutContent | ContactContent>>(
        `/admin/content/${activeSection}`
      );
      if (activeSection === 'homepage') {
        setHomepage(response.data.data as HomepageContent);
      } else if (activeSection === 'about') {
        setAbout(response.data.data as AboutContent);
      } else {
        setContact(response.data.data as ContactContent);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveHomepage(data: HomepageContent) {
    setSaving(true);
    setSuccess(false);
    try {
      await apiClient.put(`/admin/content/homepage`, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveAbout(data: AboutContent) {
    setSaving(true);
    setSuccess(false);
    try {
      await apiClient.put(`/admin/content/about`, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveContact(data: ContactContent) {
    setSaving(true);
    setSuccess(false);
    try {
      await apiClient.put(`/admin/content/contact`, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestão de Conteúdo</h1>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveSection('homepage')}
              className={`px-6 py-3 font-medium ${
                activeSection === 'homepage'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Homepage
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-6 py-3 font-medium ${
                activeSection === 'about'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sobre Nós
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className={`px-6 py-3 font-medium ${
                activeSection === 'contact'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Contacto
            </button>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            Conteúdo salvo com sucesso!
          </div>
        )}

        {activeSection === 'homepage' && homepage && (
          <HomepageForm data={homepage} onSave={handleSaveHomepage} saving={saving} />
        )}

        {activeSection === 'about' && about && (
          <AboutForm data={about} onSave={handleSaveAbout} saving={saving} />
        )}

        {activeSection === 'contact' && contact && (
          <ContactForm data={contact} onSave={handleSaveContact} saving={saving} />
        )}
      </div>
    </AdminLayout>
  );
}

function HomepageForm({
  data,
  onSave,
  saving,
}: {
  data: HomepageContent;
  onSave: (data: HomepageContent) => void;
  saving: boolean;
}) {
  // Garantir que heroes seja um array
  const heroesData = data.heroes || (data.hero ? [data.hero] : []);
  
  const { register, handleSubmit, setValue, watch } = useForm<HomepageContent>({
    defaultValues: {
      ...data,
      heroes: heroesData,
    },
  });

  const heroes = watch('heroes') || [];

  function addHero() {
    if (heroes.length < 3) {
      const newHero: HomepageHero = {
        title: '',
        subtitle: '',
        description: '',
        ctaText: '',
        ctaLink: '',
        backgroundImage: '',
      };
      setValue('heroes', [...heroes, newHero]);
    }
  }

  function removeHero(index: number) {
    const newHeroes = heroes.filter((_: unknown, i: number) => i !== index);
    setValue('heroes', newHeroes);
  }

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Hero Sections (até 3)</h2>
          {heroes.length < 3 && (
            <Button type="button" onClick={addHero} variant="outline" size="sm">
              + Adicionar Hero
            </Button>
          )}
        </div>
        
        {heroes.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">Nenhum hero configurado</p>
            <Button type="button" onClick={addHero} variant="outline">
              Adicionar Primeiro Hero
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {heroes.map((hero: { title: string; subtitle: string; backgroundImage?: string }, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Hero {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => removeHero(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </Button>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Título"
                  {...register(`heroes.${index}.title`)}
                />
                <Input
                  label="Subtítulo"
                  {...register(`heroes.${index}.subtitle`)}
                />
                <Textarea
                  label="Descrição"
                  rows={3}
                  {...register(`heroes.${index}.description`)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Texto do Botão CTA"
                    {...register(`heroes.${index}.ctaText`)}
                  />
                  <Input
                    label="Link do Botão CTA"
                    {...register(`heroes.${index}.ctaLink`)}
                    placeholder="/contacto"
                  />
                </div>
                <FileUpload
                  label="Imagem do Hero"
                  value={hero.backgroundImage}
                  onChange={(url: string) => setValue(`heroes.${index}.backgroundImage`, url)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Seção Sobre</h2>
        <div className="space-y-4">
          <Input label="Título" {...register('about.title')} />
          <Textarea label="Descrição" rows={4} {...register('about.description')} />
        </div>
      </div>

      <Button type="submit" isLoading={saving}>
        Guardar Alterações
      </Button>
    </form>
  );
}

function AboutForm({
  data,
  onSave,
  saving,
}: {
  data: AboutContent;
  onSave: (data: AboutContent) => void;
  saving: boolean;
}) {
  const { register, handleSubmit } = useForm<AboutContent>({
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">História</h2>
        <Input label="Título" {...register('history.title')} />
        <Textarea label="Conteúdo" rows={6} {...register('history.content')} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Missão</h2>
        <Textarea label="Missão" rows={4} {...register('mission')} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Visão</h2>
        <Textarea label="Visão" rows={4} {...register('vision')} />
      </div>

      <Button type="submit" isLoading={saving}>
        Guardar Alterações
      </Button>
    </form>
  );
}

function ContactForm({
  data,
  onSave,
  saving,
}: {
  data: ContactContent;
  onSave: (data: ContactContent) => void;
  saving: boolean;
}) {
  const { register, handleSubmit } = useForm<ContactContent>({
    defaultValues: data,
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white rounded-lg shadow p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Informações Gerais</h2>
        <div className="space-y-4">
          <Input label="Título" {...register('title')} />
          <Textarea label="Descrição" rows={3} {...register('description')} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Contacto</h2>
        <div className="space-y-4">
          <Input label="Telefone" {...register('phone')} />
          <Input label="Email" type="email" {...register('email')} />
          <Input label="WhatsApp" {...register('whatsapp')} />
          <Input label="Horário de Atendimento" {...register('businessHours')} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Morada</h2>
        <div className="space-y-4">
          <Input label="Rua" {...register('address.street')} />
          <Input label="Cidade/Código Postal" {...register('address.city')} />
          <Input label="Localização" {...register('address.location')} />
        </div>
      </div>

      <Button type="submit" isLoading={saving}>
        Guardar Alterações
      </Button>
    </form>
  );
}
