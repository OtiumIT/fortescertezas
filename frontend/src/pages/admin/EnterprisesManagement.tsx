import { AdminLayout } from '@/components/admin/AdminLayout';

export function EnterprisesManagement() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">🏢</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Cadastro de Empreendimentos</h1>
              <p className="text-gray-600 mt-1">Gestão completa de todos os locais onde a empresa presta serviços</p>
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
                Esta funcionalidade permitirá gerir todos os empreendimentos onde a Fortes Certezas presta serviços,
                centralizando informações de localização, contactos, serviços oferecidos e equipas alocadas.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">💡 Valor para a Empresa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Visão Centralizada</h3>
              <p className="text-primary-50 text-sm mb-4">
                Todos os empreendimentos num único sistema, facilitando a gestão de múltiplas localizações e clientes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Gestão de Equipas</h3>
              <p className="text-primary-50 text-sm mb-4">
                Associe funcionários a empreendimentos específicos e gere escalas por localização.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Serviços Personalizados</h3>
              <p className="text-primary-50 text-sm mb-4">
                Configure serviços específicos por empreendimento, permitindo ofertas diferenciadas por local.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Análise por Local</h3>
              <p className="text-primary-50 text-sm mb-4">
                Relatórios e análises específicas por empreendimento para otimização de recursos e serviços.
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
                <span className="text-2xl">📍</span>
                <h3 className="font-semibold text-gray-800">Informações de Localização</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Nome do empreendimento (ex: Lake Towers)</li>
                <li>• Morada completa</li>
                <li>• Coordenadas GPS (opcional)</li>
                <li>• Instruções de acesso e informações relevantes</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">👥</span>
                <h3 className="font-semibold text-gray-800">Associação com Clientes</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Cliente proprietário do empreendimento</li>
                <li>• Contactos específicos do local</li>
                <li>• Responsáveis e gestores</li>
                <li>• Histórico de relacionamento</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛠️</span>
                <h3 className="font-semibold text-gray-800">Serviços Oferecidos</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Lista de serviços prestados no local</li>
                <li>• Horários de funcionamento específicos</li>
                <li>• Configurações personalizadas por serviço</li>
                <li>• Requisitos e especificidades do local</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">👷</span>
                <h3 className="font-semibold text-gray-800">Equipa Alocada</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Funcionários atribuídos ao empreendimento</li>
                <li>• Funções e responsabilidades</li>
                <li>• Escalas específicas por local</li>
                <li>• Histórico de alocações</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚨</span>
                <h3 className="font-semibold text-gray-800">Ocorrências do Local</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Histórico de ocorrências específicas</li>
                <li>• Estatísticas por empreendimento</li>
                <li>• Tempo médio de resolução</li>
                <li>• Padrões e tendências</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-gray-800">Dashboard do Empreendimento</h3>
              </div>
              <ul className="text-gray-600 text-sm space-y-1 ml-10">
                <li>• Visão geral rápida de cada local</li>
                <li>• KPIs específicos por empreendimento</li>
                <li>• Status atual e alertas</li>
                <li>• Relatórios personalizados</li>
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
                <h3 className="font-semibold text-green-800 mb-1">Organização e Eficiência</h3>
                <p className="text-green-700 text-sm">
                  Informação organizada por localização facilita a gestão de múltiplos empreendimentos de forma eficiente.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Personalização de Serviços</h3>
                <p className="text-blue-700 text-sm">
                  Configure serviços específicos por empreendimento, adaptando a oferta às necessidades de cada local.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-2xl">📈</span>
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">Análise e Otimização</h3>
                <p className="text-purple-700 text-sm">
                  Identifique quais empreendimentos requerem mais recursos, têm melhor performance ou precisam de atenção.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-2xl">🗺️</span>
              <div>
                <h3 className="font-semibold text-orange-800 mb-1">Gestão Geográfica</h3>
                <p className="text-orange-700 text-sm">
                  Visualize a distribuição geográfica dos empreendimentos para otimização logística e alocação de recursos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Case Example */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💼 Exemplo de Utilização</h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 mb-4">
              <strong>Cenário:</strong> A empresa presta serviços em múltiplos empreendimentos, incluindo "Lake Towers".
              Cada local tem necessidades específicas, equipas diferentes e serviços personalizados.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Registar "Lake Towers" como empreendimento com morada, contactos e informações de acesso.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Associar ao cliente proprietário e configurar serviços específicos (portaria 24/7, controlo de acessos).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Alocar funcionários específicos e gerar escalas apenas para este empreendimento.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary-500 font-bold">•</span>
                <span>Registar e acompanhar ocorrências específicas deste local, mantendo histórico completo.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
