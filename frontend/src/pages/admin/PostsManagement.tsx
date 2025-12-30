import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { FileUpload } from '@/components/ui/FileUpload';
import { AdminLayout } from '@/components/admin/AdminLayout';
import type { Post, CreatePostInput } from '@/types/post.types';
import type { ApiResponse } from '@/types/api.types';

export function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await apiClient.get<ApiResponse<Post[]>>('/admin/posts');
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      await apiClient.delete(`/admin/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Erro ao deletar post');
    }
  }

  function handleEdit(post: Post) {
    setEditingPost(post);
    setShowForm(true);
  }

  function handleNew() {
    setEditingPost(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingPost(null);
    setShowForm(false);
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">A carregar...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Posts</h1>
          <Button onClick={handleNew}>Novo Post</Button>
        </div>

        {showForm && (
          <PostForm
            post={editingPost}
            onSave={() => {
              fetchPosts();
              handleCancel();
            }}
            onCancel={handleCancel}
          />
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destaque
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('pt-PT')
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {post.active ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.featured && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Destaque
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

function PostForm({
  post,
  onSave,
  onCancel,
}: {
  post: Post | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreatePostInput>({
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          featuredImage: post.featuredImage,
          seo: post.seo,
          active: post.active,
          featured: post.featured,
          tags: post.tags,
        }
      : {
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          author: '',
          featuredImage: '',
          active: false,
          featured: false,
          tags: [],
        },
  });

  function addTag() {
    setTags([...tags, '']);
  }

  function removeTag(index: number) {
    setTags(tags.filter((_, i) => i !== index));
  }

  function updateTag(index: number, value: string) {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  }

  async function onSubmit(data: CreatePostInput) {
    setSaving(true);
    try {
      const postData: CreatePostInput = {
        ...data,
        tags: tags.filter((t) => t.trim() !== ''),
      };

      if (post) {
        await apiClient.put(`/admin/posts/${post.id}`, postData);
      } else {
        await apiClient.post('/admin/posts', postData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Erro ao salvar post');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{post ? 'Editar Post' : 'Novo Post'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Título"
          {...register('title', { required: 'Título é obrigatório' })}
          error={errors.title?.message}
        />
        <Input
          label="Slug (URL amigável - opcional, será gerado automaticamente se vazio)"
          {...register('slug')}
          error={errors.slug?.message}
          placeholder="exemplo-post-url"
        />
        <Textarea
          label="Resumo (excerpt)"
          rows={3}
          {...register('excerpt', { required: 'Resumo é obrigatório' })}
          error={errors.excerpt?.message}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conteúdo (Markdown)
          </label>
          <Textarea
            rows={20}
            className="font-mono text-sm"
            {...register('content', { required: 'Conteúdo é obrigatório' })}
            error={errors.content?.message}
          />
          <p className="mt-1 text-sm text-gray-500">
            Use Markdown para formatação (títulos, listas, links, etc.)
          </p>
        </div>
        <Input
          label="Autor (opcional)"
          {...register('author')}
        />
        <FileUpload
          label="Imagem de Destaque (opcional)"
          value={watch('featuredImage')}
          onChange={(url: string) => setValue('featuredImage', url)}
        />
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">SEO</h3>
          <Textarea
            label="Meta Descrição"
            rows={2}
            {...register('seo.metaDescription')}
            error={errors.seo?.metaDescription?.message}
          />
          <Input
            label="Meta Palavras-chave (separadas por vírgula)"
            {...register('seo.metaKeywords')}
            error={errors.seo?.metaKeywords?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          {tags.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={tag}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateTag(index, e.target.value)}
                placeholder="Tag"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeTag(index)}
              >
                Remover
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addTag} size="sm">
            + Adicionar Tag
          </Button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input type="checkbox" {...register('active')} className="mr-2" />
            <label>Publicado</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" {...register('featured')} className="mr-2" />
            <label>Destaque (aparece na home)</label>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button type="submit" isLoading={saving}>
            Guardar
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}
