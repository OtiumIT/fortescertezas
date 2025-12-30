import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { useSEO } from '@/hooks/useSEO';
import { parseMarkdownToHTML } from '@/lib/markdown';
import type { Post } from '@/types/post.types';
import type { ApiResponse } from '@/types/api.types';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;

      try {
        const response = await apiClient.get<ApiResponse<Post>>(`/posts/${slug}`);
        setPost(response.data.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  useSEO(
    post
      ? {
          title: post.title,
          description: post.seo?.metaDescription || post.excerpt,
          keywords: post.seo?.metaKeywords,
        }
      : {}
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-modern py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-800 mb-4">Post não encontrado</h1>
        <Link to="/blog">
          <Button>Voltar para Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={post.title} />

      <article className="py-12 md:py-16 bg-white">
        <div className="container-modern">
          <div className="max-w-4xl mx-auto">
            {post.featuredImage && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const container = target.parentElement;
                    if (container) {
                      container.style.display = 'none';
                    }
                  }}
                />
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              {post.publishedAt && (
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('pt-PT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>Por {post.author}</span>
                </>
              )}
            </div>

            <div
              className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-strong:text-neutral-900 prose-ul:text-neutral-700 prose-li:text-neutral-700 prose-a:text-primary-500"
              dangerouslySetInnerHTML={{
                __html: parseMarkdownToHTML(post.content),
              }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-neutral-200">
              <Link to="/blog">
                <Button variant="outline">← Voltar para Blog</Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
