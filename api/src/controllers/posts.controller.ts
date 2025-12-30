import { Context } from 'hono';
import {
  getAllPosts as getAllPostsService,
  getPostById as getPostByIdService,
  getPostBySlug as getPostBySlugService,
  getFeaturedPosts as getFeaturedPostsService,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService,
} from '../services/posts.service.js';
import { createPostSchema, updatePostSchema } from '../lib/validation.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { Post } from '../types/post.types.js';
import type { ApiResponse } from '../types/api.types.js';

export async function handleGetAllPosts(c: Context): Promise<Response> {
  try {
    const activeOnly = c.req.query('status') === 'active';
    const posts = await getAllPostsService(activeOnly);

    const response: ApiResponse<Post[]> = {
      data: posts,
      meta: {
        total: posts.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetFeaturedPosts(c: Context): Promise<Response> {
  try {
    const limit = parseInt(c.req.query('limit') || '3', 10);
    const posts = await getFeaturedPostsService(limit);

    const response: ApiResponse<Post[]> = {
      data: posts,
      meta: {
        total: posts.length,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetPostById(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const post = await getPostByIdService(id);

    const response: ApiResponse<Post> = {
      data: post,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetPostBySlug(c: Context): Promise<Response> {
  try {
    const slug = c.req.param('slug');
    const post = await getPostBySlugService(slug);

    const response: ApiResponse<Post> = {
      data: post,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleCreatePost(c: Context): Promise<Response> {
  try {
    const body = await c.req.json();
    const validated = createPostSchema.parse(body);
    const post = await createPostService(validated);

    const response: ApiResponse<Post> = {
      data: post,
    };

    return c.json(response, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleUpdatePost(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updatePostSchema.parse(body);
    const post = await updatePostService(id, validated);

    const response: ApiResponse<Post> = {
      data: post,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleDeletePost(c: Context): Promise<Response> {
  try {
    const id = c.req.param('id');
    await deletePostService(id);

    const response: ApiResponse<{ message: string }> = {
      data: {
        message: 'Post deletado com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
