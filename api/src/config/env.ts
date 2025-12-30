// Importação condicional para Node.js (apenas em desenvolvimento local)
// Em Workers, essas importações não são necessárias
let dotenvLoaded = false;

// Tenta carregar dotenv apenas em Node.js (desenvolvimento)
if (typeof process !== 'undefined' && process.env && !dotenvLoaded) {
  import('dotenv').then((dotenvModule) => {
    dotenvModule.config();
    dotenvLoaded = true;
  }).catch(() => {
    // Ignora se não estiver disponível (Workers)
  });
}

// Resolve o diretório raiz do projeto (um nível acima de api/)
let projectRoot = '/';
if (typeof process !== 'undefined') {
  import('path').then((pathModule) => {
    import('url').then((urlModule) => {
      const __filename = urlModule.fileURLToPath(import.meta.url);
      const __dirname = pathModule.dirname(__filename);
      projectRoot = pathModule.resolve(__dirname, '../..');
    }).catch(() => {});
  }).catch(() => {});
}

export interface EnvConfig {
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

// Função para obter env de Workers ou Node.js
// O tipo Env é definido em src/env.d.ts e está disponível globalmente
function getEnv(workerEnv?: Env): EnvConfig {
  // Detecta se está em Workers (tem workerEnv) ou Node.js (tem process.env)
  const isWorker = workerEnv !== undefined;
  const envSource = isWorker ? workerEnv : (process.env as Record<string, string | undefined>);

  const port = parseInt(envSource.PORT || '3007', 10);
  const nodeEnv = envSource.NODE_ENV || (isWorker ? 'production' : 'development');
  const jwtSecret = envSource.JWT_SECRET;
  const jwtExpiresIn = envSource.JWT_EXPIRES_IN || '7d';
  const corsOrigin = envSource.CORS_ORIGIN || 'http://localhost:5173';
  
  // Em Workers, usa caminhos relativos ou absolutos simples
  // Em Node.js, resolve caminhos absolutos
  let dataDir: string;
  let uploadsDir: string;
  
  if (isWorker) {
    // Workers: usa caminhos relativos ou do bundle
    dataDir = envSource.DATA_DIR || '/dados';
    uploadsDir = envSource.UPLOADS_DIR || '/uploads';
  } else {
    // Node.js: resolve caminhos absolutos (será atualizado quando path carregar)
    if (projectRoot !== '/') {
      dataDir = envSource.DATA_DIR 
        ? envSource.DATA_DIR
        : `${projectRoot}/dados`;
      
      uploadsDir = envSource.UPLOADS_DIR
        ? envSource.UPLOADS_DIR
        : `${projectRoot}/frontend/public/uploads`;
    } else {
      // Fallback enquanto path não carregou
      dataDir = envSource.DATA_DIR || './dados';
      uploadsDir = envSource.UPLOADS_DIR || './frontend/public/uploads';
    }
  }
  
  const adminUsername = envSource.ADMIN_USERNAME || 'admin';
  const adminPassword = envSource.ADMIN_PASSWORD || 'admin123';

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

// Exporta função para criar env a partir de workerEnv
export function createEnv(workerEnv?: Env): EnvConfig {
  return getEnv(workerEnv);
}

// Para compatibilidade com código existente, exporta env padrão (Node.js)
// Só inicializa se estiver em Node.js (não em Workers)
let _env: EnvConfig | null = null;
function getDefaultEnv(): EnvConfig {
  if (!_env) {
    // Só tenta inicializar se estiver em Node.js
    if (typeof process !== 'undefined' && process.env) {
      _env = getEnv();
    } else {
      // Em Workers, retorna valores padrão (será sobrescrito quando o handler for chamado)
      _env = {
        PORT: 8787,
        NODE_ENV: 'production',
        JWT_SECRET: 'placeholder', // Será substituído quando createEnv for chamado
        JWT_EXPIRES_IN: '7d',
        CORS_ORIGIN: '*',
        DATA_DIR: '/dados',
        UPLOADS_DIR: '/uploads',
        ADMIN_USERNAME: 'admin',
        ADMIN_PASSWORD: 'admin123',
      };
    }
  }
  return _env;
}

// Exporta como getter para manter compatibilidade
export const env = new Proxy({} as EnvConfig, {
  get(_target, prop) {
    return getDefaultEnv()[prop as keyof EnvConfig];
  },
});
