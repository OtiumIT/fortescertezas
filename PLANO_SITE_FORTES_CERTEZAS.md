# Plano do Site - Fortes Certezas Unipessoal

## Análise do Site Atual

### Informações da Empresa
- **Nome**: Fortes Certezas, Unipessoal Lda.
- **Localização**: Centro Comercial Alameda, Rua Álvaro Castelões, 571, Loja 22, 4450-042 Matosinhos
- **Contato**: 
  - Telefone: 96 531 00 89
  - Email: geral@fortescertezas.pt
- **Especialização**: Serviços de Portaria e Controlo de Acessos
- **Experiência**: Mais de 20 anos no ramo

### Serviços Oferecidos (Site Atual)
1. Serviços de Portarias
2. Controlo de Acessos
3. Recebimento de Encomendas
4. Recebimento de Correio Postal
5. Apoio à administração do condomínio/empresa
6. Zelar pela ordem e respeito no condomínio/empresa
7. Registo de ocorrências
8. Controlo de Pontos Chave

### Missão
Empresa especializada em serviços de portaria e controlo de acessos, devidamente legalizada e com profissionais competentes, oferecendo propostas equilibradas e ajustadas aos clientes.

### Pontos de Melhoria Identificados
- Design desatualizado
- Falta de responsividade moderna
- Ausência de área logada para gestão
- Sem sistema de agendamento/contato online
- Falta de galeria de imagens ou casos de sucesso
- SEO não otimizado
- Sem integração com redes sociais moderna

---

## Proposta do Novo Site

### Fase 1: Site Público + Área Administrativa (Implementação Inicial)

**Mudança de Escopo**: Incluir desde o início área logada para administradores com CMS básico para gestão de conteúdo público.

#### 1. Design e UX/UI

**Paleta de Cores**
- Cores profissionais que transmitam confiança e segurança
- Azul escuro/navy para confiança
- Branco para limpeza
- Dourado/amarelo suave para destaque (opcional)
- Cores de call-to-action contrastantes

**Tipografia**
- Fontes modernas e legíveis
- Hierarquia clara de informações
- Suporte a acentuação portuguesa

**Layout**
- Design limpo e profissional
- Hero section impactante na homepage
- Cards para serviços
- Seções bem definidas
- Footer completo com informações de contato

#### 2. Estrutura de Páginas

**Homepage (/)** 
- Hero section com mensagem principal e CTA
- Seção "Sobre Nós" resumida
- Grid de serviços principais (cards clicáveis)
- Seção de diferenciais/valores
- Testemunhos/depoimentos (se disponíveis)
- CTA final para contato
- Footer completo

**Sobre Nós (/sobre)**
- História da empresa (20+ anos de experiência)
- Missão, Visão e Valores
- Equipe (se aplicável)
- Certificações e legalizações
- Por que escolher a Fortes Certezas

**Serviços (/servicos)**
- Página principal listando todos os serviços
- Cards individuais para cada serviço:
  1. **Portarias** - Descrição detalhada, benefícios, casos de uso
  2. **Controlo de Acessos** - Sistemas, tecnologias, segurança
  3. **Recebimento de Encomendas** - Processo, organização, rastreamento
  4. **Recebimento de Correio Postal** - Organização, distribuição
  5. **Apoio à Administração** - Serviços administrativos oferecidos
  6. **Zeladoria e Ordem** - Manutenção da ordem, respeito
  7. **Registo de Ocorrências** - Sistema de registo, relatórios
  8. **Controlo de Pontos Chave** - Monitorização, segurança

**Contato (/contacto)**
- Formulário de contato (nome, email, telefone, mensagem)
- **Sistema de captação de contato** (armazenamento em JSON)
- Botão "Falar Agora no WhatsApp" (fixo/flutuante)
- Informações de contato destacadas
- Mapa de localização (Google Maps embed)
- Horário de atendimento
- Política de privacidade (link)

