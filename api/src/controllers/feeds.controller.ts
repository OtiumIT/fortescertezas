import { Context } from 'hono';
import { getAllJobs } from '../services/jobs.service.js';
import { getAllServices } from '../services/services.service.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { Job } from '../types/job.types.js';

// URL base do site - pode ser configurada via env
const getSiteUrl = (c: Context): string => {
  const host = c.req.header('host') || 'localhost:5173';
  const protocol = c.req.header('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  return process.env.SITE_URL || `${protocol}://${host}`;
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function handleGetRSSFeed(c: Context): Promise<Response> {
  try {
    const jobs = await getAllJobs(true); // Apenas vagas ativas
    const siteUrl = getSiteUrl(c);

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Vagas de Emprego - Fortes Certezas</title>
    <link>${siteUrl}/vagas</link>
    <description>Ofertas de emprego da Fortes Certezas, Unipessoal Lda.</description>
    <language>pt-PT</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    ${jobs
      .map(
        (job: Job) => `    <item>
      <title>${escapeXml(job.title)}</title>
      <link>${siteUrl}/vagas/${job.id}</link>
      <description>${escapeXml(job.description.replace(/<[^>]*>/g, '').substring(0, 500))}</description>
      <pubDate>${new Date(job.publishedAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/vagas/${job.id}</guid>
      <category>${escapeXml(job.location)}</category>
      <category>${escapeXml(job.contractType)}</category>
    </item>`
      )
      .join('\n')}
  </channel>
</rss>`;

    return new Response(rss, {
      status: HTTP_STATUS.OK,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleGetSitemap(c: Context): Promise<Response> {
  try {
    const jobs = await getAllJobs(true);
    const services = await getAllServices(true);
    const siteUrl = getSiteUrl(c);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/sobre</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/servicos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${services
    .map(
      (service) => `  <url>
    <loc>${siteUrl}/servicos/${service.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n')}
  <url>
    <loc>${siteUrl}/vagas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${jobs
    .map(
      (job) => `  <url>
    <loc>${siteUrl}/vagas/${job.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${new Date(job.publishedAt).toISOString().split('T')[0]}</lastmod>
  </url>`
    )
    .join('\n')}
  <url>
    <loc>${siteUrl}/contacto</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${siteUrl}/privacidade</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

    return new Response(sitemap, {
      status: HTTP_STATUS.OK,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error) {
    return handleError(error, c);
  }
}
