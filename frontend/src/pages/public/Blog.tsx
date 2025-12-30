import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/lib/api-client';
import { PageHeader } from '@/components/layout/PageHeader';
import type { Post } from '@/types/post.types';
import type { ApiResponse } from '@/types/api.types';

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await apiClient.get<ApiResponse<Post[]>>('/posts?status=active');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-neutral-600">A carregar...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="Blog" 
        subtitle="Artigos e novidades sobre portaria, segurança e gestão de condomínios"
      />

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="container-modern">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-16 card">
                <p className="text-neutral-600 text-lg mb-4">Não há posts disponíveis no momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post.id} className="card card-hover overflow-hidden">
                    {post.featuredImage && (
                      <div className="aspect-video overflow-hidden bg-neutral-200">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      {post.publishedAt && (
                        <time className="text-sm text-neutral-500">
                          {new Date(post.publishedAt).toLocaleDateString('pt-PT', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      )}
                      <h2 className="text-xl font-bold text-neutral-900 mt-2 mb-3">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary-500 transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center gap-2"
                      >
                        Ler mais
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
