# Áreas Editáveis do Site - CMS

Este documento detalha todas as áreas do site que podem ser editadas através da área administrativa.

## Mapa de Áreas Editáveis

### 1. Homepage (`/admin/homepage`)

#### Hero Section
- **Título Principal** (texto)
- **Subtítulo** (texto)
- **Descrição** (texto longo)
- **Texto do Botão CTA** (texto)
- **Link do Botão CTA** (URL)
- **Imagem de Fundo** (upload de imagem)

#### Seção "Sobre Nós" (Preview)
- **Título** (texto)
- **Descrição** (texto longo, rich text)
- **Link para página completa** (automático)

#### Diferenciais/Highlights
- Lista editável de diferenciais
- Para cada diferencial:
  - **Título** (texto)
  - **Descrição** (texto)
  - **Ícone** (seleção de ícone ou upload)
  - **Ordem** (número)

#### Testemunhos/Depoimentos
- Lista de depoimentos exibidos na homepage
- Gerenciar através de `/admin/testimonials`
- Selecionar quais aparecem na homepage (checkbox)

---

### 2. Página Sobre (`/admin/sobre`)

#### História da Empresa
- **Título** (texto)
- **Conteúdo** (rich text, markdown ou HTML)

#### Missão
- **Texto** (texto longo)

#### Visão
- **Texto** (texto longo)

#### Valores
- Lista editável de valores
- Para cada valor:
  - **Nome** (texto)
  - **Descrição** (texto)
  - **Ícone** (opcional)

#### Equipe
- Lista de membros da equipe
- Para cada membro:
  - **Nome** (texto)
  - **Cargo** (texto)
  - **Foto** (upload)
  - **Descrição** (texto)
  - **Ordem de exibição** (número)
  - **Ativo/Inativo** (checkbox)

---

### 3. Página Serviços (`/admin/servicos`)

#### Lista de Serviços
- CRUD completo de serviços
- Para cada serviço:
  - **ID** (automático, slug)
  - **Título** (texto)
  - **Descrição Curta** (texto, para cards)
  - **Descrição Completa** (rich text, para página de detalhes)
  - **Ícone** (seleção ou upload)
  - **Imagem** (upload, opcional)
  - **Ordem de Exibição** (número)
  - **Ativo/Inativo** (checkbox)
  - **Características/Features** (lista editável)

#### Página Individual de Serviço
- Conteúdo gerado automaticamente a partir dos dados do serviço
- Possibilidade de adicionar conteúdo extra por serviço

---

### 4. Página Contato (`/admin/contacto`)

#### Informações de Contato
- **Telefone** (texto)
- **Email** (texto, validação)
- **WhatsApp** (número, apenas dígitos)
- **Endereço Completo** (texto)
- **Cidade/Código Postal** (texto)
- **Localização** (texto adicional, ex: "Centro Comercial Alameda")

#### Horário de Atendimento
- **Texto** (texto livre, ex: "Segunda a Sexta: 9h - 18h")

#### Texto da Página
- **Título** (texto)
- **Descrição** (texto longo)

#### Google Maps
- **Embed Code** (código iframe do Google Maps)
- Ou campos separados: **Latitude**, **Longitude**

#### Formulário de Contato
- Configurações do formulário:
  - **Mensagem de Sucesso** (texto)
  - **Mensagem de Erro** (texto)
  - **Campos obrigatórios** (checkboxes)

---

### 5. Página Vagas (`/admin/vagas`)

#### Gestão de Vagas
- CRUD completo de vagas
- Para cada vaga:
  - **ID** (automático)
  - **Título** (texto)
  - **Descrição Completa** (rich text)
  - **Requisitos** (lista editável de itens)
  - **Localização** (texto)
  - **Tipo de Contrato** (dropdown: Tempo Inteiro, Part-time, Contrato, etc.)
  - **Salário** (texto, opcional, ex: "A combinar", "1000-1500€")
  - **Data de Publicação** (date picker)
  - **Data de Expiração** (date picker, opcional)
  - **Status** (dropdown: Ativa, Inativa, Expirada)
  - **Número de Candidaturas** (automático, read-only)

