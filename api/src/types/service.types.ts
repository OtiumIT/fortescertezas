export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image?: string;
  order: number;
  active: boolean;
  features: string[];
  seo?: {
    title?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}
