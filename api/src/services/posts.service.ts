import {
  getAllPosts as getAllPostsRepo,
  getActivePosts as getActivePostsRepo,
  getPostById as getPostByIdRepo,
  getPostBySlug as getPostBySlugRepo,
  getFeaturedPosts as getFeaturedPostsRepo,
  createPost as createPostRepo,
  updatePost as updatePostRepo,
  deletePost as deletePostRepo,
} from '../repositories/posts.repository.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { generateId } from '../lib/utils.js';
import type { Post, CreatePostInput, UpdatePostInput } from '../types/post.types.js';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function getAllPosts(activeOnly: boolean = false): Promise<Post[]> {
  console.log(`[posts.service] getAllPosts chamado, activeOnly: ${activeOnly}`);
  if (activeOnly) {
    console.log('[posts.service] Buscando apenas posts ativos');
    const posts = await getActivePostsRepo();
    console.log(`[posts.service] Retornando ${posts.length} posts ativos`);
    return posts;
  }

  console.log('[posts.service] Buscando todos os posts');
  const posts = await getAllPostsRepo();
  console.log(`[posts.service] Retornando ${posts.length} posts (todos)`);
  return posts;
}

export async function getPostById(id: string): Promise<Post> {
  const post = await getPostByIdRepo(id);

  if (!post) {
    throw new AppError('Post não encontrado', HTTP_STATUS.NOT_FOUND, 'POST_NOT_FOUND');
  }

  return post;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const post = await getPostBySlugRepo(slug);

  if (!post) {
    throw new AppError('Post não encontrado', HTTP_STATUS.NOT_FOUND, 'POST_NOT_FOUND');
  }

  return post;
}

export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  return getFeaturedPostsRepo(limit);
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const id = generateId('post');
  const slug = input.slug || generateSlug(input.title);
  
  // Verificar se slug já existe
  const existingPost = await getPostBySlugRepo(slug);
  if (existingPost) {
    throw new AppError('Slug já existe', HTTP_STATUS.CONFLICT, 'SLUG_EXISTS');
  }

  const now = new Date().toISOString();
  const post: Post = {
    id,
    slug,
    ...input,
    publishedAt: input.active ? now : undefined,
    updatedAt: now,
    active: input.active ?? false,
    featured: input.featured ?? false,
    views: 0,
  };

  return createPostRepo(post);
}

export async function updatePost(id: string, updates: UpdatePostInput): Promise<Post> {
  const existingPost = await getPostByIdRepo(id);

  if (!existingPost) {
    throw new AppError('Post não encontrado', HTTP_STATUS.NOT_FOUND, 'POST_NOT_FOUND');
  }

  // Se está atualizando o slug, verificar se não existe outro post com o mesmo slug
  if (updates.slug && updates.slug !== existingPost.slug) {
    const postWithSlug = await getPostBySlugRepo(updates.slug);
    if (postWithSlug && postWithSlug.id !== id) {
      throw new AppError('Slug já existe', HTTP_STATUS.CONFLICT, 'SLUG_EXISTS');
    }
  }

  // Se está ativando um post que estava inativo, definir publishedAt
  if (updates.active && !existingPost.active && !existingPost.publishedAt) {
    updates.publishedAt = new Date().toISOString();
  }

  updates.updatedAt = new Date().toISOString();

  const updated = await updatePostRepo(id, updates);

  if (!updated) {
    throw new AppError('Erro ao atualizar post', HTTP_STATUS.INTERNAL_SERVER_ERROR, 'UPDATE_ERROR');
  }

  return updated;
}

export async function deletePost(id: string): Promise<void> {
  const deleted = await deletePostRepo(id);

  if (!deleted) {
    throw new AppError('Post não encontrado', HTTP_STATUS.NOT_FOUND, 'POST_NOT_FOUND');
  }
}
