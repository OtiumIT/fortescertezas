import { env } from '../config/env.js';
import { getJsonData } from './json-imports.js';

interface JsonStorageOptions {
  createIfNotExists?: boolean;
  defaultData?: unknown;
}

// Cache para o resultado da detecção (evita múltiplas verificações)
let workerEnvCache: boolean | null = null;

// Detecta se está rodando em Cloudflare Workers ou Wrangler dev
// IMPORTANTE: Em Wrangler dev local, ainda podemos usar fs se os arquivos existirem
async function isWorkerEnvironment(): Promise<boolean> {
  // Usa cache se já foi detectado
  if (workerEnvCache !== null) {
    return workerEnvCache;
  }
  
  // Verifica se está em Workers (não tem process)
  if (typeof process === 'undefined') {
    workerEnvCache = true;
    return true;
  }
  
  // Verifica se está rodando via Wrangler ou Cloudflare Workers
  if (typeof process !== 'undefined' && process.env) {
    // Em desenvolvimento local com Wrangler, ainda podemos usar fs
    // Só marca como Worker se realmente estiver em produção no Cloudflare
    const isProductionWorker = 
      process.env.CF_PAGES === '1' || 
      process.env.WORKERS === '1' ||
      (process.env.NODE_ENV === 'production' && 
       typeof require === 'undefined' &&
       !process.env.WRANGLER); // Wrangler dev tem essa variável
    
    if (isProductionWorker) {
      workerEnvCache = true;
      return true;
    }
    
    // Se está em Wrangler dev (tem WRANGLER mas não é produção real), tenta fs primeiro
    // Se fs não funcionar, então usa imports
    workerEnvCache = false; // Assume Node.js/Wrangler dev com fs disponível
    return false;
  }
  
  // Por padrão, assume Node.js
  workerEnvCache = false;
  return false;
}

// Cache para imports de JSON em Workers
const jsonCache = new Map<string, any>();

