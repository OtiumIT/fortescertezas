import { AdminLayout } from '@/components/admin/AdminLayout';

export function OccurrencesManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">🚨</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gestão de Ocorrências</h1>
              <p className="text-gray-600 mt-1">Sistema completo para registro, acompanhamento e resolução de ocorrências</p>
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
                Esta funcionalidade permitirá registar, acompanhar e resolver todas as ocorrências (chamados, incidentes, solicitações)
                de forma organizada e eficiente, garantindo que nada seja esquecido.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Rastreabilidade Completa</h3>
              <p className="text-primary-50 text-sm mb-4">
                Todas as ocorrências registadas e rastreadas desde a criação até a resolução, com histórico completo de ações.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Resposta Mais Rápida</h3>
              <p className="text-primary-50 text-sm mb-4">
                Atribuição automática e notificações garantem que ocorrências sejam tratadas rapidamente pelas pessoas certas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Análise de Padrões</h3>
              <p className="text-primary-50 text-sm mb-4">
                Identifique tipos de ocorrências mais frequentes, padrões e áreas que precisam de melhorias ou mais atenção.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Melhoria Contínua</h3>
              <p className="text-primary-50 text-sm mb-4">
                Dados históricos ajudam a melhorar processos, prevenir problemas recorrentes e aumentar a satisfação dos clientes.
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
                <span className="text-2xl">➕</span>
                <h3 className="font-semibold text-gray-800">Registo de Ocorrências</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Formulário completo de registro</li>
                <li>• Categorização por tipo e prioridade</li>
                <li>• Anexo de fotos e documentos</li>
                <li>• Associação a cliente/empreendimento</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">👤</span>
                <h3 className="font-semibold text-gray-800">Atribuição e Responsáveis</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Atribuição automática ou manual</li>
                <li>• Notificações para responsáveis</li>
                <li>• Histórico de atribuições</li>
                <li>• Transferência entre responsáveis</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-gray-800">Status e Acompanhamento</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Estados: Aberto, Em Andamento, Em Atraso, Resolvido, Fechado</li>
                <li>• Timeline de ações e atualizações</li>
                <li>• Comentários e observações</li>
                <li>• Filtros por status e prioridade</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⏱️</span>
                <h3 className="font-semibold text-gray-800">SLA e Prazos</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Definição de prazos por tipo/categoria</li>
                <li>• Alertas de prazo próximo ao vencimento</li>
                <li>• Indicadores de SLA cumprido/atrasado</li>
                <li>• Relatórios de performance de resolução</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🔍</span>
                <h3 className="font-semibold text-gray-800">Pesquisa e Filtros</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Pesquisa por texto, cliente, data, status</li>
                <li>• Filtros avançados combinados</li>
                <li>• Visualização em lista ou kanban</li>
                <li>• Exportação para relatórios</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📈</span>
                <h3 className="font-semibold text-gray-800">Dashboard e Relatórios</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Visão geral de ocorrências abertas</li>
                <li>• Estatísticas por tipo, status, cliente</li>
                <li>• Tempo médio de resolução</li>
                <li>• Gráficos e análises visuais</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔄 Fluxo de Trabalho</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Registo</h3>
                <p className="text-gray-600 text-sm">Ocorrência é criada com informações detalhadas, tipo, prioridade e cliente associado.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Atribuição</h3>
                <p className="text-gray-600 text-sm">Responsável é atribuído automaticamente ou manualmente, recebendo notificação.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Acompanhamento</h3>
                <p className="text-gray-600 text-sm">Status atualizado com comentários, fotos e observações durante o processo de resolução.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">Resolução</h3>
                <p className="text-gray-600 text-sm">Ocorrência marcada como resolvida com descrição da solução e pode ser fechada após validação.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">⚡ Resposta Mais Rápida</h3>
              <p className="text-green-700 text-sm">
                Sistema organizado e notificações garantem que ocorrências sejam tratadas rapidamente, melhorando a satisfação do cliente.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📊 Visibilidade Total</h3>
              <p className="text-blue-700 text-sm">
                Todos os envolvidos têm visibilidade do status das ocorrências, evitando retrabalho e melhorando comunicação.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Prevenção de Problemas</h3>
              <p className="text-purple-700 text-sm">
                Análise de padrões ajuda a identificar causas raiz e prevenir ocorrências recorrentes.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">📈 Melhoria Contínua</h3>
              <p className="text-orange-700 text-sm">
                Dados históricos permitem melhorar processos, treinar equipas e definir metas de performance.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Métricas e KPIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">Tempo Médio</div>
              <p className="text-sm text-gray-700">de Resolução</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">Taxa de SLA</div>
              <p className="text-sm text-gray-700">Cumprido</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">Ocorrências</div>
              <p className="text-sm text-gray-700">por Tipo</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">Satisfação</div>
              <p className="text-sm text-gray-700">do Cliente</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
