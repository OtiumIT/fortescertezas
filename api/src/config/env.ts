import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Resolve o diretório raiz do projeto (um nível acima de api/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../..'); // api/src/config -> api -> raiz do projeto

interface Env {
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
  DATA_DIR: string;
  UPLOADS_DIR: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
}

function getEnv(): Env {
  const port = parseInt(process.env.PORT || '3007', 10);
  const nodeEnv = process.env.NODE_ENV || 'development';
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  
  // Resolve caminhos absolutos a partir da raiz do projeto
  const dataDir = process.env.DATA_DIR 
    ? resolve(process.env.DATA_DIR)
    : resolve(projectRoot, 'dados');
  
  const uploadsDir = process.env.UPLOADS_DIR
    ? resolve(process.env.UPLOADS_DIR)
    : resolve(projectRoot, 'frontend', 'public', 'uploads');
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is required');
  }

  return {
    PORT: port,
    NODE_ENV: nodeEnv,
    JWT_SECRET: jwtSecret,
    JWT_EXPIRES_IN: jwtExpiresIn,
    CORS_ORIGIN: corsOrigin,
    DATA_DIR: dataDir,
    UPLOADS_DIR: uploadsDir,
    ADMIN_USERNAME: adminUsername,
    ADMIN_PASSWORD: adminPassword,
  };
}

export const env = getEnv();
