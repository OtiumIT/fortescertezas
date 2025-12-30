import { Hono } from 'hono';
import { handleGetContent } from '../controllers/content.controller.js';
import { handleGetAllServices, handleGetServiceById } from '../controllers/services.controller.js';
import { handleGetAllJobs, handleGetJobById } from '../controllers/jobs.controller.js';
import { handleGetAllPosts, handleGetPostBySlug, handleGetFeaturedPosts } from '../controllers/posts.controller.js';
import { handleCreateContact } from '../controllers/contacts.controller.js';
import { handleCreateApplication } from '../controllers/applications.controller.js';
import { handleGetRSSFeed, handleGetSitemap } from '../controllers/feeds.controller.js';
import { publicRateLimit } from '../middleware/rate-limit.middleware.js';

const publicRoutes = new Hono();

publicRoutes.use('*', publicRateLimit);

publicRoutes.get('/content/:section', handleGetContent);
publicRoutes.get('/services', handleGetAllServices);
publicRoutes.get('/services/:id', handleGetServiceById);
publicRoutes.get('/jobs', handleGetAllJobs);
publicRoutes.get('/jobs/:id', handleGetJobById);
publicRoutes.get('/posts', handleGetAllPosts);
publicRoutes.get('/posts/featured', handleGetFeaturedPosts);
publicRoutes.get('/posts/:slug', handleGetPostBySlug);
publicRoutes.post('/contacts', handleCreateContact);
publicRoutes.post('/applications', handleCreateApplication);
publicRoutes.get('/feed/rss', handleGetRSSFeed);
publicRoutes.get('/sitemap.xml', handleGetSitemap);

export default publicRoutes;
