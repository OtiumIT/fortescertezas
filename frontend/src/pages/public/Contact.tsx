import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import type { CreateContactInput } from '@/types/contact.types';
import type { ContactContent } from '@/types/content.types';
import type { ApiResponse } from '@/types/api.types';

export function Contact() {
  const [contactInfo, setContactInfo] = useState<ContactContent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateContactInput>();

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await apiClient.get<ApiResponse<ContactContent>>('/content/contact');
        setContactInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    }

    fetchContactInfo();
  }, []);

  const onSubmit = async (data: CreateContactInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await apiClient.post('/contacts', data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message || 'Erro ao enviar mensagem. Tente novamente.');
      } else {
        setSubmitError('Erro ao enviar mensagem. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader 
        title={contactInfo?.title || 'Contacte-nos'} 
        subtitle={contactInfo?.description || 'Utilize o formulário abaixo para entrar em contacto connosco.'}
      />

      {/* Contact Form Section */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <div className="card p-6">
              <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-5">Envie-nos uma Mensagem</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Nome"
                  placeholder="O seu nome completo"
                  {...register('name', { required: 'Nome é obrigatório' })}
                  error={errors.name?.message}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email inválido',
                    },
                  })}
                  error={errors.email?.message}
                />

                <Input
                  label="Telefone"
                  type="tel"
                  placeholder="912 345 678"
                  {...register('phone', {
                    required: 'Telefone é obrigatório',
                    minLength: {
                      value: 9,
                      message: 'Telefone deve ter pelo menos 9 dígitos',
                    },
                  })}
                  error={errors.phone?.message}
                />

                <Input
                  label="Assunto"
                  placeholder="Assunto da mensagem"
                  {...register('subject', { required: 'Assunto é obrigatório' })}
                  error={errors.subject?.message}
                />

                <Textarea
                  label="Mensagem"
                  rows={6}
                  placeholder="A sua mensagem..."
                  {...register('message', { required: 'Mensagem é obrigatória' })}
                  error={errors.message?.message}
                />

                {submitSuccess && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-success text-sm">
                    Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
                    {submitError}
                  </div>
                )}

                <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
                  Enviar Mensagem
                </Button>
              </form>
            </div>

            {/* Informações de Contacto */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-5">Informações de Contacto</h2>
                
                {contactInfo && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Telefone</h3>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-primary-500 hover:text-primary-600 font-medium"
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary-500 hover:text-primary-600 font-medium break-all"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Morada</h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {contactInfo.address.street}
                          <br />
                          {contactInfo.address.city}
                          <br />
                          {contactInfo.address.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Horário de Atendimento</h3>
                        <p className="text-neutral-600">{contactInfo.businessHours}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Facebook</h3>
                        <a
                          href="https://www.facebook.com/fortescertezas"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:text-[#1877F2] font-medium transition-colors"
                        >
                          Siga-nos no Facebook
                        </a>
                      </div>
                    </div>

                    {contactInfo.whatsapp && (
                      <div className="pt-4 border-t border-neutral-200">
                        <a
                          href={getWhatsAppUrl(contactInfo.whatsapp, 'Olá! Gostaria de entrar em contacto com a Fortes Certezas.')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898 1.857 1.867 2.881 4.35 2.881 6.99 0 5.45-4.436 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          Fale Agora no WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