**Vagas de Emprego (/vagas)**
- Mural de vagas disponíveis
- Cards com detalhes de cada vaga:
  - Título da vaga
  - Descrição completa
  - Requisitos
  - Localização
  - Tipo de contrato
  - Salário (se aplicável)
  - Data de publicação
- Formulário de candidatura com upload de currículo
- Filtros de busca (opcional)

**Política de Privacidade (/privacidade)**
- Conformidade com LGPD
- Informações sobre tratamento de dados
- Direitos dos utilizadores
- Cookies (se aplicável)

#### 3. Componentes Principais

**Header/Navigation**
- Logo da empresa
- Menu de navegação (Home, Sobre, Serviços, Contacto)
- Botão CTA "Solicitar Orçamento"
- Menu mobile responsivo (hamburger)

**Footer**
- Logo e descrição breve
- Links rápidos (navegação)
- Informações de contato
- Redes sociais (se aplicável)
- Política de privacidade
- Copyright

**Cards de Serviços**
- Ícone ou imagem representativa
- Título do serviço
- Descrição breve
- Link para detalhes

**Formulário de Contato**
- Campos: Nome, Email, Telefone, Assunto, Mensagem
- Validação client-side
- Mensagem de sucesso/erro
- Checkbox de aceitação de política de privacidade
- **Armazenamento**: JSON no repositório (dados/contacts.json)

**Botão WhatsApp**
- Botão flutuante fixo "Falar Agora no WhatsApp"
- Link direto para WhatsApp Business
- Número: 96 531 00 89
- Mensagem pré-formatada opcional

**Mural de Vagas**
- Listagem de vagas ativas
- Card de vaga com preview
- Página de detalhes da vaga
- Formulário de candidatura:
  - Nome completo
  - Email
  - Telefone
  - Mensagem de apresentação
  - Upload de currículo (PDF)
- **Armazenamento**: JSON no repositório (dados/jobs.json e dados/applications.json)

**Seção Hero**
- Título impactante
- Subtítulo/descrição
- Imagem de fundo ou gradiente
- Botão CTA principal

#### 4. Funcionalidades Estáticas

- **SEO Otimizado**
  - Meta tags apropriadas
  - Structured data (Schema.org)
  - Sitemap.xml
  - robots.txt
  - URLs amigáveis

- **Performance**
  - Imagens otimizadas (WebP, lazy loading)
  - Código minificado
  - Lazy loading de componentes
  - Otimização de assets

- **Acessibilidade**
  - ARIA labels
  - Navegação por teclado
  - Contraste adequado
  - Textos alternativos em imagens

- **Responsividade**
  - Mobile-first approach
  - Breakpoints: mobile, tablet, desktop
  - Menu mobile funcional
  - Imagens responsivas

#### 5. Conteúdo a Incluir

**Textos**
- Copywriting profissional em português
- Foco em benefícios para o cliente
- Linguagem clara e direta
- Chamadas para ação claras

**Imagens**
- Logo da empresa (alta resolução)
- Imagens de serviços (stock photos ou próprias)
- Ícones para serviços
- Imagens de equipe (se disponíveis)

**Informações Legais**
- Política de privacidade completa
- Termos de uso (se necessário)
- Informações de empresa (NIF, etc.)

---

### Área Administrativa (Fase 1 - Implementação Inicial)

#### 1. Sistema de Autenticação

**Tipos de Usuários**
- **Administradores**: Gestão completa do site e sistema (único tipo inicial)

**Funcionalidades de Autenticação**
- Login/Logout
- Autenticação simples (usuário/senha armazenados em JSON ou variáveis de ambiente)
- Proteção de rotas administrativas
- Gestão de sessões (localStorage/sessionStorage)

#### 2. CMS - Gestão de Conteúdo Público

**Áreas Editáveis do Site:**