#### Configurações da Página
- **Título da Página** (texto)
- **Descrição** (texto)
- **Mensagem quando não há vagas** (texto)

---

### 6. Configurações Gerais (`/admin/configuracoes`)

#### Informações da Empresa
- **Nome Completo** (texto)
- **Nome Comercial** (texto)
- **NIF** (texto)
- **Morada Completa** (texto)
- **Telefone** (texto)
- **Email** (texto)
- **Website** (URL)

#### Logo e Branding
- **Logo Principal** (upload)
- **Favicon** (upload)
- **Cores do Site** (color pickers, opcional)

#### Redes Sociais
- **Facebook** (URL, opcional)
- **LinkedIn** (URL, opcional)
- **Instagram** (URL, opcional)
- **Outras** (campos adicionais conforme necessário)

#### SEO
- **Meta Description** (texto, max 160 caracteres)
- **Meta Keywords** (texto, separado por vírgulas)
- **Google Analytics ID** (texto, opcional)
- **Google Tag Manager ID** (texto, opcional)

#### Outros
- **Google Maps API Key** (texto, se necessário)
- **Configurações de Email** (para envio de notificações, futuro)

---

## Sistema de Captação de Contato

### Formulário de Contato Público

**Localização**: Página `/contacto`

**Campos**:
- Nome (obrigatório, texto)
- Email (obrigatório, validação de email)
- Telefone (obrigatório, texto)
- Assunto (dropdown ou texto livre)
- Mensagem (obrigatório, textarea)
- Checkbox de aceitação de política de privacidade (obrigatório)

**Funcionalidades**:
- Validação client-side antes de enviar
- Mensagem de sucesso após envio
- Mensagem de erro se houver problema
- Armazenamento em `dados/contacts.json`
- Cada contato recebe ID único e timestamp

**Estrutura de Dados**:
```json
{
  "id": "contact-001",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "912345678",
  "subject": "Solicitação de Orçamento",
  "message": "Mensagem do usuário...",
  "createdAt": "2024-01-15T10:30:00Z",
  "status": "new",
  "read": false,
  "responded": false
}
```

### Gestão de Contatos (Admin)

**Localização**: `/admin/contatos`

**Funcionalidades**:
- Lista de todos os contatos recebidos
- Ordenação por data (mais recentes primeiro)
- Filtros:
  - Por status (novo, lido, respondido)
  - Por assunto
  - Por data (últimos 7 dias, 30 dias, todos)
- Busca por nome, email ou assunto
- Visualização detalhada de cada contato
- Marcar como lido/não lido
- Marcar como respondido
- Exportar lista (CSV, opcional)
- Excluir contato (com confirmação)

**Status dos Contatos**:
- `new`: Novo, não lido
- `read`: Lido, mas não respondido
- `responded`: Respondido
- `archived`: Arquivado (opcional)

---

## Botão WhatsApp

### Configuração

**Localização**: Configurações Gerais (`/admin/configuracoes`)

**Campos**:
- **Número do WhatsApp** (texto, apenas dígitos)
- **Mensagem Pré-formatada** (texto, opcional)
- **Texto do Botão** (texto, padrão: "Falar Agora no WhatsApp")
- **Posição** (dropdown: inferior direito, inferior esquerdo, superior direito, superior esquerdo)
- **Ativo/Inativo** (checkbox)

### Implementação

**Componente**: `WhatsAppButton.tsx`

**Comportamento**:
- Botão flutuante fixo na tela
- Visível em todas as páginas públicas
- Link direto para WhatsApp Web/App
- URL formatada: `https://wa.me/351965310089?text=Mensagem`
- Mensagem pré-formatada opcional (ex: "Olá, gostaria de saber mais sobre os serviços da Fortes Certezas")

**Design**:
- Ícone do WhatsApp
- Cores do WhatsApp (verde)
- Animação suave ao hover
- Responsivo (tamanho adequado para mobile)

---

## Mural de Vagas

### Página Pública de Vagas

**Localização**: `/vagas`

