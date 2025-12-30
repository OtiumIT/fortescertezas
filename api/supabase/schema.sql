-- Schema do Supabase para Fortes Certezas
-- Execute este SQL no SQL Editor do Supabase

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

-- Índice para order
CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");

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

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_active ON posts(active);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");

CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(active);
CREATE INDEX IF NOT EXISTS idx_jobs_published_at ON jobs(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(active);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);

-- Row Level Security (RLS) - políticas básicas
-- Permite leitura pública para todas as tabelas
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública (apenas dados ativos)
CREATE POLICY "Public read access" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read active posts" ON posts FOR SELECT USING (active = true);
CREATE POLICY "Public read active services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public read active jobs" ON jobs FOR SELECT USING (active = true);
CREATE POLICY "Public read active team" ON team FOR SELECT USING (active = true);
CREATE POLICY "Public read active testimonials" ON testimonials FOR SELECT USING (active = true);

-- Políticas de escrita pública (apenas para contatos e candidaturas)
CREATE POLICY "Public insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert applications" ON applications FOR INSERT WITH CHECK (true);

-- Nota: Para operações administrativas (UPDATE, DELETE), você precisará configurar
-- autenticação JWT e criar políticas específicas baseadas em roles de usuário
