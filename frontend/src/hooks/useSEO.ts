import { useEffect } from 'react';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
}

export function useSEO({ title, description, keywords }: SEOData) {
  useEffect(() => {
    const originalTitle = document.title;
    const originalMetaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalMetaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');

    if (title) {
      document.title = `${title} | Fortes Certezas`;
    }

    let metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        if (originalMetaDescription) {
          metaDescription.setAttribute('content', originalMetaDescription);
        } else {
          metaDescription.remove();
        }
      }
      if (metaKeywords) {
        if (originalMetaKeywords) {
          metaKeywords.setAttribute('content', originalMetaKeywords);
        } else {
          metaKeywords.remove();
        }
      }
    };
  }, [title, description, keywords]);
}
