/// <reference path="../env.d.ts" />
/// <reference types="@cloudflare/workers-types" />

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
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_KEY?: string; // Para operações administrativas
}

/// <reference path="../env.d.ts" />

// Função para obter env de Workers ou Node.js
// O tipo Env é definido em src/env.d.ts e está disponível globalmente
function getEnv(workerEnv?: Env): EnvConfig {
  // Detecta se está em Workers (tem workerEnv) ou Node.js (tem process.env)
  const isWorker = workerEnv !== undefined;
  const envSource = isWorker ? workerEnv : (process.env as Record<string, string | undefined>);
  
  // Log detalhado para debug
  if (isWorker) {
    console.log('[env.getEnv] Worker environment detectado');
    // IMPORTANTE: Secrets não são enumeráveis! Apenas Variables aparecem em Object.keys()
    console.log('[env.getEnv] Variables enumeráveis:', Object.keys(workerEnv || {}).join(', '));
    // Acessa Secrets diretamente (eles existem mas não são enumeráveis)
    console.log('[env.getEnv] SUPABASE_URL (direct):', !!envSource.SUPABASE_URL, envSource.SUPABASE_URL ? `${envSource.SUPABASE_URL.substring(0, 30)}...` : 'NÃO CONFIGURADO');
    console.log('[env.getEnv] SUPABASE_ANON_KEY (direct):', !!envSource.SUPABASE_ANON_KEY, envSource.SUPABASE_ANON_KEY ? `${envSource.SUPABASE_ANON_KEY.substring(0, 20)}...` : 'NÃO CONFIGURADO');
  } else {
    console.log('[env.getEnv] Node.js environment, SUPABASE_URL:', !!envSource.SUPABASE_URL, 'SUPABASE_ANON_KEY:', !!envSource.SUPABASE_ANON_KEY);
  }

  const port = parseInt(envSource.PORT || '3007', 10);
  const nodeEnv = envSource.NODE_ENV || (isWorker ? 'production' : 'development');
  const jwtSecret = envSource.JWT_SECRET;
  const jwtExpiresIn = envSource.JWT_EXPIRES_IN || '7d';
  const corsOrigin = envSource.CORS_ORIGIN || '*'; // Permite todas se não configurado
  
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
  const supabaseUrl = envSource.SUPABASE_URL || '';
  const supabaseAnonKey = envSource.SUPABASE_ANON_KEY || '';
  const supabaseServiceKey = envSource.SUPABASE_SERVICE_KEY;

  // Se não tiver JWT_SECRET, retorna valores padrão (durante deploy do Worker)
  // O JWT_SECRET será fornecido via workerEnv quando o handler for chamado
  if (!jwtSecret) {
    return {
      PORT: port,
      NODE_ENV: nodeEnv,
      JWT_SECRET: 'placeholder-will-be-replaced-by-worker-env',
      JWT_EXPIRES_IN: jwtExpiresIn,
      CORS_ORIGIN: corsOrigin,
      DATA_DIR: dataDir,
      UPLOADS_DIR: uploadsDir,
      ADMIN_USERNAME: adminUsername,
      ADMIN_PASSWORD: adminPassword,
      SUPABASE_URL: supabaseUrl,
      SUPABASE_ANON_KEY: supabaseAnonKey,
      SUPABASE_SERVICE_KEY: supabaseServiceKey,
    };
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
    SUPABASE_URL: supabaseUrl,
    SUPABASE_ANON_KEY: supabaseAnonKey,
    SUPABASE_SERVICE_KEY: supabaseServiceKey,
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
    // Só tenta inicializar se estiver em Node.js E tiver JWT_SECRET disponível
    if (typeof process !== 'undefined' && process.env && process.env.JWT_SECRET) {
      try {
        _env = getEnv();
      } catch {
        // Se falhar (ex: durante deploy do Worker), usa valores padrão
        _env = {
          PORT: 8787,
          NODE_ENV: 'production',
          JWT_SECRET: 'placeholder',
          JWT_EXPIRES_IN: '7d',
          CORS_ORIGIN: '*',
          DATA_DIR: '/dados',
          UPLOADS_DIR: '/uploads',
          ADMIN_USERNAME: 'admin',
          ADMIN_PASSWORD: 'admin123',
          SUPABASE_URL: '',
          SUPABASE_ANON_KEY: '',
        };
      }
    } else {
      // Em Workers ou quando não há JWT_SECRET, retorna valores padrão
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
        SUPABASE_URL: '',
        SUPABASE_ANON_KEY: '',
      };
    }
  }
  return _env;
}

// Variável global para armazenar envConfig quando criado via createEnv(workerEnv)
let globalEnvConfig: EnvConfig | null = null;

// Função para definir o envConfig global (chamada no handler do Worker)
export function setGlobalEnv(envConfig: EnvConfig): void {
  globalEnvConfig = envConfig;
  console.log('[env] Global env configurado com workerEnv');
  console.log('[env] SUPABASE_URL configurado:', !!envConfig.SUPABASE_URL, envConfig.SUPABASE_URL ? `${envConfig.SUPABASE_URL.substring(0, 30)}...` : 'NÃO');
  console.log('[env] SUPABASE_ANON_KEY configurado:', !!envConfig.SUPABASE_ANON_KEY, envConfig.SUPABASE_ANON_KEY ? `${envConfig.SUPABASE_ANON_KEY.substring(0, 20)}...` : 'NÃO');
}

// Exporta como getter para manter compatibilidade
export const env = new Proxy({} as EnvConfig, {
  get(_target, prop) {
    // Se há um envConfig global (criado via createEnv(workerEnv)), usa ele
    if (globalEnvConfig) {
      const value = globalEnvConfig[prop as keyof EnvConfig];
      // Log apenas para variáveis críticas do Supabase
      if ((prop === 'SUPABASE_URL' || prop === 'SUPABASE_ANON_KEY') && !value) {
        console.error(`[env] ⚠️ ${prop} não está configurado no globalEnvConfig`);
      }
      return value;
    }
    
    // Caso contrário, tenta detectar se está em Worker e acessar workerEnv
    // No Wrangler dev, process.env tem as variáveis do .dev.vars
    if (typeof process !== 'undefined' && process.env) {
      // No Wrangler dev, as variáveis do .dev.vars estão em process.env
      // Tenta criar env a partir do process.env diretamente
      const envFromProcess = getEnv(); // getEnv() sem argumentos usa process.env
      console.log('[env] Tentando usar process.env, SUPABASE_URL:', !!envFromProcess.SUPABASE_URL);
      if (envFromProcess.SUPABASE_URL && envFromProcess.SUPABASE_ANON_KEY) {
        console.log('[env] Usando env de process.env');
        return envFromProcess[prop as keyof EnvConfig];
      }
    }
    
    // Fallback para getDefaultEnv
    const defaultValue = getDefaultEnv()[prop as keyof EnvConfig];
    
    // Em produção (Workers), se não há globalEnvConfig e está tentando acessar Supabase, loga erro
    if (typeof process === 'undefined' && (prop === 'SUPABASE_URL' || prop === 'SUPABASE_ANON_KEY') && !defaultValue) {
      console.error(`[env] ❌ ERRO CRÍTICO: ${prop} não está configurado!`);
      console.error('[env] Isso geralmente significa que:');
      console.error('[env] 1. As variáveis não foram configuradas como Secrets no Cloudflare');
      console.error('[env] 2. Ou o setGlobalEnv não foi chamado antes do acesso');
    }
    
    return defaultValue;
  },
});
