import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useBranding } from '@/hooks/useBranding';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { LoginInput } from '@/types/auth.types';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { branding } = useBranding();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setError(null);

    const result = await login(data);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Credenciais inválidas');
    }

    setIsSubmitting(false);
  };

  const logoUrl = branding?.logo.header || '/logos/fortes certezas 2017 sf sletras_1.png';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-end gap-4 mb-2">
            <img
              src={logoUrl}
              alt="Fortes Certezas"
              className="h-24 object-contain"
            />
            <div className="flex flex-col gap-0">
              <h1 className="text-2xl font-bold text-neutral-900 leading-none">
                <span className="text-primary-500">F</span>ORTES
              </h1>
              <h1 className="text-2xl font-bold text-neutral-900 leading-none">
                <span className="text-primary-500">C</span>ERTEZAS
              </h1>
            </div>
          </div>
          <p className="text-xs text-neutral-400">
            Supervisão | Portarias | Condomínios
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">
              Área Administrativa
            </h2>
            <p className="text-center text-sm text-neutral-600">
              Faça login para aceder ao painel de administração
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Username"
                type="text"
                autoComplete="username"
                placeholder="Digite o seu username"
                {...register('username', { required: 'Username é obrigatório' })}
                error={errors.username?.message}
              />

              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Digite a sua password"
                {...register('password', { required: 'Password é obrigatória' })}
                error={errors.password?.message}
              />
            </div>

            <div>
              <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
