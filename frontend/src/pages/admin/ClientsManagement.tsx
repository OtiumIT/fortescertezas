import { AdminLayout } from '@/components/admin/AdminLayout';

export function ClientsManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">👥</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Clientes</h1>
              <p className="text-gray-600 mt-1">Gestão completa do relacionamento com clientes</p>
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
                Esta funcionalidade centralizará toda a informação dos clientes, facilitando a gestão de relacionamentos,
                histórico de serviços e análises de negócio.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Centralização de Informação</h3>
              <p className="text-primary-50 text-sm mb-4">
                Todos os dados dos clientes num único local: contactos, contratos, histórico de serviços e comunicações.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Gestão de Relacionamento</h3>
              <p className="text-primary-50 text-sm mb-4">
                Acompanhe interações, necessidades e preferências de cada cliente para melhorar o atendimento.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Histórico Completo</h3>
              <p className="text-primary-50 text-sm mb-4">
                Acesso rápido ao histórico de serviços prestados, ocorrências, comunicações e faturação por cliente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Análises e Relatórios</h3>
              <p className="text-primary-50 text-sm mb-4">
                Identifique os melhores clientes, padrões de negócio e oportunidades de crescimento.
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
                <h3 className="font-semibold text-gray-800">Cadastro Completo</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Informações de contacto (telefone, email, morada)</li>
                <li>• Dados fiscais e empresariais</li>
                <li>• Pessoas de contacto e responsáveis</li>
                <li>• Notas e observações importantes</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🏢</span>
                <h3 className="font-semibold text-gray-800">Empreendimentos Vinculados</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Associação com múltiplos empreendimentos</li>
                <li>• Detalhes de cada localização</li>
                <li>• Serviços prestados por empreendimento</li>
                <li>• Contactos específicos por local</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📄</span>
                <h3 className="font-semibold text-gray-800">Histórico de Contratos</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Visualização de contratos ativos e históricos</li>
                <li>• Datas de início e término</li>
                <li>• Valores e condições acordadas</li>
                <li>• Status e renovações</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚨</span>
                <h3 className="font-semibold text-gray-800">Ocorrências Relacionadas</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Histórico de ocorrências por cliente</li>
                <li>• Estatísticas de resolução</li>
                <li>• Tempo médio de resposta</li>
                <li>• Satisfação e feedback</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💰</span>
                <h3 className="font-semibold text-gray-800">Informações Financeiras</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Resumo de faturação</li>
                <li>• Status de pagamentos</li>
                <li>• Histórico de transações</li>
                <li>• Alertas de vencimento</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-gray-800">Dashboard do Cliente</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Visão geral rápida do relacionamento</li>
                <li>• KPIs e métricas importantes</li>
                <li>• Próximas ações e lembretes</li>
                <li>• Exportação de relatórios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Benefícios</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Eficiência Operacional</h3>
                <p className="text-green-700 text-sm">
                  Redução do tempo gasto a procurar informações de clientes espalhadas em diferentes sistemas ou documentos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Melhor Atendimento</h3>
                <p className="text-blue-700 text-sm">
                  Informação completa e atualizada permite respostas mais rápidas e precisas aos clientes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-2xl">📈</span>
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">Crescimento do Negócio</h3>
                <p className="text-purple-700 text-sm">
                  Análise de dados ajuda a identificar oportunidades de upsell, cross-sell e melhoria de serviços.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-semibold text-orange-800 mb-1">Segurança de Dados</h3>
                <p className="text-orange-700 text-sm">
                  Centralização segura de informações sensíveis, com controlo de acesso e backup automático.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
