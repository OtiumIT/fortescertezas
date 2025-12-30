import { getSupabaseClient } from '../../lib/supabase.js';
import type { Post } from '../../types/post.types.js';

export async function getAllPosts(): Promise<Post[]> {
  const supabase = getSupabaseClient();
  
  console.log('[supabase.posts] Executando query no Supabase...');
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[supabase.posts] Erro ao buscar posts:', error);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  console.log(`[supabase.posts] Query executada. Retornados ${data?.length || 0} posts`);
  console.log('[supabase.posts] Primeiros posts:', data?.slice(0, 2).map(p => ({ id: p.id, title: p.title })));

  // Converte de snake_case para camelCase
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    author: item.author,
    publishedAt: item.published_at,
    updatedAt: item.updated_at,
    seo: item.seo,
    active: item.active,
    featured: item.featured,
    views: item.views || 0,
    tags: item.tags || [],
  }));
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    seo: data.seo,
    active: data.active,
    featured: data.featured,
    views: data.views || 0,
    tags: data.tags || [],
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch post: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    seo: data.seo,
    active: data.active,
    featured: data.featured,
    views: data.views || 0,
    tags: data.tags || [],
  };
}

export async function getActivePosts(): Promise<Post[]> {
  const supabase = getSupabaseClient();
  
  console.log('[supabase.posts] Buscando posts ativos...');
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('active', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[supabase.posts] Erro ao buscar posts ativos:', error);
    throw new Error(`Failed to fetch active posts: ${error.message}`);
  }

  console.log(`[supabase.posts] Posts ativos encontrados: ${data?.length || 0}`);

  // Converte de snake_case para camelCase
  return (data || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    author: item.author,
    publishedAt: item.published_at,
    updatedAt: item.updated_at,
    seo: item.seo,
    active: item.active,
    featured: item.featured,
    views: item.views || 0,
    tags: item.tags || [],
  }));
}

export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const supabase = getSupabaseClient();
  
  // Primeiro tenta buscar posts featured
  const { data: featured, error: featuredError } = await supabase
    .from('posts')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (featuredError) {
    throw new Error(`Failed to fetch featured posts: ${featuredError.message}`);
  }

  const convertPost = (item: any): Post => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: item.content,
    author: item.author,
    publishedAt: item.published_at,
    updatedAt: item.updated_at,
    seo: item.seo,
    active: item.active,
    featured: item.featured,
    views: item.views || 0,
    tags: item.tags || [],
  });

  // Se tem featured suficientes, retorna eles
  if (featured && featured.length >= limit) {
    return featured.map(convertPost);
  }

  // Se não tem suficientes, completa com posts ativos não-featured
  const remaining = limit - (featured?.length || 0);
  if (remaining > 0) {
    const { data: nonFeatured, error: nonFeaturedError } = await supabase
      .from('posts')
      .select('*')
      .eq('active', true)
      .eq('featured', false)
      .order('published_at', { ascending: false })
      .limit(remaining);

    if (nonFeaturedError) {
      throw new Error(`Failed to fetch non-featured posts: ${nonFeaturedError.message}`);
    }

    return [...(featured || []).map(convertPost), ...(nonFeatured || []).map(convertPost)];
  }

  return (featured || []).map(convertPost);
}

export async function createPost(post: Post): Promise<Post> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      published_at: post.publishedAt,
      updated_at: post.updatedAt || new Date().toISOString(),
      seo: post.seo,
      active: post.active,
      featured: post.featured,
      views: post.views || 0,
      tags: post.tags || [],
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    seo: data.seo,
    active: data.active,
    featured: data.featured,
    views: data.views || 0,
    tags: data.tags || [],
  };
}

export async function updatePost(
  id: string,
  updates: Partial<Post>
): Promise<Post | null> {
  const supabase = getSupabaseClient();
  
  // Converte camelCase para snake_case
  const dbUpdates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
  if (updates.content !== undefined) dbUpdates.content = updates.content;
  if (updates.author !== undefined) dbUpdates.author = updates.author;
  if (updates.publishedAt !== undefined) dbUpdates.published_at = updates.publishedAt;
  if (updates.seo !== undefined) dbUpdates.seo = updates.seo;
  if (updates.active !== undefined) dbUpdates.active = updates.active;
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
  if (updates.views !== undefined) dbUpdates.views = updates.views;
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
  
  const { data, error } = await supabase
    .from('posts')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to update post: ${error.message}`);
  }

  // Converte de snake_case para camelCase
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    seo: data.seo,
    active: data.active,
    featured: data.featured,
    views: data.views || 0,
    tags: data.tags || [],
  };
}

export async function deletePost(id: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`);
  }

  return true;
}