**Homepage (/admin/homepage)**
- Hero section: título, subtítulo, texto do botão, imagem de fundo
- Seção "Sobre Nós" resumida: título, descrição
- Seção de diferenciais: lista editável de diferenciais
- Testemunhos: adicionar/editar/remover depoimentos

**Página Sobre (/admin/sobre)**
- História da empresa: título, conteúdo (markdown ou rich text)
- Missão: texto editável
- Visão: texto editável
- Valores: lista editável
- Equipe: adicionar/editar membros (nome, cargo, foto, descrição)

**Página Serviços (/admin/servicos)**
- Lista de serviços: adicionar/editar/remover
- Para cada serviço:
  - Título
  - Descrição curta
  - Descrição completa
  - Ícone ou imagem
  - Ordem de exibição
  - Ativo/Inativo

**Página Contato (/admin/contacto)**
- Informações de contato: telefone, email, endereço
- Horário de atendimento
- Texto da página
- Link do WhatsApp

**Página Vagas (/admin/vagas)**
- Gestão de vagas: criar/editar/remover
- Campos por vaga:
  - Título
  - Descrição completa
  - Requisitos (lista)
  - Localização
  - Tipo de contrato
  - Salário (opcional)
  - Data de publicação
  - Data de expiração
  - Status (ativa/inativa)

**Configurações Gerais (/admin/configuracoes)**
- Logo da empresa (upload)
- Informações da empresa (NIF, morada completa)
- Redes sociais (links)
- SEO: meta description, keywords
- Google Maps embed code

**Armazenamento de Dados:**
- Estrutura JSON no repositório: `dados/`
  - `dados/site-content.json` - Conteúdo das páginas
  - `dados/services.json` - Lista de serviços
  - `dados/jobs.json` - Vagas de emprego
  - `dados/contacts.json` - Formulários de contato recebidos
  - `dados/applications.json` - Candidaturas recebidas
  - `dados/testimonials.json` - Depoimentos
  - `dados/team.json` - Membros da equipe

**Comunicação:**
- Frontend se comunica exclusivamente via API HTTP/HTTPS
- API gerencia leitura/escrita dos arquivos JSON
- Rotas públicas (GET) para leitura
- Rotas administrativas (POST/PUT/DELETE) protegidas com autenticação

#### 3. Gestão de Contatos e Candidaturas

**Contatos Recebidos (/admin/contatos)**
- Lista de todos os formulários de contato
- Visualização detalhada
- Status (novo/lido/respondido)
- Filtros e busca
- Exportação (opcional)

**Candidaturas (/admin/candidaturas)**
- Lista de candidaturas por vaga
- Visualização de currículo (download)
- Dados do candidato
- Status (nova/em análise/rejeitada/contratada)
- Filtros por vaga, status, data

#### 4. Dashboard Administrativo

**Dashboard (/admin)**
- Estatísticas gerais:
  - Total de contatos recebidos (últimos 30 dias)
  - Total de candidaturas (últimos 30 dias)
  - Vagas ativas
  - Últimos contatos
  - Últimas candidaturas
- Acesso rápido às seções principais
- Gráficos simples (opcional)

---

### Fase 2: Expansão (Implementação Futura)

#### 1. Gestão de Clientes (Futuro)

#### 2. Gestão de Clientes

**Cadastro de Clientes**
- Dados completos (nome, empresa, contacto, endereço)
- Histórico de contratos
- Documentos associados
- Notas e observações

**Área do Cliente**
- Dashboard com informações do contrato
- Histórico de serviços
- Documentos disponíveis
- Comunicação com a empresa
- Solicitação de serviços adicionais

#### 3. Gestão de Funcionários

**Cadastro de Funcionários**
- Dados pessoais e profissionais
- Documentação (certificados, licenças)
- Contratos e horários
- Competências e especializações

**Área do Funcionário**
- Visualização de escalas
- Registo de presenças
- Comunicação interna
- Documentos e formulários

#### 4. Gerador de Escalas de Trabalho