**Funcionalidades**:
- Lista de vagas ativas
- Cards com preview de cada vaga:
  - Título
  - Localização
  - Tipo de contrato
  - Data de publicação
  - Link para detalhes
- Filtros (opcional):
  - Por localização
  - Por tipo de contrato
  - Por data
- Busca por palavras-chave
- Paginação (se muitas vagas)

### Página de Detalhes da Vaga

**Localização**: `/vagas/:id`

**Conteúdo**:
- Título completo
- Descrição completa formatada
- Requisitos (lista)
- Localização
- Tipo de contrato
- Salário (se disponível)
- Data de publicação
- Botão "Candidatar-se"

### Formulário de Candidatura

**Localização**: Modal ou página `/vagas/:id/candidatar`

**Campos**:
- Nome completo (obrigatório)
- Email (obrigatório, validação)
- Telefone (obrigatório)
- Mensagem de apresentação (textarea, opcional)
- Upload de currículo (obrigatório, PDF, max 5MB)
- Checkbox de aceitação de política de privacidade (obrigatório)

**Validações**:
- Email válido
- Telefone válido
- Arquivo PDF apenas
- Tamanho máximo do arquivo
- Campos obrigatórios

**Armazenamento**:
- Dados em `dados/applications.json`
- Currículo salvo em `public/uploads/resumes/`
- Nome do arquivo: `app-{id}-{nome-sanitizado}.pdf`

**Estrutura de Dados**:
```json
{
  "id": "app-001",
  "jobId": "job-001",
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "912345679",
  "message": "Tenho experiência...",
  "resume": "/uploads/resumes/app-001-maria-santos.pdf",
  "createdAt": "2024-01-16T14:20:00Z",
  "status": "new",
  "read": false
}
```

### Gestão de Candidaturas (Admin)

**Localização**: `/admin/candidaturas`

**Funcionalidades**:
- Lista de todas as candidaturas
- Filtros:
  - Por vaga
  - Por status (nova, em análise, rejeitada, contratada)
  - Por data
- Busca por nome, email
- Visualização detalhada:
  - Dados do candidato
  - Mensagem de apresentação
  - Download do currículo
  - Vaga relacionada
- Marcar status:
  - Nova
  - Em análise
  - Rejeitada
  - Contratada
- Download de currículo
- Excluir candidatura (com confirmação)
- Exportar lista (CSV, opcional)

**Estatísticas**:
- Total de candidaturas por vaga
- Candidaturas por status
- Gráfico de candidaturas ao longo do tempo (opcional)

---

## Fluxo de Dados

### Leitura (Público)
1. Frontend faz fetch dos JSONs em `dados/`
2. Dados são carregados no build (Vite) ou em runtime
3. Componentes renderizam conteúdo dinamicamente

### Escrita (Admin)
1. Admin faz login
2. Acessa área de edição
3. Faz alterações via formulários
4. Validação client-side
5. Salva em JSON via função helper
6. Atualiza interface imediatamente
7. (Futuro) Commit automático via Git ou API

### Uploads
1. Admin faz upload de imagem/arquivo
2. Arquivo salvo em `public/uploads/`
3. Caminho relativo salvo no JSON
4. Referência atualizada na interface

---

## Segurança e Validação

### Validações no Frontend
- Campos obrigatórios
- Formato de email
- Formato de telefone
- Tamanho de arquivos
- Tipos de arquivo permitidos
- Sanitização de inputs

### Validações no Admin
- Autenticação obrigatória
- Proteção de rotas
- Validação de dados antes de salvar
- Backup antes de alterações críticas
- Log de alterações (futuro)

### Armazenamento Seguro
- Dados sensíveis não expostos publicamente
- Uploads validados
- Nomes de arquivo sanitizados
- Limite de tamanho de arquivos

---

## Próximos Passos

1. Implementar sistema de autenticação simples
2. Criar interface administrativa básica
3. Implementar leitura/escrita de JSONs
4. Criar formulários de edição para cada área
5. Implementar sistema de uploads
6. Adicionar validações e segurança
7. Testar fluxo completo
