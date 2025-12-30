import {
  readJsonFile,
  appendToJsonArray,
  updateJsonArrayItem,
  deleteJsonArrayItem,
  findJsonArrayItem,
} from '../lib/json-storage.js';
import type { Post } from '../types/post.types.js';

const POSTS_FILE = 'posts.json';

export async function getAllPosts(): Promise<Post[]> {
  return readJsonFile<Post[]>(POSTS_FILE, {
    createIfNotExists: true,
    defaultData: [],
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  return findJsonArrayItem<Post>(POSTS_FILE, id);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getActivePosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.active)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0).getTime();
      const dateB = new Date(b.publishedAt || 0).getTime();
      return dateB - dateA; // Mais recentes primeiro
    });
}

export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const posts = await getActivePosts();
  const featured = posts.filter((post) => post.featured);
  
  // Se houver posts featured suficientes, retorna apenas eles
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  
  // Se não houver suficientes, completa com posts ativos (não featured) até o limite
  const nonFeatured = posts.filter((post) => !post.featured);
  const result = [...featured, ...nonFeatured];
  
  return result.slice(0, limit);
}

export async function createPost(post: Post): Promise<Post> {
  return appendToJsonArray<Post>(POSTS_FILE, post);
}

export async function updatePost(
  id: string,
  updates: Partial<Post>
): Promise<Post | null> {
  return updateJsonArrayItem<Post>(POSTS_FILE, id, updates);
}

export async function deletePost(id: string): Promise<boolean> {
  return deleteJsonArrayItem<Post>(POSTS_FILE, id);
}