**Funcionalidades**
- Criação de escalas mensais/semanais
- Atribuição de funcionários a turnos
- Gestão de folgas e férias
- Visualização de escalas por funcionário
- Exportação de escalas (PDF, Excel)
- Notificações automáticas

**Recursos Avançados**
- Templates de escalas
- Regras de negócio (horários mínimos, folgas)
- Substituições e ajustes
- Histórico de escalas

#### 5. Gestão de Funcionários (Futuro)

#### 6. Integrações Futuras

- **Email**: Envio automático de emails (confirmações, notificações)
- **SMS**: Notificações por SMS (opcional)
- **Calendário**: Integração com calendários
- **Pagamentos**: Sistema de pagamentos online (futuro)

---

## Estrutura Técnica

### Tecnologias

**Frontend**
- React 18+
- Vite
- TypeScript
- TailwindCSS
- React Router (para navegação)
- React Context ou Zustand para estado
- React Hook Form para formulários
- Área administrativa integrada

**Armazenamento (Fase 1)**
- Arquivos JSON no repositório (`dados/`)
- Git para versionamento de conteúdo
- Sem necessidade de banco de dados inicialmente

**Backend (Fase 1 - Implementação Inicial)**
- Node.js
- Hono (framework)
- TypeScript
- Repositório JSON (leitura/escrita de arquivos)
- Autenticação JWT simples

**Banco de Dados (Fase 1)**
- Arquivos JSON no repositório
- Acesso gerenciado pela API

**Banco de Dados (Fase 2 - Futuro)**
- Migração para Supabase (PostgreSQL)
- Row-Level Security (RLS)

**Deploy**
- Cloudflare Pages (frontend)
- Cloudflare Workers ou similar (API - Fase 2)

### Estrutura de Pastas

```
fortes/
├── dados/                    # Arquivos JSON com conteúdo do site
│   ├── site-content.json     # Conteúdo das páginas públicas
│   ├── services.json         # Lista de serviços
│   ├── jobs.json             # Vagas de emprego
│   ├── contacts.json         # Formulários de contato
│   ├── applications.json     # Candidaturas
│   ├── testimonials.json     # Depoimentos
│   └── team.json             # Membros da equipe
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   ├── uploads/          # Uploads de imagens/currículos
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Componentes básicos (Button, Card, etc.)
│   │   │   ├── layout/       # Header, Footer, Layout
│   │   │   └── features/     # Componentes específicos
│   │   │       ├── ContactForm.tsx
│   │   │       ├── WhatsAppButton.tsx
│   │   │       ├── JobCard.tsx
│   │   │       └── ApplicationForm.tsx
│   │   ├── pages/
│   │   │   ├── public/       # Páginas públicas
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Services.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   ├── Jobs.tsx
│   │   │   │   └── JobDetail.tsx
│   │   │   └── admin/        # Páginas administrativas
│   │   │       ├── Login.tsx
│   │   │       ├── Dashboard.tsx
│   │   │       ├── HomepageEdit.tsx
│   │   │       ├── ServicesEdit.tsx
│   │   │       ├── JobsEdit.tsx
│   │   │       ├── ContactsList.tsx
│   │   │       └── ApplicationsList.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useSiteContent.ts
│   │   │   └── useJobs.ts
│   │   ├── lib/
│   │   │   ├── storage.ts     # Funções para ler/escrever JSON
│   │   │   ├── auth.ts        # Autenticação simples
│   │   │   └── utils.ts
│   │   ├── types/
│   │   │   ├── content.ts
│   │   │   ├── job.ts
│   │   │   └── contact.ts
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── .cursor/rules/
```

---

## Cronograma Sugerido

### Fase 1: Site Público + Área Administrativa (6-8 semanas)

**Semana 1-2: Setup e Design**
- Setup do projeto React + Vite
- Configuração de TailwindCSS
- Criação do design system
- Componentes base (Header, Footer, Layout)
- Estrutura de dados JSON
- Sistema de leitura/escrita de JSON

