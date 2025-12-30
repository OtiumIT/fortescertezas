# Endpoints Detalhados da API

## Base URL
```
http://localhost:3007/api/v1
```

## Autenticação

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "senha123"
}

Response 200:
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "admin-001",
      "username": "admin"
    }
  }
}

Response 401:
{
  "error": "Credenciais inválidas",
  "code": "INVALID_CREDENTIALS"
}
```

### Verificar Sessão
```http
GET /api/v1/auth/me
Authorization: Bearer {token}

Response 200:
{
  "data": {
    "id": "admin-001",
    "username": "admin"
  }
}

Response 401:
{
  "error": "Token inválido ou expirado",
  "code": "INVALID_TOKEN"
}
```

### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}

Response 200:
{
  "data": {
    "message": "Logout realizado com sucesso"
  }
}
```

---

## Conteúdo Público

### Homepage
```http
GET /api/v1/content/homepage

Response 200:
{
  "data": {
    "hero": {
      "title": "FORTES CERTEZAS",
      "subtitle": "Supervisão | Portarias | Condomínios",
      "description": "...",
      "ctaText": "Solicitar Orçamento",
      "ctaLink": "/contacto",
      "backgroundImage": "/images/hero-bg.jpg"
    },
    "about": {
      "title": "Sobre Nós",
      "description": "..."
    },
    "highlights": [...]
  }
}
```

### Sobre
```http
GET /api/v1/content/about

Response 200:
{
  "data": {
    "history": {
      "title": "Nossa História",
      "content": "..."
    },
    "mission": "...",
    "vision": "...",
    "values": [...]
  }
}
```

### Contato (Informações)
```http
GET /api/v1/content/contact

Response 200:
{
  "data": {
    "title": "Contacte-nos",
    "description": "...",
    "phone": "96 531 00 89",
    "email": "geral@fortescertezas.pt",
    "address": {
      "street": "Rua Álvaro Castelões, 571, Loja 22",
      "city": "4450-042 Matosinhos",
      "location": "Centro Comercial Alameda"
    },
    "whatsapp": "965310089",
    "businessHours": "Segunda a Sexta: 9h - 18h"
  }
}
```

### SEO
```http
GET /api/v1/content/seo

Response 200:
{
  "data": {
    "metaDescription": "...",
    "metaKeywords": "..."
  }
}
```

---

## Serviços

### Listar Serviços
```http
GET /api/v1/services

Response 200:
{
  "data": [
    {
      "id": "portarias",
      "title": "Serviços de Portarias",
      "shortDescription": "...",
      "icon": "door",
      "image": "/images/services/portarias.jpg",
      "order": 1,
      "active": true
    },
    ...
  ],
  "meta": {
    "total": 8
  }
}
```

### Detalhes do Serviço
```http
GET /api/v1/services/:id

Response 200:
{
  "data": {
    "id": "portarias",
    "title": "Serviços de Portarias",
    "shortDescription": "...",
    "description": "...",
    "icon": "door",
    "image": "/images/services/portarias.jpg",
    "order": 1,
    "active": true,
    "features": [...]
  }
}

Response 404:
{
  "error": "Serviço não encontrado",
  "code": "SERVICE_NOT_FOUND"
}
```

---

## Vagas

### Listar Vagas Ativas
```http
GET /api/v1/jobs?status=active

Query Params:
- status: active | all (default: active)
- limit: number (default: 50)
- offset: number (default: 0)

Response 200:
{
  "data": [
    {
      "id": "job-001",
      "title": "Porteiro/Rececionista",
      "description": "...",
      "requirements": [...],
      "location": "Matosinhos",
      "contractType": "Tempo Inteiro",
      "salary": "A combinar",
      "publishedAt": "2024-01-15",
      "expiresAt": "2024-02-15",
      "active": true
    },
    ...
  ],
  "meta": {
    "total": 5,
    "limit": 50,
    "offset": 0
  }
}
```

### Detalhes da Vaga
```http
GET /api/v1/jobs/:id

Response 200:
{
  "data": {
    "id": "job-001",
    "title": "Porteiro/Rececionista",
    "description": "...",
    "requirements": [...],
    "location": "Matosinhos",
    "contractType": "Tempo Inteiro",
    "salary": "A combinar",
    "publishedAt": "2024-01-15",
    "expiresAt": "2024-02-15",
    "active": true,
    "applicationsCount": 3
  }
}
```

---

## Contatos (Público)

### Enviar Contato
```http
POST /api/v1/contacts
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "912345678",
  "subject": "Solicitação de Orçamento",
  "message": "Gostaria de solicitar um orçamento..."
}

Response 201:
{
  "data": {
    "id": "contact-001",
    "message": "Contato enviado com sucesso"
  }
}

Response 400:
{
  "error": "Dados inválidos",
  "code": "VALIDATION_ERROR",
  "details": {
    "email": "Email inválido",
    "phone": "Telefone obrigatório"
  }
}
```

---

## Candidaturas (Público)

### Enviar Candidatura
```http
POST /api/v1/applications
Content-Type: multipart/form-data

FormData:
- jobId: "job-001"
- name: "Maria Santos"
- email: "maria@example.com"
- phone: "912345679"
- message: "Tenho experiência..."
- resume: File (PDF, max 5MB)

Response 201:
{
  "data": {
    "id": "app-001",
    "message": "Candidatura enviada com sucesso"
  }
}

Response 400:
{
  "error": "Dados inválidos",
  "code": "VALIDATION_ERROR",
  "details": {
    "resume": "Arquivo deve ser PDF e ter no máximo 5MB"
  }
}
```

---

## Admin - Conteúdo

### Obter Conteúdo
```http
GET /api/v1/admin/content/:section
Authorization: Bearer {token}

Sections: homepage | about | contact | seo

Response 200:
{
  "data": { ... }
}
```

