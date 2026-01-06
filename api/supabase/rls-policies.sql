-- Políticas RLS para operações administrativas
-- Execute este SQL no SQL Editor do Supabase

-- Políticas para site_content (UPDATE e INSERT)
-- Permite UPDATE e INSERT usando SERVICE_KEY (bypassa RLS) ou com autenticação
-- Se estiver usando ANON_KEY, essas políticas permitirão as operações

-- Remove políticas existentes se houver (ignora erro se não existir)
DROP POLICY IF EXISTS "Allow update site_content" ON site_content;
DROP POLICY IF EXISTS "Allow insert site_content" ON site_content;

-- Política para UPDATE em site_content
CREATE POLICY "Allow update site_content" 
ON site_content 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Política para INSERT em site_content
CREATE POLICY "Allow insert site_content" 
ON site_content 
FOR INSERT 
WITH CHECK (true);

-- Políticas para posts (UPDATE, INSERT, DELETE)
DROP POLICY IF EXISTS "Allow all posts operations" ON posts;
CREATE POLICY "Allow all posts operations" 
ON posts 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para services (UPDATE, INSERT, DELETE)
DROP POLICY IF EXISTS "Allow all services operations" ON services;
CREATE POLICY "Allow all services operations" 
ON services 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para jobs (UPDATE, INSERT, DELETE)
DROP POLICY IF EXISTS "Allow all jobs operations" ON jobs;
CREATE POLICY "Allow all jobs operations" 
ON jobs 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para contacts (UPDATE, DELETE - INSERT já existe)
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

-- Políticas para applications (UPDATE, DELETE - INSERT já existe)
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

-- Políticas para team (UPDATE, INSERT, DELETE)
DROP POLICY IF EXISTS "Allow all team operations" ON team;
CREATE POLICY "Allow all team operations" 
ON team 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Políticas para testimonials (UPDATE, INSERT, DELETE)
DROP POLICY IF EXISTS "Allow all testimonials operations" ON testimonials;
CREATE POLICY "Allow all testimonials operations" 
ON testimonials 
FOR ALL 
USING (true)
WITH CHECK (true);
