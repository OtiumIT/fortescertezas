import { AdminLayout } from '@/components/admin/AdminLayout';

export function ScheduleManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">🗓️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gerador de Escala de Trabalho</h1>
              <p className="text-gray-600 mt-1">Sistema inteligente de gestão e geração de escalas</p>
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
                Esta funcionalidade está sendo desenvolvida e revolucionará a forma como gerimos as escalas de trabalho.
                O sistema automático substituirá os processos manuais atuais, economizando horas de trabalho e eliminando erros.
              </p>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">❌</span>
            O Problema Atual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Processo Manual e Demorado</h3>
              <p className="text-red-700 text-sm">
                Criar escalas manualmente em papel ou planilhas consome várias horas semanais do gestor.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Propenso a Erros</h3>
              <p className="text-red-700 text-sm">
                Erros humanos podem causar sobreposição de turnos, conflitos de horários ou falta de cobertura.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Dificuldade em Substituições</h3>
              <p className="text-red-700 text-sm">
                Quando um funcionário falta, encontrar um substituto adequado requer tempo e múltiplas chamadas telefónicas.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Falta de Rastreabilidade</h3>
              <p className="text-red-700 text-sm">
                Não há histórico fácil de consultar sobre quem trabalhou quando, dificultando análises e relatórios.
              </p>
            </div>
          </div>

          {/* Current Process Image */}
          <div className="mt-6 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Como é feito hoje:</h3>
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8">
              <p className="text-gray-700 mb-4 text-center">
                Atualmente, as escalas são criadas manualmente em papel ou planilhas Excel. O processo envolve:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Estrutura Atual</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Grid semanal (Segunda a Domingo) com datas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>3 turnos de 8 horas cada: 00-08h, 08-16h, 16-24h</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Funcionários identificados por cores diferentes (ex: Filipe Nascimento, A. Freitas, P. Henrique, Luis Alberto, Carlos Cardoso)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Indicação de localização específica (ex: "Lake Towers")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>Processo repetido semanalmente com necessidade de recriar</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-3">Desafios do Processo Manual</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Demora 4-6 horas por semana para criar manualmente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Risco de erros: sobreposição, conflitos, falta de cobertura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Difícil ajustar quando há faltas ou alterações</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Não considera preferências sistematicamente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>Sem histórico digital facilmente acessível</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>Referência:</strong> As imagens fornecidas das escalas manuais atuais servem como base para o desenvolvimento
                  do sistema digital, mantendo a estrutura visual familiar (cores por funcionário, turnos, localização) mas automatizando
                  todo o processo de criação e gestão.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">✅</span>
            A Solução: Gerador Automático de Escalas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-green-800 mb-2">Geração Automática</h3>
              <p className="text-green-700 text-sm">
                O sistema gera escalas completas em segundos, considerando preferências, disponibilidade e regras de negócio.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-green-800 mb-2">Regras Inteligentes</h3>
              <p className="text-green-700 text-sm">
                Respeita automaticamente preferências de horários, antiguidade, limites de horas trabalhadas e folgas obrigatórias.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold text-green-800 mb-2">Substituições Automáticas</h3>
              <p className="text-green-700 text-sm">
                Quando alguém falta, o sistema sugere automaticamente funcionários disponíveis e qualificados.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-green-800 mb-2">Histórico Completo</h3>
              <p className="text-green-700 text-sm">
                Todas as escalas ficam registadas no sistema, permitindo consultas rápidas e relatórios detalhados.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold text-green-800 mb-2">Múltiplos Empreendimentos</h3>
              <p className="text-green-700 text-sm">
                Gerencie escalas para diferentes locais (como Lake Towers) de forma centralizada e organizada.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-green-800 mb-2">Visualização Digital</h3>
              <p className="text-green-700 text-sm">
                Escalas disponíveis digitalmente, acessíveis a qualquer hora, com exportação para PDF quando necessário.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Funcionalidades Principais</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">1️⃣</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Geração Inteligente</h3>
                <p className="text-gray-600 text-sm">
                  Algoritmo que considera preferências dos funcionários, regras de negócio (antiguidade, especializações),
                  limites legais de horas trabalhadas e distribuição equitativa de turnos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">2️⃣</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Gestão de Disponibilidade</h3>
                <p className="text-gray-600 text-sm">
                  Funcionários podem indicar indisponibilidades (férias, licenças, compromissos), e o sistema
                  automaticamente evita esses períodos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">3️⃣</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Substituições Rápidas</h3>
                <p className="text-gray-600 text-sm">
                  Em caso de falta ou emergência, o sistema lista funcionários disponíveis, qualificados e em conformidade
                  com as regras de substituição.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">4️⃣</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Múltiplos Turnos e Locais</h3>
                <p className="text-gray-600 text-sm">
                  Suporta diferentes turnos (00-08h, 08-16h, 16-24h) e múltiplos empreendimentos, permitindo
                  escalas específicas por localização.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">5️⃣</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Visualização Intuitiva</h3>
                <p className="text-gray-600 text-sm">
                  Interface visual com cores diferentes por funcionário (como no processo atual), facilitando
                  a leitura e identificação rápida de atribuições.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">6️⃣</span>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Exportação e Compartilhamento</h3>
                <p className="text-gray-600 text-sm">
                  Exporte escalas para PDF, imprima ou compartilhe digitalmente com funcionários. Notificações
                  automáticas quando a escala é publicada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Economia de Tempo</h3>
              <p className="text-primary-50 text-sm mb-4">
                Redução de <strong>4-6 horas semanais</strong> na criação de escalas para <strong>apenas 15-30 minutos</strong>
                de revisão e ajustes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Redução de Erros</h3>
              <p className="text-primary-50 text-sm mb-4">
                Eliminação de conflitos de horários, sobreposições e faltas de cobertura através de validações automáticas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Maior Satisfação</h3>
              <p className="text-primary-50 text-sm mb-4">
                Funcionários mais satisfeitos com distribuição justa de turnos e respeito às suas preferências sempre que possível.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Escalabilidade</h3>
              <p className="text-primary-50 text-sm mb-4">
                Facilita o crescimento da empresa, permitindo gerir múltiplos empreendimentos e equipas maiores sem
                aumento proporcional de trabalho administrativo.
              </p>
            </div>
          </div>
        </div>

        {/* Estimated ROI */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Retorno do Investimento Estimado</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">4-6h</div>
              <p className="text-sm text-gray-700">Economia semanal</p>
              <p className="text-xs text-gray-500 mt-1">na criação de escalas</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">~200h</div>
              <p className="text-sm text-gray-700">Economia anual</p>
              <p className="text-xs text-gray-500 mt-1">(50 semanas × 4h)</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">€8k+</div>
              <p className="text-sm text-gray-700">Valor em tempo</p>
              <p className="text-xs text-gray-500 mt-1">(considerando €40/h)</p>
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">
            <strong>ROI:</strong> O investimento na funcionalidade paga-se através da economia de tempo e redução de erros
            no primeiro ano de utilização.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