### Atualizar Conteúdo
```http
PUT /api/v1/admin/content/:section
Authorization: Bearer {token}
Content-Type: application/json

{
  "hero": {
    "title": "Novo Título",
    ...
  }
}

Response 200:
{
  "data": {
    "message": "Conteúdo atualizado com sucesso"
  }
}
```

---

## Admin - Serviços

### Listar Todos
```http
GET /api/v1/admin/services
Authorization: Bearer {token}

Response 200:
{
  "data": [...],
  "meta": { "total": 8 }
}
```

### Criar Serviço
```http
POST /api/v1/admin/services
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Novo Serviço",
  "shortDescription": "...",
  "description": "...",
  "icon": "icon-name",
  "order": 9,
  "active": true,
  "features": [...]
}

Response 201:
{
  "data": {
    "id": "novo-servico",
    "message": "Serviço criado com sucesso"
  }
}
```

### Atualizar Serviço
```http
PUT /api/v1/admin/services/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Título Atualizado",
  ...
}

Response 200:
{
  "data": {
    "message": "Serviço atualizado com sucesso"
  }
}
```

### Deletar Serviço
```http
DELETE /api/v1/admin/services/:id
Authorization: Bearer {token}

Response 200:
{
  "data": {
    "message": "Serviço deletado com sucesso"
  }
}
```

---

## Admin - Vagas

### Listar Todas
```http
GET /api/v1/admin/jobs
Authorization: Bearer {token}

Response 200:
{
  "data": [...],
  "meta": { "total": 10 }
}
```

### Criar Vaga
```http
POST /api/v1/admin/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Nova Vaga",
  "description": "...",
  "requirements": [...],
  "location": "Matosinhos",
  "contractType": "Tempo Inteiro",
  "salary": "A combinar",
  "publishedAt": "2024-01-20",
  "expiresAt": "2024-02-20",
  "active": true
}

Response 201:
{
  "data": {
    "id": "job-002",
    "message": "Vaga criada com sucesso"
  }
}
```

### Atualizar Vaga
```http
PUT /api/v1/admin/jobs/:id
Authorization: Bearer {token}
Content-Type: application/json

Response 200:
{
  "data": {
    "message": "Vaga atualizada com sucesso"
  }
}
```

### Deletar Vaga
```http
DELETE /api/v1/admin/jobs/:id
Authorization: Bearer {token}

Response 200:
{
  "data": {
    "message": "Vaga deletada com sucesso"
  }
}
```

---

## Admin - Contatos

### Listar Contatos
```http
GET /api/v1/admin/contacts?status=new&limit=20&offset=0
Authorization: Bearer {token}

Query Params:
- status: new | read | responded | all
- limit: number
- offset: number

Response 200:
{
  "data": [...],
  "meta": {
    "total": 50,
    "limit": 20,
    "offset": 0
  }
}
```

### Detalhes do Contato
```http
GET /api/v1/admin/contacts/:id
Authorization: Bearer {token}

Response 200:
{
  "data": {
    "id": "contact-001",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "912345678",
    "subject": "Solicitação de Orçamento",
    "message": "...",
    "createdAt": "2024-01-15T10:30:00Z",
    "status": "new",
    "read": false,
    "responded": false
  }
}
```

### Atualizar Status
```http
PATCH /api/v1/admin/contacts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "read",
  "read": true
}

Response 200:
{
  "data": {
    "message": "Status atualizado com sucesso"
  }
}
```

---

## Admin - Candidaturas

### Listar Candidaturas
```http
GET /api/v1/admin/applications?jobId=job-001&status=new
Authorization: Bearer {token}

Response 200:
{
  "data": [...],
  "meta": { "total": 15 }
}
```

### Detalhes da Candidatura
```http
GET /api/v1/admin/applications/:id
Authorization: Bearer {token}

Response 200:
{
  "data": {
    "id": "app-001",
    "jobId": "job-001",
    "name": "Maria Santos",
    "email": "maria@example.com",
    "phone": "912345679",
    "message": "...",
    "resume": "/uploads/resumes/app-001-maria-santos.pdf",
    "createdAt": "2024-01-16T14:20:00Z",
    "status": "new",
    "read": false
  }
}
```

### Download Currículo
```http
GET /api/v1/admin/applications/:id/resume
Authorization: Bearer {token}

Response 200:
Content-Type: application/pdf
[Binary PDF data]
```

### Atualizar Status
```http
PATCH /api/v1/admin/applications/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "em_analise",
  "read": true
}

Response 200:
{
  "data": {
    "message": "Status atualizado com sucesso"
  }
}
```

---

## Admin - Uploads

### Upload de Arquivo
```http
POST /api/v1/admin/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
- file: File (imagem ou PDF)
- type: image | resume (opcional)

Response 200:
{
  "data": {
    "url": "/uploads/images/2024-01-20-abc123.jpg",
    "filename": "2024-01-20-abc123.jpg",
    "size": 123456,
    "type": "image/jpeg"
  }
}

Response 400:
{
  "error": "Tipo de arquivo não permitido",
  "code": "INVALID_FILE_TYPE"
}
```

---

## Códigos de Erro

- `INVALID_CREDENTIALS`: Credenciais inválidas
- `INVALID_TOKEN`: Token inválido ou expirado
- `VALIDATION_ERROR`: Erro de validação de dados
- `NOT_FOUND`: Recurso não encontrado
- `UNAUTHORIZED`: Não autenticado
- `FORBIDDEN`: Sem permissão
- `INVALID_FILE_TYPE`: Tipo de arquivo inválido
- `FILE_TOO_LARGE`: Arquivo muito grande
- `INTERNAL_ERROR`: Erro interno do servidor
