import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const createContactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido').max(20, 'Telefone muito longo'),
  subject: z.string().min(1, 'Assunto é obrigatório').max(200, 'Assunto muito longo'),
  message: z.string().min(1, 'Mensagem é obrigatória').max(2000, 'Mensagem muito longa'),
});

export const createApplicationSchema = z.object({
  jobId: z.string().min(1, 'ID da vaga é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'Telefone inválido').max(20, 'Telefone muito longo'),
  message: z.string().max(1000, 'Mensagem muito longa').optional(),
});

export const createJobSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  requirements: z.array(z.string()).min(1, 'Pelo menos um requisito é necessário'),
  location: z.string().min(1, 'Localização é obrigatória'),
  contractType: z.string().min(1, 'Tipo de contrato é obrigatório'),
  salary: z.string().optional(),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (formato: YYYY-MM-DD)'),
  expiresAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (formato: YYYY-MM-DD)').optional(),
  active: z.boolean(),
});

export const updateJobSchema = createJobSchema.partial();

export const createServiceSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  shortDescription: z.string().min(1, 'Descrição curta é obrigatória').max(500, 'Descrição muito longa'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  icon: z.string().min(1, 'Ícone é obrigatório'),
  image: z.string().optional(),
  order: z.number().int().min(0),
  active: z.boolean(),
  features: z.array(z.string()),
  seo: z.object({
    title: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
  }).optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const updateContactStatusSchema = z.object({
  status: z.enum(['new', 'read', 'responded']).optional(),
  read: z.boolean().optional(),
  responded: z.boolean().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['new', 'em_analise', 'rejeitada', 'contratada']).optional(),
  read: z.boolean().optional(),
});

export const createPostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug inválido (apenas letras minúsculas, números e hífens)').optional(),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(500, 'Resumo muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  author: z.string().max(100, 'Nome do autor muito longo').optional(),
  featuredImage: z.string().optional(),
  seo: z.object({
    metaDescription: z.string().max(500, 'Meta descrição muito longa'),
    metaKeywords: z.string().max(500, 'Meta palavras-chave muito longas'),
  }).optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const updatePostSchema = createPostSchema.partial();
