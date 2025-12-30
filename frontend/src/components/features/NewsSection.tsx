import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/lib/api-client';
import type { Post } from '@/types/post.types';
import type { ApiResponse } from '@/types/api.types';

export function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        const response = await apiClient.get<ApiResponse<Post[]>>('/posts/featured?limit=3');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPosts();
  }, []);

  if (loading) {
    return null;
  }
  
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="section bg-white">
      <div className="container-modern">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3">
                Novidades e <span className="text-gradient">Artigos</span>
              </h2>
              <p className="text-lg text-neutral-600">
                Fique a par das últimas novidades sobre portaria e segurança
              </p>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold"
            >
              Ver todos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <article key={post.id} className="card card-hover overflow-hidden group">
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden bg-neutral-200">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <h3 className="text-xl font-bold text-neutral-900 mt-2 mb-3">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary-500 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
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

          <div className="mt-8 text-center md:hidden">
            <Link to="/blog">
              <button className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold">
                Ver todos os artigos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
