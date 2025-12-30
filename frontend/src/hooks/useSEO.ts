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

    // Garantir que as meta tags noindex/nofollow sempre existam
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet, noimageindex');

    let metaGooglebot = document.querySelector('meta[name="googlebot"]');
    if (!metaGooglebot) {
      metaGooglebot = document.createElement('meta');
      metaGooglebot.setAttribute('name', 'googlebot');
      document.head.appendChild(metaGooglebot);
    }
    metaGooglebot.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet, noimageindex');

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
