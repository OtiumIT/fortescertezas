-- Script completo de setup do Supabase para Fortes Certezas
-- Execute este SQL no SQL Editor do Supabase
-- Este script cria todas as tabelas e configura as políticas RLS

-- ============================================
-- 1. CRIAÇÃO DAS TABELAS
-- ============================================

-- Tabela para conteúdo do site (site-content.json)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para posts/blog
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'Fortes Certezas',
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  seo JSONB,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para serviços
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT NOT NULL,
  icon TEXT,
  image TEXT,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  features TEXT[] DEFAULT '{}',
  seo JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para vagas de emprego
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  contract_type TEXT NOT NULL,
  salary TEXT,
  salary_range TEXT,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para contatos
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  read BOOLEAN DEFAULT false,
  responded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para candidaturas
CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  job_id TEXT REFERENCES jobs(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  resume TEXT,
  resume_url TEXT,
  status TEXT DEFAULT 'new',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para equipe
CREATE TABLE IF NOT EXISTS team (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo TEXT,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para depoimentos
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_company TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. CRIAÇÃO DOS ÍNDICES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_active ON posts(active);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(active);
CREATE INDEX IF NOT EXISTS idx_jobs_published_at ON jobs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);

-- ============================================
-- 3. HABILITAÇÃO DO ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. POLÍTICAS DE LEITURA PÚBLICA
-- ============================================

-- Remove políticas existentes se houver
DROP POLICY IF EXISTS "Public read access" ON site_content;
DROP POLICY IF EXISTS "Public read active posts" ON posts;
DROP POLICY IF EXISTS "Public read active services" ON services;
DROP POLICY IF EXISTS "Public read active jobs" ON jobs;
DROP POLICY IF EXISTS "Public read active team" ON team;
DROP POLICY IF EXISTS "Public read active testimonials" ON testimonials;

-- Cria políticas de leitura
CREATE POLICY "Public read access" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read active posts" ON posts FOR SELECT USING (active = true);
CREATE POLICY "Public read active services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public read active jobs" ON jobs FOR SELECT USING (active = true);
CREATE POLICY "Public read active team" ON team FOR SELECT USING (active = true);
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (active = true);

-- ============================================
-- 5. POLÍTICAS DE ESCRITA PÚBLICA (CONTATOS E CANDIDATURAS)
-- ============================================

DROP POLICY IF EXISTS "Public insert contacts" ON contacts;
DROP POLICY IF EXISTS "Public insert applications" ON applications;

CREATE POLICY "Public insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert applications" ON applications FOR INSERT WITH CHECK (true);

-- ============================================
-- 6. POLÍTICAS ADMINISTRATIVAS (UPDATE/INSERT/DELETE)
-- ============================================
-- Estas políticas permitem operações administrativas
-- Se você usar SUPABASE_SERVICE_KEY, essas políticas não são necessárias
-- (SERVICE_KEY bypassa RLS automaticamente)

-- Políticas para site_content
DROP POLICY IF EXISTS "Allow update site_content" ON site_content;
DROP POLICY IF EXISTS "Allow insert site_content" ON site_content;

CREATE POLICY "Allow update site_content" 
ON site_content 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow insert site_content" 
ON site_content 
FOR INSERT 
WITH CHECK (true);

-- Políticas para posts
DROP POLICY IF EXISTS "Allow all posts operations" ON posts;
CREATE POLICY "Allow all posts operations" 
ON posts 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para services
DROP POLICY IF EXISTS "Allow all services operations" ON services;
CREATE POLICY "Allow all services operations" 
ON services 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para jobs
DROP POLICY IF EXISTS "Allow all jobs operations" ON jobs;
CREATE POLICY "Allow all jobs operations" 
ON jobs 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para contacts
DROP POLICY IF EXISTS "Allow update contacts" ON contacts;
DROP POLICY IF EXISTS "Allow delete contacts" ON contacts;

CREATE POLICY "Allow update contacts" 
ON contacts 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow delete contacts" 
ON contacts 
FOR DELETE 
USING (true);

-- Políticas para applications
DROP POLICY IF EXISTS "Allow update applications" ON applications;
DROP POLICY IF EXISTS "Allow delete applications" ON applications;

CREATE POLICY "Allow update applications" 
ON applications 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow delete applications" 
ON applications 
FOR DELETE 
USING (true);

-- Políticas para team
DROP POLICY IF EXISTS "Allow all team operations" ON team;
CREATE POLICY "Allow all team operations" 
ON team 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para testimonials
DROP POLICY IF EXISTS "Allow all testimonials operations" ON testimonials;
CREATE POLICY "Allow all testimonials operations" 
ON testimonials 
FOR ALL 
USING (true)
WITH CHECK (true);

-- ============================================
-- FIM DO SCRIPT
-- ============================================
