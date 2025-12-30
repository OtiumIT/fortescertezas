// Script para migrar dados dos arquivos JSON para Supabase
// Execute: node scripts/migrate-to-supabase.js

import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');
const dadosDir = join(projectRoot, 'dados');

// Carrega variáveis de ambiente
import dotenv from 'dotenv';
// Tenta múltiplos caminhos para .env
const envPaths = [
  join(projectRoot, 'api', '.env'),
  join(projectRoot, '.env'),
  '.env',
];

for (const envPath of envPaths) {
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Erro: SUPABASE_URL e SUPABASE_SERVICE_KEY devem estar configurados no .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function readJsonFile(filename) {
  const filePath = join(dadosDir, filename);
  if (!existsSync(filePath)) {
    console.warn(`⚠️  Arquivo não encontrado: ${filename}`);
    return null;
  }
  const content = await readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function migrateSiteContent() {
  console.log('📄 Migrando site-content.json...');
  const content = await readJsonFile('site-content.json');
  if (!content) return;

  const { error } = await supabase
    .from('site_content')
    .upsert({
      id: 'main',
      content: content,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('❌ Erro ao migrar site-content:', error.message);
  } else {
    console.log('✅ site-content.json migrado com sucesso');
  }
}

async function migratePosts() {
  console.log('📄 Migrando posts.json...');
  const posts = await readJsonFile('posts.json');
  if (!posts || !Array.isArray(posts)) return;

  // Insere em lotes de 100
  for (let i = 0; i < posts.length; i += 100) {
    const batch = posts.slice(i, i + 100);
    const { error } = await supabase
      .from('posts')
      .upsert(batch.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        published_at: post.publishedAt || post.published_at,
        updated_at: post.updatedAt || post.updated_at || new Date().toISOString(),
        seo: post.seo,
        active: post.active,
        featured: post.featured,
        views: post.views || 0,
        tags: post.tags || [],
        created_at: post.createdAt || post.created_at || new Date().toISOString(),
      })), { onConflict: 'id' });

    if (error) {
      console.error(`❌ Erro ao migrar posts (lote ${i}-${i + 100}):`, error.message);
    } else {
      console.log(`✅ Posts ${i + 1}-${Math.min(i + 100, posts.length)} migrados`);
    }
  }
}

async function migrateServices() {
  console.log('📄 Migrando services.json...');
  const services = await readJsonFile('services.json');
  if (!services || !Array.isArray(services)) return;

  const { error } = await supabase
    .from('services')
    .upsert(services.map(service => ({
      id: service.id,
      title: service.title,
      short_description: service.shortDescription,
      description: service.description,
      icon: service.icon,
      image: service.image,
      order: service.order,
      active: service.active,
      features: service.features || [],
      seo: service.seo,
      updated_at: service.updatedAt || service.updated_at || new Date().toISOString(),
      created_at: service.createdAt || service.created_at || new Date().toISOString(),
    })), { onConflict: 'id' });

  if (error) {
    console.error('❌ Erro ao migrar services:', error.message);
  } else {
    console.log(`✅ ${services.length} serviços migrados com sucesso`);
  }
}

async function migrateJobs() {
  console.log('📄 Migrando jobs.json...');
  const jobs = await readJsonFile('jobs.json');
  if (!jobs || !Array.isArray(jobs)) return;

  const { error } = await supabase
    .from('jobs')
    .upsert(jobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location,
      contract_type: job.contractType,
      salary_range: job.salary || job.salaryRange,
      requirements: job.requirements || [],
      benefits: job.benefits || [],
      active: job.active,
      published_at: job.publishedAt || job.published_at || new Date().toISOString(),
      expires_at: job.expiresAt || job.expires_at,
      applications_count: job.applicationsCount || 0,
      updated_at: job.updatedAt || job.updated_at || new Date().toISOString(),
      created_at: job.createdAt || job.created_at || new Date().toISOString(),
    })), { onConflict: 'id' });

  if (error) {
    console.error('❌ Erro ao migrar jobs:', error.message);
  } else {
    console.log(`✅ ${jobs.length} vagas migradas com sucesso`);
  }
}

