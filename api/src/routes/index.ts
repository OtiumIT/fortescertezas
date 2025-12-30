import { Hono } from 'hono';
import publicRoutes from './public.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import { API_BASE_PATH } from '../config/constants.js';

const routes = new Hono();

routes.route(`${API_BASE_PATH}`, publicRoutes);
routes.route(`${API_BASE_PATH}/auth`, authRoutes);
routes.route(`${API_BASE_PATH}/admin`, adminRoutes);

export default routes;
