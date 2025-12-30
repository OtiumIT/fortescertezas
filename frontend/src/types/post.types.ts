export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  featuredImage?: string;
  seo?: {
    metaDescription: string;
    metaKeywords: string;
  };
  active: boolean;
  featured: boolean;
  views?: number;
  tags?: string[];
}

export interface CreatePostInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  author?: string;
  featuredImage?: string;
  seo?: {
    metaDescription: string;
    metaKeywords: string;
  };
  active?: boolean;
  featured?: boolean;
  tags?: string[];
}