// Tenta importar JSON como módulo (para Workers)
async function importJsonModule(filename: string): Promise<any> {
  const cacheKey = filename;
  
  if (jsonCache.has(cacheKey)) {
    console.log(`[json-storage] Using cached data for ${filename}`);
    return jsonCache.get(cacheKey);
  }

  console.log(`[json-storage] Attempting to import ${filename}...`);

  // Usa o helper de importação
  const data = await getJsonData(filename);
  if (data) {
    console.log(`[json-storage] Successfully loaded ${filename} via getJsonData`);
    jsonCache.set(cacheKey, data);
    return data;
  }

  console.log(`[json-storage] getJsonData returned null, trying direct imports...`);

  // Fallback: tenta importar diretamente
  const paths = [
    `../../dados/${filename}`,  // De api/src/lib/ para api/dados/
    `../dados/${filename}`,    // Alternativa
    `../../../dados/${filename}`, // De api/src/ para api/dados/
  ];

  const importErrors: string[] = [];
  for (const path of paths) {
    try {
      console.log(`[json-storage] Trying path: ${path}`);
      const module = await import(path);
      const data = module.default || module;
      if (data) {
        console.log(`[json-storage] Successfully imported from ${path}`);
        jsonCache.set(cacheKey, data);
        return data;
      } else {
        importErrors.push(`${path}: returned null/undefined`);
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      importErrors.push(`${path}: ${errMsg}`);
      continue;
    }
  }

  console.error(`[json-storage] All import paths failed for ${filename}:`, importErrors);
  throw new Error(`Could not import JSON file: ${filename}. Tried paths: ${paths.join(', ')}. Errors: ${importErrors.join('; ')}`);
}

// Cache para a raiz do projeto detectada
let detectedProjectRoot: string | null = null;

// Detecta a raiz do projeto procurando por api/package.json
async function detectProjectRoot(): Promise<string> {
  if (detectedProjectRoot) {
    return detectedProjectRoot;
  }
  
  const { existsSync } = await import('fs');
  const { join, dirname, resolve, normalize } = await import('path');
  const { fileURLToPath } = await import('url');
  
  // Lista de possíveis raízes do projeto (caminhos conhecidos)
  const knownRoots = [
    'D:\\Oportunidades\\HubTools\\fortes',
    'd:\\Oportunidades\\HubTools\\fortes',
    '/d/Oportunidades/HubTools/fortes',
  ];
  
  // Verifica se algum caminho conhecido existe
  for (const root of knownRoots) {
    const apiPackageJson = join(root, 'api', 'package.json');
    if (existsSync(apiPackageJson)) {
      detectedProjectRoot = normalize(root);
      console.log(`[json-storage] ✅ Detected project root (known path): ${detectedProjectRoot}`);
      return detectedProjectRoot;
    }
  }
  
  // Tenta partir do arquivo atual (api/src/lib/json-storage.ts)
  let searchDir: string | null = null;
  
  try {
    if (typeof import.meta !== 'undefined' && import.meta.url) {
      const currentFile = fileURLToPath(import.meta.url);
      const currentDir = dirname(currentFile); // api/src/lib/ ou .wrangler/tmp/...
      
      // Se estiver em .wrangler, precisa subir mais
      if (currentDir.includes('.wrangler')) {
        // Tenta encontrar a raiz do projeto a partir do diretório de trabalho
        const cwd = process.cwd();
        if (cwd && cwd !== '/' && cwd.length > 3) {
          searchDir = cwd;
        } else {
          // Se cwd também não funciona, tenta subir de .wrangler
          searchDir = currentDir;
          for (let i = 0; i < 15; i++) {
            const parent = dirname(searchDir);
            if (parent === searchDir) break;
            searchDir = parent;
          }
        }
      } else {
        searchDir = currentDir; // api/src/lib/
      }
    }
  } catch {}
  
  // Se não conseguiu, tenta process.cwd()
  if (!searchDir || searchDir === '/' || searchDir.length < 3) {
    const cwd = process.cwd();
    if (cwd && cwd !== '/' && cwd.length > 3) {
      searchDir = cwd;
    } else {
      // Último recurso: tenta caminhos conhecidos
      for (const root of knownRoots) {
        if (existsSync(join(root, 'api', 'package.json'))) {
          detectedProjectRoot = normalize(root);
          console.log(`[json-storage] ✅ Using known project root: ${detectedProjectRoot}`);
          return detectedProjectRoot;
        }
      }
      searchDir = '/';
    }
  }
  
  // Sobe os diretórios procurando por api/package.json
  let current = searchDir;
  for (let i = 0; i < 15; i++) {
    const apiPackageJson = join(current, 'api', 'package.json');
    const rootPackageJson = join(current, 'package.json');
    
    if (existsSync(apiPackageJson)) {
      detectedProjectRoot = normalize(current);
      console.log(`[json-storage] ✅ Detected project root: ${detectedProjectRoot}`);
      return detectedProjectRoot;
    }
    
    if (existsSync(rootPackageJson)) {
      // Verifica se tem pasta api/
      const apiDir = join(current, 'api');
      try {
        const { statSync } = await import('fs');
        const stats = statSync(apiDir);
        if (stats.isDirectory()) {
          detectedProjectRoot = normalize(current);
          console.log(`[json-storage] ✅ Detected project root: ${detectedProjectRoot}`);
          return detectedProjectRoot;
        }
      } catch {}
    }
    
    const parent = dirname(current);
    if (parent === current) break; // Chegou na raiz
    current = parent;
  }
  
  // Fallback: usa caminho conhecido se existir
  for (const root of knownRoots) {
    if (existsSync(join(root, 'api', 'dados', 'site-content.json'))) {
      detectedProjectRoot = normalize(root);
      console.log(`[json-storage] ✅ Using fallback known root: ${detectedProjectRoot}`);
      return detectedProjectRoot;
    }
  }
  
  // Último fallback
  detectedProjectRoot = searchDir || '/';
  console.warn(`[json-storage] ⚠️ Could not detect project root, using: ${detectedProjectRoot}`);
  return detectedProjectRoot;
}

// Lê arquivo usando fs (para Node.js)
async function readFileNode(filename: string): Promise<string> {
  const { readFile } = await import('fs/promises');
  const { existsSync } = await import('fs');
  const { join, resolve } = await import('path');
  
  const projectRoot = await detectProjectRoot();
  
  // Tenta múltiplos caminhos possíveis
  const possiblePaths: string[] = [];
  
  // Adiciona caminhos conhecidos primeiro (mais confiáveis)
  const knownRoots = [
    'D:\\Oportunidades\\HubTools\\fortes',
    'd:\\Oportunidades\\HubTools\\fortes',
  ];
  
  for (const root of knownRoots) {
    possiblePaths.push(
      resolve(root, 'api', 'dados', filename),
      resolve(root, 'dados', filename),
    );
  }
  
  // Adiciona caminhos baseados no projectRoot detectado
  if (projectRoot && projectRoot !== '/') {
    possiblePaths.push(
      resolve(projectRoot, 'api', 'dados', filename),
      resolve(projectRoot, 'dados', filename),
      resolve(projectRoot, '..', 'dados', filename),
    );
  }
  
  // Adiciona caminho do env.DATA_DIR se configurado
  if (env.DATA_DIR && env.DATA_DIR !== '/dados') {
    if (env.DATA_DIR.startsWith('/')) {
      possiblePaths.push(join(env.DATA_DIR, filename));
    } else {
      for (const root of knownRoots) {
        possiblePaths.push(resolve(root, env.DATA_DIR, filename));
      }
      if (projectRoot && projectRoot !== '/') {
        possiblePaths.push(resolve(projectRoot, env.DATA_DIR, filename));
      }
    }
  }

  console.log(`[json-storage] Trying to find ${filename}`);
  console.log(`[json-storage] Project root: ${projectRoot}`);
  console.log(`[json-storage] Trying ${possiblePaths.length} paths...`);

  for (const filePath of possiblePaths) {
    try {
      if (existsSync(filePath)) {
        console.log(`[json-storage] ✅ Found file at: ${filePath}`);
        return await readFile(filePath, 'utf-8');
      }
    } catch (err) {
      // Ignora erros de acesso
      continue;
    }
  }

  // Log dos primeiros caminhos para debug
  console.error(`[json-storage] ❌ File not found. First 5 paths tried:`, possiblePaths.slice(0, 5));
  throw new Error(`File not found: ${filename}. Tried ${possiblePaths.length} paths.`);
}

// Escreve arquivo usando fs (para Node.js)
async function writeFileNode(filename: string, data: unknown): Promise<void> {
  const { writeFile, mkdir } = await import('fs/promises');
  const { existsSync } = await import('fs');
  const { join, dirname } = await import('path');
  
  const filePath = join(env.DATA_DIR, filename);
  const dir = dirname(filePath);

  if (dir && !existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }

  const content = JSON.stringify(data, null, 2);
  await writeFile(filePath, content, 'utf-8');
}

export async function readJsonFile<T>(
  filename: string,
  options: JsonStorageOptions = {}
): Promise<T> {
  const isWorker = await isWorkerEnvironment();
  const isWranglerDev = typeof process !== 'undefined' && 
                        process.env && 
                        process.env.WRANGLER !== undefined;
  
  // Log para debug
  console.log(`[json-storage] Reading ${filename}, isWorker: ${isWorker}, isWranglerDev: ${isWranglerDev}`);

  // SEMPRE tenta fs primeiro se process existe (incluindo Wrangler dev)
  // Wrangler dev tem acesso ao filesystem local
  if (typeof process !== 'undefined') {
    try {
      const content = await readFileNode(filename);
      const parsed = JSON.parse(content) as T;
      console.log(`[json-storage] Successfully loaded ${filename} via fs`);
      return parsed;
    } catch (fsError) {
      const fsErrorMsg = fsError instanceof Error ? fsError.message : String(fsError);
      console.warn(`[json-storage] fs failed for ${filename}:`, fsErrorMsg);
      
      // Se o erro é "not implemented" ou "unenv", é Workers real
      if (fsErrorMsg.includes('not implemented') || fsErrorMsg.includes('unenv')) {
        console.log(`[json-storage] Detected Workers environment, trying imports...`);
        // Continua para tentar imports
      } else if (!isWorker) {
        // Se não é Worker e fs falhou por outro motivo (arquivo não existe), tenta imports
        console.log(`[json-storage] File not found via fs, trying imports as fallback...`);
      } else {
        // É Worker e fs não funciona, vai para imports
      }
    }
  }

  // Se fs não funcionou, tenta imports (para Workers reais)
  if (isWorker || isWranglerDev) {
    try {
      const data = await importJsonModule(filename);
      if (!data) {
        throw new Error(`No data returned for ${filename}`);
      }
      console.log(`[json-storage] Successfully loaded ${filename} via import, data type:`, typeof data, Array.isArray(data) ? 'array' : 'object', 'keys:', data && typeof data === 'object' ? Object.keys(data).length : 'N/A');
      return data as T;
    } catch (error) {
      // Se falhar e tiver defaultData, retorna ele (sem tentar escrever)
      if (options.createIfNotExists && options.defaultData) {
        console.warn(`[json-storage] Failed to load ${filename}, using default data:`, error instanceof Error ? error.message : 'Unknown error');
        return options.defaultData as T;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`[json-storage] Failed to load ${filename}:`, errorMessage);
      throw new Error(`File not found: ${filename}. ${errorMessage}`);
    }
  } else {
    // Em Node.js real, usa fs
    try {
      const content = await readFileNode(filename);
      return JSON.parse(content) as T;
    } catch (error) {
      // Se o erro é do unenv (Wrangler), tenta usar imports de JSON
      const errorMsg = error instanceof Error ? error.message : String(error);
      if (errorMsg.includes('not implemented') || errorMsg.includes('unenv')) {
        // É Wrangler, usa imports de JSON
        workerEnvCache = true; // Atualiza cache
        try {
          const data = await importJsonModule(filename);
          if (!data) {
            throw new Error(`No data returned for ${filename}`);
          }
          return data as T;
        } catch (importError) {
          if (options.createIfNotExists && options.defaultData) {
            return options.defaultData as T;
          }
          throw new Error(`File not found: ${filename}. ${importError instanceof Error ? importError.message : 'Unknown error'}`);
        }
      }
      
      if (options.createIfNotExists && options.defaultData) {
        // Só tenta escrever se realmente for Node.js (não Wrangler)
        try {
          await writeJsonFile(filename, options.defaultData);
        } catch (writeError) {
          // Se escrever também falhar com unenv, apenas retorna defaultData
          const writeErrorMsg = writeError instanceof Error ? writeError.message : String(writeError);
          if (writeErrorMsg.includes('not implemented') || writeErrorMsg.includes('unenv')) {
            return options.defaultData as T;
          }
          throw writeError;
        }
        return options.defaultData as T;
      }
      throw new Error(`Failed to read JSON file: ${filename}. ${errorMsg}`);
    }
  }
}

export async function writeJsonFile(
  filename: string,
  data: unknown
): Promise<void> {
  const isWorker = await isWorkerEnvironment();

  if (isWorker) {
    // Em Workers/Wrangler, escrita não é suportada diretamente
    // Em produção, considere usar KV ou R2 Storage
    // Por enquanto, apenas atualiza o cache
    jsonCache.set(filename, data);
    throw new Error(`Write operations are not supported in Cloudflare Workers. Consider using KV or R2 Storage for: ${filename}`);
  } else {
    // Em Node.js real, usa fs
    try {
      await writeFileNode(filename, data);
    } catch (error) {
      throw new Error(`Failed to write JSON file: ${filename}. ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export async function appendToJsonArray<T extends { id: string }>(
  filename: string,
  item: T
): Promise<T> {
  const array = await readJsonFile<T[]>(filename, {
    createIfNotExists: true,
    defaultData: [],
  });

  array.push(item);
  await writeJsonFile(filename, array);

  return item;
}

export async function updateJsonArrayItem<T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const array = await readJsonFile<T[]>(filename);

  const index = array.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  array[index] = { ...array[index], ...updates };
  await writeJsonFile(filename, array);

  return array[index];
}

export async function deleteJsonArrayItem<T extends { id: string }>(
  filename: string,
  id: string
): Promise<boolean> {
  const array = await readJsonFile<T[]>(filename);

  const index = array.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  array.splice(index, 1);
  await writeJsonFile(filename, array);

  return true;
}

export async function findJsonArrayItem<T extends { id: string }>(
  filename: string,
  id: string
): Promise<T | null> {
  const array = await readJsonFile<T[]>(filename, {
    createIfNotExists: true,
    defaultData: [],
  });

  return array.find((item) => item.id === id) || null;
}
