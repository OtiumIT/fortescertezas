# Estrutura de Dados - Fortes Certezas

Este documento descreve a estrutura dos arquivos JSON que armazenam o conteúdo do site.

## Arquivos de Dados

### 1. `site-content.json`
Conteúdo geral das páginas públicas.

```json
{
  "homepage": {
    "hero": {
      "title": "FORTES CERTEZAS",
      "subtitle": "Supervisão | Portarias | Condomínios",
      "description": "Mais de 20 anos de experiência em serviços de portaria e controlo de acessos",
      "ctaText": "Solicitar Orçamento",
      "ctaLink": "/contacto",
      "backgroundImage": "/images/hero-bg.jpg"
    },
    "about": {
      "title": "Sobre Nós",
      "description": "A Fortes Certezas, Unip. nasceu com o objetivo de criar uma empresa especializada em serviços de portaria e controlo de acessos..."
    },
    "highlights": [
      {
        "title": "20+ Anos de Experiência",
        "description": "Profissionais competentes e experientes",
        "icon": "experience"
      },
      {
        "title": "Legalizada",
        "description": "Empresa devidamente legalizada",
        "icon": "legal"
      },
      {
        "title": "Propostas Equilibradas",
        "description": "Preços ajustados aos seus clientes",
        "icon": "pricing"
      }
    ]
  },
  "about": {
    "history": {
      "title": "Nossa História",
      "content": "A Fortes Certezas, Unipessoal nasceu com o objetivo de criar uma empresa especializada em serviços de portaria e controlo de acessos..."
    },
    "mission": "Criar uma empresa especializada em serviços de portaria e controlo de acessos, devidamente legalizada e com profissionais competentes.",
    "vision": "Destacar-se na área, oferecendo propostas equilibradas e ajustadas aos seus clientes.",
    "values": [
      "Profissionalismo",
      "Compromisso",
      "Confiabilidade",
      "Experiência"
    ]
  },
  "contact": {
    "title": "Contacte-nos",
    "description": "Utilize o formulário abaixo indicado para entrar em contacto connosco.",
    "phone": "96 531 00 89",
    "email": "geral@fortescertezas.pt",
    "address": {
      "street": "Rua Álvaro Castelões, 571, Loja 22",
      "city": "4450-042 Matosinhos",
      "location": "Centro Comercial Alameda"
    },
    "whatsapp": "965310089",
    "businessHours": "Segunda a Sexta: 9h - 18h"
  },
  "seo": {
    "metaDescription": "Fortes Certezas - Serviços de Portaria e Controlo de Acessos em Matosinhos. Mais de 20 anos de experiência.",
    "metaKeywords": "portaria, controlo de acessos, segurança, Matosinhos, Porto"
  }
}
```

### 2. `services.json`
Lista de serviços oferecidos.

```json
{
  "services": [
    {
      "id": "portarias",
      "title": "Serviços de Portarias",
      "shortDescription": "Profissionais qualificados para serviços de portaria",
      "description": "Descrição completa do serviço de portarias...",
      "icon": "door",
      "image": "/images/services/portarias.jpg",
      "order": 1,
      "active": true,
      "features": [
        "Atendimento profissional",
        "Controlo de acessos",
        "Recebimento de encomendas"
      ]
    },
    {
      "id": "controlo-acessos",
      "title": "Controlo de Acessos",
      "shortDescription": "Sistemas avançados de controlo de acessos",
      "description": "Descrição completa...",
      "icon": "security",
      "image": "/images/services/controlo-acessos.jpg",
      "order": 2,
      "active": true,
      "features": []
    }
  ]
}
```

### 3. `jobs.json`
Vagas de emprego disponíveis.

```json
{
  "jobs": [
    {
      "id": "job-001",
      "title": "Porteiro/Rececionista",
      "description": "Procuramos profissional para serviço de portaria em condomínio residencial...",
      "requirements": [
        "Experiência em portaria",
        "Boa apresentação",
        "Disponibilidade para turnos"
      ],
      "location": "Matosinhos",
      "contractType": "Tempo Inteiro",
      "salary": "A combinar",
      "publishedAt": "2024-01-15",
      "expiresAt": "2024-02-15",
      "active": true,
      "applicationsCount": 0
    }
  ]
}
```

### 4. `contacts.json`
Formulários de contato recebidos.

```json
{
  "contacts": [
    {
      "id": "contact-001",
      "name": "João Silva",
      "email": "joao@example.com",
      "phone": "912345678",
      "subject": "Solicitação de Orçamento",
      "message": "Gostaria de solicitar um orçamento para serviços de portaria...",
      "createdAt": "2024-01-15T10:30:00Z",
      "status": "new",
      "read": false,
      "responded": false
    }
  ]
}
```

### 5. `applications.json`
Candidaturas recebidas.

```json
{
  "applications": [
    {
      "id": "app-001",
      "jobId": "job-001",
      "name": "Maria Santos",
      "email": "maria@example.com",
      "phone": "912345679",
      "message": "Tenho experiência em portaria e gostaria de me candidatar...",
      "resume": "/uploads/resumes/app-001-maria-santos.pdf",
      "createdAt": "2024-01-16T14:20:00Z",
      "status": "new",
      "read": false
    }
  ]
}
```

### 6. `testimonials.json`
Depoimentos de clientes.

```json
{
  "testimonials": [
    {
      "id": "test-001",
      "name": "João Silva",
      "company": "Condomínio Residencial XYZ",
      "role": "Administrador",
      "text": "Excelente serviço prestado pela Fortes Certezas...",
      "rating": 5,
      "active": true,
      "createdAt": "2024-01-10"
    }
  ]
}
```

### 7. `team.json`
Membros da equipe.

```json
{
  "team": [
    {
      "id": "team-001",
      "name": "Nome do Membro",
      "role": "Diretor",
      "photo": "/images/team/member-001.jpg",
      "description": "Descrição do membro da equipe...",
      "active": true,
      "order": 1
    }
  ]
}
```

## Notas Importantes

1. **Versionamento**: Todos os arquivos JSON serão versionados no Git
2. **Backup**: Fazer backup regular dos dados
3. **Validação**: Validar estrutura JSON antes de salvar
4. **Segurança**: Não expor dados sensíveis nos JSONs públicos
5. **Migração Futura**: Estrutura preparada para migração para Supabase na Fase 2

## Fluxo de Dados

### Leitura (Público)
- Frontend lê JSONs diretamente via fetch/import
- Dados são carregados no build ou em runtime

### Escrita (Admin)
- Admin faz alterações via interface
- Alterações são salvas nos JSONs
- Commit automático ou manual via Git

### Uploads
- Imagens e currículos salvos em `public/uploads/`
- Referências nos JSONs apontam para caminhos relativos