**Semana 3-4: Páginas Públicas**
- Homepage completa
- Página Sobre Nós
- Página de Serviços
- Página de Contato com formulário
- Botão WhatsApp flutuante
- Página de Vagas (listagem e detalhes)
- Formulário de candidatura

**Semana 5-6: Área Administrativa**
- Sistema de autenticação simples
- Dashboard administrativo
- CMS para Homepage
- CMS para Serviços
- CMS para Vagas
- Gestão de Contatos
- Gestão de Candidaturas

**Semana 7-8: Finalização**
- CMS para demais páginas (Sobre, Configurações)
- Política de privacidade
- Otimizações (SEO, performance, acessibilidade)
- Testes e ajustes
- Deploy no Cloudflare Pages

### Fase 2: Área Logada (8-12 semanas)

**Semanas 1-2: Setup Backend**
- Setup da API com Hono
- Configuração do Supabase
- Sistema de autenticação

**Semanas 3-4: Gestão de Clientes**
- CRUD de clientes
- Área do cliente
- Dashboard

**Semanas 5-6: Gestão de Funcionários**
- CRUD de funcionários
- Área do funcionário

**Semanas 7-8: Gerador de Escalas**
- Lógica de geração de escalas
- Interface de gestão
- Visualização e exportação

**Semanas 9-10: Gestão do Site**
- CMS básico
- Analytics

**Semanas 11-12: Testes e Deploy**
- Testes completos
- Ajustes finais
- Deploy da API

---

## Prioridades e MVP

### MVP Fase 1 (Mínimo Viável)
1. ✅ Homepage funcional e atrativa
2. ✅ Página de Serviços com descrições
3. ✅ Página de Contato com formulário e captação
4. ✅ Botão WhatsApp flutuante
5. ✅ Mural de vagas com candidaturas
6. ✅ Área administrativa básica (login)
7. ✅ CMS para conteúdo principal
8. ✅ Design responsivo
9. ✅ Política de privacidade

### Funcionalidades Essenciais
- Sistema de autenticação administrativa
- CMS para edição de conteúdo público
- Captação e armazenamento de contatos (JSON)
- Recebimento de candidaturas com currículo
- Gestão de vagas de emprego
- Botão WhatsApp integrado

### MVP Fase 2
1. Sistema de autenticação
2. Gestão básica de clientes
3. Gestão básica de funcionários
4. Gerador simples de escalas
5. Área logada funcional

---

## Considerações Especiais

### LGPD e Privacidade
- Política de privacidade completa e clara
- Consentimento explícito para coleta de dados
- Direito ao esquecimento
- Portabilidade de dados
- Transparência no uso de dados

### Acessibilidade
- WCAG 2.1 nível AA
- Suporte a leitores de tela
- Navegação por teclado
- Contraste adequado

### Performance
- Lighthouse score > 90
- Tempo de carregamento < 3s
- Otimização de imagens
- Code splitting

### SEO
- Meta tags otimizadas
- Structured data
- Sitemap
- URLs amigáveis
- Conteúdo relevante e atualizado

---

## Próximos Passos

1. **Aprovação do Plano**: Revisar e aprovar este plano com a Fortes Certezas
2. **Coleta de Conteúdo**: Obter textos, imagens e informações adicionais
3. **Design Mockups**: Criar mockups das páginas principais
4. **Setup do Projeto**: Iniciar desenvolvimento da Fase 1
5. **Desenvolvimento Iterativo**: Desenvolver e testar em sprints

---

## Notas Finais

Este plano foi criado com base na análise do site atual da Fortes Certezas e nas melhores práticas de desenvolvimento web moderno. O foco inicial é criar um site estático profissional e funcional, que será expandido na Fase 2 com funcionalidades de gestão e área logada.

O site será desenvolvido seguindo as regras definidas em `.cursor/rules`, garantindo qualidade, segurança e manutenibilidade do código.
