import { AdminLayout } from '@/components/admin/AdminLayout';

export function WorkingHoursManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">⏱️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Relatórios de Horas Trabalhadas</h1>
              <p className="text-gray-600 mt-1">Análise completa e detalhada das horas trabalhadas pelos funcionários</p>
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
                Esta funcionalidade permitirá visualizar, analisar e gerir relatórios detalhados de horas trabalhadas,
                facilitando o controlo de horas extras, faltas, atrasos e presenças para cálculo de salários e análises de produtividade.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Controlo Preciso</h3>
              <p className="text-primary-50 text-sm mb-4">
                Acompanhamento preciso de horas trabalhadas, extras, faltas e atrasos para cálculo correto de salários.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Conformidade Legal</h3>
              <p className="text-primary-50 text-sm mb-4">
                Relatórios detalhados facilitam o cumprimento de obrigações legais e fiscais relacionadas com horas trabalhadas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Análise de Produtividade</h3>
              <p className="text-primary-50 text-sm mb-4">
                Identifique padrões, eficiência operacional e oportunidades de otimização de recursos humanos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Transparência</h3>
              <p className="text-primary-50 text-sm mb-4">
                Funcionários e gestores têm acesso a informações claras sobre horas trabalhadas, facilitando comunicação e resolução de questões.
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
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-gray-800">Relatórios Detalhados</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Relatórios mensais, semanais ou por período</li>
                <li>• Horas trabalhadas por funcionário</li>
                <li>• Horas extras e compensações</li>
                <li>• Comparativos entre períodos</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">✅</span>
                <h3 className="font-semibold text-gray-800">Controlo de Presenças</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Registro de entrada e saída</li>
                <li>• Faltas justificadas e não justificadas</li>
                <li>• Atrasos e saídas antecipadas</li>
                <li>• Histórico completo de presenças</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⏰</span>
                <h3 className="font-semibold text-gray-800">Horas Extras</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Cálculo automático de horas extras</li>
                <li>• Diferenciação por tipo (diurnas, noturnas)</li>
                <li>• Limites legais e alertas</li>
                <li>• Compensação em banco de horas</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📅</span>
                <h3 className="font-semibold text-gray-800">Calendário de Trabalho</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Visualização mensal de horas por funcionário</li>
                <li>• Destaque de dias trabalhados vs. folgas</li>
                <li>• Férias e licenças registadas</li>
                <li>• Exportação para calendário</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📈</span>
                <h3 className="font-semibold text-gray-800">Análises e Estatísticas</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Média de horas trabalhadas</li>
                <li>• Distribuição por turno e dia da semana</li>
                <li>• Taxa de assiduidade</li>
                <li>• Gráficos e visualizações</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💾</span>
                <h3 className="font-semibold text-gray-800">Exportação e Integração</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Exportação para Excel/PDF</li>
                <li>• Integração com folha de pagamento</li>
                <li>• Relatórios personalizados</li>
                <li>• API para sistemas externos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration with Schedule */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔗 Integração com Escalas</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
            <p className="text-gray-700 mb-4">
              <strong>Automação:</strong> Os dados são gerados automaticamente a partir das escalas criadas:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Sincronização Automática</h4>
                  <p className="text-gray-600 text-xs">
                    Quando uma escala é publicada, as horas são automaticamente registadas para cada funcionário.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">📝</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Registo de Alterações</h4>
                  <p className="text-gray-600 text-xs">
                    Substituições, faltas e alterações de escala são refletidas automaticamente nos relatórios.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 text-xl">⚖️</span>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">Validação</h4>
                  <p className="text-gray-600 text-xs">
                    Sistema valida horas trabalhadas vs. horas planeadas, destacando discrepâncias para correção.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">✅ Benefícios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">⚡ Precisão</h3>
              <p className="text-green-700 text-sm">
                Cálculo automático e preciso de horas trabalhadas, eliminando erros manuais no processamento de salários.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">⏱️ Economia de Tempo</h3>
              <p className="text-blue-700 text-sm">
                Redução drástica do tempo gasto na preparação de relatórios e cálculos de horas trabalhadas.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-2">📊 Visibilidade</h3>
              <p className="text-purple-700 text-sm">
                Gestores e funcionários têm acesso claro a informações sobre horas trabalhadas, facilitando transparência.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">🔒 Conformidade</h3>
              <p className="text-orange-700 text-sm">
                Relatórios detalhados facilitam o cumprimento de obrigações legais e fiscais relacionadas com trabalho.
              </p>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Impacto no Negócio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
              <p className="text-sm text-gray-700 font-semibold">Menos Tempo</p>
              <p className="text-xs text-gray-500 mt-1">na preparação de relatórios</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-sm text-gray-700 font-semibold">Precisão</p>
              <p className="text-xs text-gray-500 mt-1">nos cálculos automáticos</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-sm text-gray-700 font-semibold">Disponibilidade</p>
              <p className="text-xs text-gray-500 mt-1">de relatórios em tempo real</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
