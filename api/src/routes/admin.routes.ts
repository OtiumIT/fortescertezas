import { Hono } from 'hono';
import { handleGetContent, handleUpdateContent } from '../controllers/content.controller.js';
import {
  handleGetAllServices,
  handleGetServiceById,
  handleCreateService,
  handleUpdateService,
  handleDeleteService,
} from '../controllers/services.controller.js';
import {
  handleGetAllJobs,
  handleGetJobById,
  handleCreateJob,
  handleUpdateJob,
  handleDeleteJob,
} from '../controllers/jobs.controller.js';
import {
  handleGetAllPosts,
  handleGetPostById,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
} from '../controllers/posts.controller.js';
import {
  handleGetAllContacts,
  handleGetContactById,
  handleUpdateContactStatus,
  handleDeleteContact,
} from '../controllers/contacts.controller.js';
import {
  handleGetAllApplications,
  handleGetApplicationById,
  handleGetApplicationsByJobId,
  handleUpdateApplicationStatus,
  handleDeleteApplication,
} from '../controllers/applications.controller.js';
import { handleUploadImage } from '../controllers/upload.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminRateLimit } from '../middleware/rate-limit.middleware.js';

const adminRoutes = new Hono();

adminRoutes.use('*', authMiddleware);
adminRoutes.use('*', adminRateLimit);

adminRoutes.get('/content/:section', handleGetContent);
adminRoutes.put('/content/:section', handleUpdateContent);

adminRoutes.get('/services', handleGetAllServices);
adminRoutes.post('/services', handleCreateService);
adminRoutes.get('/services/:id', handleGetServiceById);
adminRoutes.put('/services/:id', handleUpdateService);
adminRoutes.delete('/services/:id', handleDeleteService);

adminRoutes.get('/jobs', handleGetAllJobs);
adminRoutes.post('/jobs', handleCreateJob);
adminRoutes.get('/jobs/:id', handleGetJobById);
adminRoutes.put('/jobs/:id', handleUpdateJob);
adminRoutes.delete('/jobs/:id', handleDeleteJob);

adminRoutes.get('/posts', handleGetAllPosts);
adminRoutes.post('/posts', handleCreatePost);
adminRoutes.get('/posts/:id', handleGetPostById);
adminRoutes.put('/posts/:id', handleUpdatePost);
adminRoutes.delete('/posts/:id', handleDeletePost);

adminRoutes.get('/contacts', handleGetAllContacts);
adminRoutes.get('/contacts/:id', handleGetContactById);
adminRoutes.patch('/contacts/:id', handleUpdateContactStatus);
adminRoutes.delete('/contacts/:id', handleDeleteContact);

adminRoutes.get('/applications', handleGetAllApplications);
adminRoutes.get('/applications/job/:jobId', handleGetApplicationsByJobId);
adminRoutes.get('/applications/:id', handleGetApplicationById);
adminRoutes.patch('/applications/:id', handleUpdateApplicationStatus);
adminRoutes.delete('/applications/:id', handleDeleteApplication);

adminRoutes.post('/upload', handleUploadImage);

export default adminRoutes;
