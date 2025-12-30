import { Hono } from 'hono';
import { handleLogin, handleMe, handleLogout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authRateLimit } from '../middleware/rate-limit.middleware.js';

const authRoutes = new Hono();

authRoutes.post('/login', authRateLimit, handleLogin);
authRoutes.get('/me', authMiddleware, handleMe);
authRoutes.post('/logout', authMiddleware, handleLogout);

export default authRoutes;
