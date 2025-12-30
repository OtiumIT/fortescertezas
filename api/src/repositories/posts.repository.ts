// Usa apenas Supabase
import * as supabaseRepo from './supabase/posts.repository.js';
import type { Post } from '../types/post.types.js';
import { env } from '../config/env.js';

function ensureSupabaseConfigured(): void {
  console.log('[posts.repository] Verificando configuração do Supabase...');
  console.log('[posts.repository] SUPABASE_URL:', !!env.SUPABASE_URL, env.SUPABASE_URL ? `${env.SUPABASE_URL.substring(0, 30)}...` : 'NÃO CONFIGURADO');
  console.log('[posts.repository] SUPABASE_ANON_KEY:', !!env.SUPABASE_ANON_KEY, env.SUPABASE_ANON_KEY ? `${env.SUPABASE_ANON_KEY.substring(0, 20)}...` : 'NÃO CONFIGURADO');
  
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente.');
  }
  
  console.log('[posts.repository] Supabase configurado corretamente');
}

export async function getAllPosts(): Promise<Post[]> {
  ensureSupabaseConfigured();
  console.log('[posts.repository] Buscando posts do Supabase...');
  const posts = await supabaseRepo.getAllPosts();
  console.log(`[posts.repository] Retornando ${posts.length} posts do Supabase`);
  return posts;
}

export async function getPostById(id: string): Promise<Post | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getPostById(id);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getPostBySlug(slug);
}

export async function getActivePosts(): Promise<Post[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getActivePosts();
}

export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  ensureSupabaseConfigured();
  return await supabaseRepo.getFeaturedPosts(limit);
}

export async function createPost(post: Post): Promise<Post> {
  ensureSupabaseConfigured();
  return await supabaseRepo.createPost(post);
}

export async function updatePost(
  id: string,
  updates: Partial<Post>
): Promise<Post | null> {
  ensureSupabaseConfigured();
  return await supabaseRepo.updatePost(id, updates);
}

export async function deletePost(id: string): Promise<boolean> {
  ensureSupabaseConfigured();
  return await supabaseRepo.deletePost(id);
}
