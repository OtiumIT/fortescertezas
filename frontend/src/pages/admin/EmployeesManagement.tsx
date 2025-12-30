import { AdminLayout } from '@/components/admin/AdminLayout';

export function EmployeesManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Funcionários</h1>
              <p className="text-gray-600 mt-1">Gestão completa da informação dos funcionários</p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-500 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🔒</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Funcionalidade em Desenvolvimento</h3>
              <p className="text-gray-700">
                Esta funcionalidade permitirá gerir todos os dados dos funcionários, incluindo informações pessoais,
                preferências de horários, disponibilidade e histórico, essencial para o gerador de escalas.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Base para Escalas</h3>
              <p className="text-primary-50 text-sm mb-4">
                Informações completas dos funcionários são essenciais para o gerador automático de escalas funcionar corretamente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Gestão de Disponibilidade</h3>
              <p className="text-primary-50 text-sm mb-4">
                Registro de férias, licenças, preferências e indisponibilidades facilita a criação de escalas justas e eficientes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Histórico Completo</h3>
              <p className="text-primary-50 text-sm mb-4">
                Mantenha registo de todas as informações relevantes: contratações, avaliações, treinamentos e histórico de trabalho.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Conformidade Legal</h3>
              <p className="text-primary-50 text-sm mb-4">
                Organização de documentos e informações necessárias para compliance trabalhista e fiscal.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Funcionalidades Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📇</span>
                <h3 className="font-semibold text-gray-800">Dados Pessoais e Profissionais</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Informações de contacto e identificação</li>
                <li>• Dados fiscais e bancários</li>
                <li>• Data de entrada na empresa</li>
                <li>• Cargo e função</li>
                <li>• Especializações e certificações</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⏰</span>
                <h3 className="font-semibold text-gray-800">Preferências de Horários</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Turnos preferidos (manhã, tarde, noite)</li>
                <li>• Dias da semana preferidos</li>
                <li>• Disponibilidade geral</li>
                <li>• Restrições de horário</li>
                <li>• Flexibilidade para substituições</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📅</span>
                <h3 className="font-semibold text-gray-800">Gestão de Férias e Licenças</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Registo de férias planeadas e aprovadas</li>
                <li>• Licenças médicas e outras ausências</li>
                <li>• Calendário de indisponibilidades</li>
                <li>• Histórico de férias e licenças</li>
                <li>• Saldo de dias disponíveis</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏢</span>
                <h3 className="font-semibold text-gray-800">Alocação a Empreendimentos</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Empreendimentos onde trabalha regularmente</li>
                <li>• Capacidade de trabalhar em múltiplos locais</li>
                <li>• Preferências por empreendimento</li>
                <li>• Histórico de alocações</li>
                <li>• Qualificações específicas por local</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-gray-800">Histórico e Performance</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Histórico de escalas trabalhadas</li>
                <li>• Horas trabalhadas e extras</li>
                <li>• Faltas e atrasos</li>
                <li>• Avaliações e feedback</li>
                <li>• Treinamentos realizados</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📄</span>
                <h3 className="font-semibold text-gray-800">Documentos e Certificações</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Anexo de documentos (contratos, certificados)</li>
                <li>• Controlo de validade de certificações</li>
                <li>• Alertas de vencimento</li>
                <li>• Arquivo digital organizado</li>
                <li>• Histórico de documentos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration with Schedule */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔗 Integração com Gerador de Escalas</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <p className="text-gray-700 mb-4">
              <strong>Importância:</strong> As informações cadastradas aqui são utilizadas pelo Gerador de Escalas para:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Respeitar Preferências</h4>
                  <p className="text-gray-600 text-xs mt-1">O sistema considera os horários preferidos de cada funcionário</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Evitar Conflitos</h4>
                  <p className="text-gray-600 text-xs mt-1">Considera férias, licenças e indisponibilidades registadas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Aplicar Regras</h4>
                  <p className="text-gray-600 text-xs mt-1">Respeita antiguidade, especializações e limites de horas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Sugerir Substituições</h4>
                  <p className="text-gray-600 text-xs mt-1">Identifica funcionários qualificados disponíveis em caso de falta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">⚡ Escalas Mais Justas</h3>
              <p className="text-green-700 text-sm">
                Informação completa permite criar escalas que respeitam preferências e distribuem turnos de forma equitativa.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📊 Visibilidade</h3>
              <p className="text-blue-700 text-sm">
                Acesso rápido a informações de qualquer funcionário, histórico e disponibilidade atual.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Gestão Eficiente</h3>
              <p className="text-purple-700 text-sm">
                Redução do tempo gasto a procurar informações, contactos e disponibilidades de funcionários.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">🔒 Conformidade</h3>
              <p className="text-orange-700 text-sm">
                Organização de documentos e informações necessárias para compliance trabalhista e fiscal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