async function migrateContacts() {
  console.log('📄 Migrando contacts.json...');
  const contacts = await readJsonFile('contacts.json');
  if (!contacts || !Array.isArray(contacts)) return;

  const { error } = await supabase
    .from('contacts')
    .upsert(contacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject || '',
      message: contact.message,
      status: contact.status || 'new',
      read: contact.read || false,
      responded: contact.responded || false,
      updated_at: contact.updatedAt || contact.updated_at || new Date().toISOString(),
      created_at: contact.createdAt || contact.created_at || new Date().toISOString(),
    })), { onConflict: 'id' });

  if (error) {
    console.error('❌ Erro ao migrar contacts:', error.message);
  } else {
    console.log(`✅ ${contacts.length} contatos migrados com sucesso`);
  }
}

async function migrateApplications() {
  console.log('📄 Migrando applications.json...');
  const applications = await readJsonFile('applications.json');
  if (!applications || !Array.isArray(applications)) return;

  const { error } = await supabase
    .from('applications')
    .upsert(applications.map(app => ({
      id: app.id,
      job_id: app.jobId || app.job_id,
      name: app.name,
      email: app.email,
      phone: app.phone,
      message: app.message,
      resume: app.resume,
      resume_url: app.resumeUrl || app.resume_url,
      status: app.status || 'new',
      read: app.read || false,
      updated_at: app.updatedAt || app.updated_at || new Date().toISOString(),
      created_at: app.createdAt || app.created_at || new Date().toISOString(),
    })), { onConflict: 'id' });

  if (error) {
    console.error('❌ Erro ao migrar applications:', error.message);
  } else {
    console.log(`✅ ${applications.length} candidaturas migradas com sucesso`);
  }
}

async function migrateTeam() {
  console.log('📄 Migrando team.json...');
  const team = await readJsonFile('team.json');
  if (!team || !Array.isArray(team)) return;

  const { error } = await supabase
    .from('team')
    .upsert(team.map(member => ({
      ...member,
      updated_at: member.updatedAt || member.updated_at || new Date().toISOString(),
      created_at: member.createdAt || member.created_at || new Date().toISOString(),
    })), { onConflict: 'id' });

  if (error) {
    console.error('❌ Erro ao migrar team:', error.message);
  } else {
    console.log(`✅ ${team.length} membros da equipe migrados com sucesso`);
  }
}

async function migrateTestimonials() {
  console.log('📄 Migrando testimonials.json...');
  const testimonials = await readJsonFile('testimonials.json');
  if (!testimonials || !Array.isArray(testimonials)) return;

  const { error } = await supabase
    .from('testimonials')
    .upsert(testimonials.map(testimonial => ({
      ...testimonial,
      author_name: testimonial.authorName || testimonial.author_name,
      author_role: testimonial.authorRole || testimonial.author_role,
      author_company: testimonial.authorCompany || testimonial.author_company,
      updated_at: testimonial.updatedAt || testimonial.updated_at || new Date().toISOString(),
      created_at: testimonial.createdAt || testimonial.created_at || new Date().toISOString(),
    })), { onConflict: 'id' });

  if (error) {
    console.error('❌ Erro ao migrar testimonials:', error.message);
  } else {
    console.log(`✅ ${testimonials.length} depoimentos migrados com sucesso`);
  }
}

async function main() {
  console.log('🚀 Iniciando migração para Supabase...\n');

  try {
    await migrateSiteContent();
    await migratePosts();
    await migrateServices();
    await migrateJobs();
    await migrateContacts();
    await migrateApplications();
    await migrateTeam();
    await migrateTestimonials();

    console.log('\n✨ Migração concluída!');
  } catch (error) {
    console.error('\n❌ Erro durante migração:', error);
    process.exit(1);
  }
}

main();
