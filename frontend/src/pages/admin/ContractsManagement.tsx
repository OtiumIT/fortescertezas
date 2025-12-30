import { AdminLayout } from '@/components/admin/AdminLayout';

export function ContractsManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">📄</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gestão de Contratos</h1>
              <p className="text-gray-600 mt-1">Controlo completo do ciclo de vida dos contratos</p>
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
                Esta funcionalidade permitirá gerir todo o ciclo de vida dos contratos com clientes, desde a criação
                até a renovação ou encerramento, com alertas automáticos e rastreabilidade completa.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Controlo Total</h3>
              <p className="text-primary-50 text-sm mb-4">
                Acompanhe todos os contratos num único sistema: status, prazos, valores e condições acordadas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Alertas Automáticos</h3>
              <p className="text-primary-50 text-sm mb-4">
                Notificações automáticas para renovações, vencimentos e datas importantes, evitando perdas de negócio.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Histórico Completo</h3>
              <p className="text-primary-50 text-sm mb-4">
                Mantenha registo de todas as alterações, negociações e versões dos contratos para referência futura.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Análise Financeira</h3>
              <p className="text-primary-50 text-sm mb-4">
                Visualize receitas previstas, receitas reais e previsões futuras baseadas nos contratos ativos.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Funcionalidades Principais</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Criação e Edição de Contratos</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Template de contratos com campos personalizáveis</li>
                  <li>• Informações detalhadas: valores, prazos, condições de pagamento</li>
                  <li>• Anexo de documentos (PDF, Word, etc.)</li>
                  <li>• Versão e histórico de alterações</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Gestão de Prazos e Renovações</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Calendário de vencimentos e renovações</li>
                  <li>• Alertas automáticos (30, 60, 90 dias antes do vencimento)</li>
                  <li>• Histórico de renovações anteriores</li>
                  <li>• Processo de renovação guiado</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Status e Ciclo de Vida</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Estados: Rascunho, Em Negociação, Ativo, Suspenso, Encerrado</li>
                  <li>• Transições de status com registo de data e motivo</li>
                  <li>• Filtros por status para visualização rápida</li>
                  <li>• Dashboard com resumo de contratos por status</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Informações Financeiras</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Valores contratuais (mensais, anuais, totais)</li>
                  <li>• Condições de pagamento e frequência</li>
                  <li>• Histórico de faturação relacionada</li>
                  <li>• Análise de rentabilidade por contrato</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Pesquisa e Filtros Avançados</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Pesquisa por cliente, valor, data, status</li>
                  <li>• Filtros combinados para análises específicas</li>
                  <li>• Exportação para Excel/PDF</li>
                  <li>• Relatórios personalizados</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Dashboard e Relatórios</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Visão geral de contratos ativos, vencendo, encerrados</li>
                  <li>• Receita prevista vs. receita realizada</li>
                  <li>• Taxa de renovação e retenção de clientes</li>
                  <li>• Previsões de receita futura</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">⚡ Prevenção de Perdas</h3>
              <p className="text-green-700 text-sm">
                Alertas automáticos garantem que nenhum contrato seja esquecido, reduzindo risco de não renovação.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📈 Visibilidade Financeira</h3>
              <p className="text-blue-700 text-sm">
                Previsões de receita mais precisas ajudam no planeamento financeiro e tomada de decisões.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Eficiência Operacional</h3>
              <p className="text-purple-700 text-sm">
                Redução do tempo gasto a procurar informações de contratos e documentos relacionados.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">🔒 Rastreabilidade</h3>
              <p className="text-orange-700 text-sm">
                Histórico completo de alterações e negociações para referência futura e compliance.
              </p>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Impacto no Negócio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">0%</div>
              <p className="text-sm text-gray-700 font-semibold">Contratos Esquecidos</p>
              <p className="text-xs text-gray-500 mt-1">com alertas automáticos</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">+15-25%</div>
              <p className="text-sm text-gray-700 font-semibold">Taxa de Renovação</p>
              <p className="text-xs text-gray-500 mt-1">com gestão proativa</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">50%</div>
              <p className="text-sm text-gray-700 font-semibold">Menos Tempo</p>
              <p className="text-xs text-gray-500 mt-1">na gestão de contratos</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
