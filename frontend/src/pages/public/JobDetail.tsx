import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { parseMarkdownToHTML } from '@/lib/markdown';
import type { Job } from '@/types/job.types';
import type { CreateApplicationInput } from '@/types/application.types';
import type { ApiResponse } from '@/types/api.types';

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateApplicationInput & { resume: FileList }>();

  useEffect(() => {
    async function fetchJob() {
      if (!id) return;

      try {
        const response = await apiClient.get<ApiResponse<Job>>(`/jobs/${id}`);
        setJob(response.data.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  const onSubmit = async (data: CreateApplicationInput & { resume: FileList }) => {
    if (!id || !data.resume || data.resume.length === 0) {
      setSubmitError('Currículo é obrigatório');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      formData.append('jobId', id);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.message) {
        formData.append('message', data.message);
      }
      formData.append('resume', data.resume[0]);

      await apiClient.post('/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmitSuccess(true);
      reset();
      setShowApplicationForm(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message || 'Erro ao enviar candidatura. Tente novamente.');
      } else {
        setSubmitError('Erro ao enviar candidatura. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar vaga...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container-modern py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">Vaga não encontrada</h1>
        <Link to="/vagas">
          <Button>Voltar para Vagas</Button>
        </Link>
      </div>
    );
  }

  // Structured Data para Google Jobs
  useEffect(() => {
    const jobStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description.replace(/<[^>]*>/g, ''), // Remove HTML tags
      identifier: {
        '@type': 'PropertyValue',
        name: 'Fortes Certezas',
        value: job.id,
      },
      datePosted: job.publishedAt,
      validThrough: job.expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      employmentType: job.contractType,
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Fortes Certezas, Unipessoal Lda.',
        sameAs: typeof window !== 'undefined' ? window.location.origin : '',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location,
          addressCountry: 'PT',
        },
      },
      ...(job.salary && {
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'EUR',
          value: {
            '@type': 'QuantitativeValue',
            value: job.salary,
          },
        },
      }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jobStructuredData);
    script.id = 'job-structured-data';
    
    // Remove script anterior se existir
    const existingScript = document.getElementById('job-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('job-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [job]);

  return (
    <div>
      <div className="border-b-4 border-primary bg-white">
        <div className="container-modern py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/vagas"
              className="text-neutral-600 hover:text-primary mb-4 inline-flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para Vagas
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-6 text-base text-neutral-600">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.contractType}
              </span>
              {job.salary && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.salary}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none mb-8">
              <div
                className="text-neutral-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownToHTML(job.description),
                }}
              />
            </article>

            {job.requirements.length > 0 && (
              <div className="card p-8 mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Requisitos</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start text-neutral-700">
                      <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-8">
              <Button
                onClick={() => setShowApplicationForm(!showApplicationForm)}
                className="w-full md:w-auto"
                size="lg"
              >
                {showApplicationForm ? 'Cancelar Candidatura' : 'Candidatar-me'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Candidatura */}
      {showApplicationForm && (
        <section className="py-12 md:py-16 bg-neutral-50">
          <div className="container-modern">
            <div className="max-w-2xl mx-auto">
              <div className="card p-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-6">Candidatar-se</h2>

                {submitSuccess && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-success mb-6">
                    Candidatura enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error mb-6">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Input
                    label="Nome Completo"
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

                  <Textarea
                    label="Mensagem de Apresentação (Opcional)"
                    rows={4}
                    placeholder="Conte-nos um pouco sobre si..."
                    {...register('message')}
                    error={errors.message?.message}
                  />

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Currículo (PDF) <span className="text-primary-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      {...register('resume', {
                        required: 'Currículo é obrigatório',
                        validate: {
                          fileSize: (files) => {
                            if (files && files[0]) {
                              return files[0].size <= 5 * 1024 * 1024 || 'Arquivo deve ter no máximo 5MB';
                            }
                            return true;
                          },
                          fileType: (files) => {
                            if (files && files[0]) {
                              return files[0].type === 'application/pdf' || 'Arquivo deve ser PDF';
                            }
                            return true;
                          },
                        },
                      })}
                      className="input"
                    />
                    {errors.resume && (
                      <p className="mt-2 text-sm text-error">{errors.resume.message}</p>
                    )}
                    <p className="mt-2 text-sm text-neutral-500">Máximo 5MB, formato PDF</p>
                  </div>

                  <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
                    Enviar Candidatura
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
