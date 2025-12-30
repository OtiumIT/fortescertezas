import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { PageHeader } from '@/components/layout/PageHeader';
import { parseMarkdownToHTML } from '@/lib/markdown';
import type { Job } from '@/types/job.types';
import type { CreateApplicationInput } from '@/types/application.types';
import type { ApiResponse } from '@/types/api.types';

export function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await apiClient.get<ApiResponse<Job[]>>('/jobs?status=active');
        setJobs(response.data.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar vagas...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Vagas de Emprego" 
        subtitle="Junte-se à nossa equipa. Veja as oportunidades disponíveis."
      />

      {/* Jobs List */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            {jobs.length === 0 ? (
              <div className="text-center py-16 card">
                <p className="text-neutral-600 text-lg mb-4">Não há vagas disponíveis no momento.</p>
                <p className="text-neutral-500 mb-6">
                  Envie-nos o seu currículo através do{' '}
                  <a href="/contacto" className="text-primary-500 hover:text-primary-600 font-semibold">
                    formulário de contacto
                  </a>
                  .
                </p>
                <a href="/contacto">
                  <Button>Enviar Currículo</Button>
                </a>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isExpanded={expandedJobId === job.id}
                  onToggle={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                  isSubmitting={isSubmitting === job.id}
                  submitSuccess={submitSuccess === job.id}
                  submitError={submitError[job.id]}
                  onSuccess={() => {
                    setSubmitSuccess(job.id);
                    setExpandedJobId(null);
                    setTimeout(() => setSubmitSuccess(null), 5000);
                  }}
                  onError={(error) => {
                    setSubmitError({ ...submitError, [job.id]: error });
                  }}
                  setIsSubmitting={(jobId, submitting) => {
                    setIsSubmitting(submitting ? jobId : null);
                  }}
                />
              ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

interface JobCardProps {
  job: Job;
  isExpanded: boolean;
  onToggle: () => void;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError?: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  setIsSubmitting: (jobId: string, submitting: boolean) => void;
}

function JobCard({
  job,
  isExpanded,
  onToggle,
  isSubmitting,
  submitSuccess,
  submitError,
  onSuccess,
  onError,
  setIsSubmitting,
}: JobCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateApplicationInput & { resume: FileList }>();

  const onSubmit = async (data: CreateApplicationInput & { resume: FileList }) => {
    if (!data.resume || data.resume.length === 0) {
      onError('Currículo é obrigatório');
      return;
    }

    setIsSubmitting(job.id, true);

    try {
      const formData = new FormData();
      formData.append('jobId', job.id);
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

      reset();
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        onError(error.message || 'Erro ao enviar candidatura. Tente novamente.');
      } else {
        onError('Erro ao enviar candidatura. Tente novamente.');
      }
    } finally {
      setIsSubmitting(job.id, false);
    }
  };

  return (
    <div className="card card-hover p-6">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">{job.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.contractType}
              </span>
              {job.salary && (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {job.salary}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="prose prose-lg max-w-none text-neutral-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: parseMarkdownToHTML(job.description),
          }}
        />

        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Requisitos</h3>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start text-neutral-700">
                  <svg className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-4 border-t border-neutral-200">
          {!isExpanded ? (
            <Button onClick={onToggle} className="w-full md:w-auto" size="lg">
              Candidatar-me
            </Button>
          ) : (
            <Button onClick={onToggle} variant="outline" className="w-full md:w-auto" size="lg">
              Fechar Formulário
            </Button>
          )}
        </div>

        {/* Application Form */}
        {isExpanded && (
          <div className="pt-5 border-t border-neutral-200 mt-5">
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-5">Candidatar-se</h3>

            {submitSuccess && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 mb-6">
                Candidatura enviada com sucesso! Entraremos em contacto em breve.
              </div>
            )}

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 mb-6">
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
                  className="block w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
                />
                {errors.resume && <p className="mt-2 text-sm text-red-600">{errors.resume.message}</p>}
                <p className="mt-2 text-sm text-neutral-500">Máximo 5MB, formato PDF</p>
              </div>

              <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
                Enviar Candidatura
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
