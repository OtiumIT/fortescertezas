import { AdminLayout } from '@/components/admin/AdminLayout';
import { useLocation } from 'react-router-dom';

const featureDescriptions: Record<string, { title: string; description: string }> = {
  '/admin/clients': {
    title: 'Cadastro de Cliente',
    description:
      'Esta funcionalidade permitirá cadastrar e gerir todos os clientes da empresa. Você poderá adicionar informações de contato, histórico de serviços, e manter um registro completo de cada cliente.',
  },
  '/admin/contracts': {
    title: 'Gestão de Contratos',
    description:
      'Sistema completo para gerenciar contratos com clientes. Cadastre novos contratos, acompanhe datas de vencimento, renovações, termos e condições. Mantenha um histórico completo de todos os contratos ativos e encerrados.',
  },
  '/admin/enterprises': {
    title: 'Cadastro de Empreendimentos',
    description:
      'Gerencie todos os empreendimentos da empresa. Cadastre novos empreendimentos, edite informações, e mantenha um registro detalhado de cada localização.',
  },
  '/admin/occurrences': {
    title: 'Gestão de Ocorrências',
    description:
      'Sistema de gestão de ocorrências (chamados) para registrar, acompanhar e resolver eventos que necessitam atenção. Permite criar ocorrências, atribuir responsáveis, acompanhar o status de resolução, e manter um histórico completo.',
  },
  '/admin/employees': {
    title: 'Cadastro de Funcionários',
    description:
      'Gerencie o cadastro completo de funcionários, incluindo informações pessoais, horários preferidos de trabalho, data de entrada na empresa, e horários desejados. Essas informações serão utilizadas no gerador de escalas.',
  },
  '/admin/schedule': {
    title: 'Gerador de Escala de Trabalho',
    description:
      'Sistema inteligente para gerar escalas de trabalho considerando preferências dos funcionários, regras de negócio (como funcionários mais antigos terem preferência em horários), e gestão de faltas. O sistema poderá automaticamente sugerir substituições baseadas nas preferências cadastradas.',
  },
  '/admin/working-hours': {
    title: 'Relatórios de Horas Trabalhadas',
    description:
      'Visualize e gerencie relatórios detalhados de horas trabalhadas pelos funcionários. Gere relatórios mensais, semanais ou por período específico, com informações sobre horas extras, faltas, atrasos e presenças.',
  },
};

export function ComingSoon() {
  const location = useLocation();
  const feature = featureDescriptions[location.pathname] || {
    title: 'Funcionalidade em Desenvolvimento',
    description: 'Esta funcionalidade está sendo desenvolvida e estará disponível em breve.',
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🔒</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{feature.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Em desenvolvimento:</strong> Esta funcionalidade está sendo desenvolvida e
              estará disponível em breve.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
