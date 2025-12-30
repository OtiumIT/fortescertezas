import { env } from '../config/env.js';
import { getJsonData } from './json-data.js';

interface JsonStorageOptions {
  createIfNotExists?: boolean;
  defaultData?: unknown;
}

// Detecta se está rodando em Cloudflare Workers
function isWorkerEnvironment(): boolean {
  // Verifica se está em Workers (não tem process ou tem características de Workers)
  if (typeof process === 'undefined') {
    return true;
  }
  
  // Verifica se tem características de Workers
  if (typeof (globalThis as any).navigator !== 'undefined' && 
      (globalThis as any).navigator.userAgent?.includes('Cloudflare-Workers')) {
    return true;
  }
  
  // Verifica variáveis de ambiente específicas do Cloudflare
  if (process.env && (process.env.CF_PAGES === '1' || process.env.WORKERS)) {
    return true;
  }
  
  // Se tem process.env mas não tem NODE_ENV definido, provavelmente é Workers
  if (process.env && !process.env.NODE_ENV) {
    return true;
  }
  
  return false;
}

// Cache para imports de JSON em Workers
const jsonCache = new Map<string, any>();

// Tenta importar JSON como módulo (para Workers)
async function importJsonModule(filename: string): Promise<any> {
  const cacheKey = filename;
  
  if (jsonCache.has(cacheKey)) {
    return jsonCache.get(cacheKey);
  }

  // Tenta usar o helper de importação
  const data = await getJsonData(filename);
  if (data) {
    jsonCache.set(cacheKey, data);
    return data;
  }

  // Se não encontrou, tenta importar diretamente de diferentes caminhos
  // Primeiro tenta api/dados/ (onde os arquivos são copiados pelo script)
  const paths = [
    `../dados/${filename}`,  // De api/src/lib/ para api/dados/
    `../../dados/${filename}`, // De api/src/ para api/dados/
    `../../../dados/${filename}`, // De api/ para dados/ (raiz)
    `../../../../dados/${filename}`, // Caminho alternativo
  ];

  for (const path of paths) {
    try {
      const module = await import(path);
      const data = module.default || module;
      jsonCache.set(cacheKey, data);
      return data;
    } catch (err) {
      // Tenta próximo caminho
      continue;
    }
  }

  throw new Error(`Could not import JSON file: ${filename}. Tried paths: ${paths.join(', ')}`);
}

// Lê arquivo usando fs (para Node.js)
async function readFileNode(filename: string): Promise<string> {
  const { readFile } = await import('fs/promises');
  const { existsSync } = await import('fs');
  const { join } = await import('path');
  
  const filePath = join(env.DATA_DIR, filename);

  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filename}`);
  }

  return await readFile(filePath, 'utf-8');
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
  const isWorker = isWorkerEnvironment();

  if (isWorker) {
    // Em Workers, tenta importar como módulo
    try {
      return await importJsonModule(filename) as T;
    } catch (error) {
      // Se falhar e tiver defaultData, retorna ele
      if (options.createIfNotExists && options.defaultData) {
        return options.defaultData as T;
      }
      throw new Error(`File not found: ${filename}. ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } else {
    // Em Node.js, usa fs
    try {
      const content = await readFileNode(filename);
      return JSON.parse(content) as T;
    } catch (error) {
      if (options.createIfNotExists && options.defaultData) {
        await writeJsonFile(filename, options.defaultData);
        return options.defaultData as T;
      }
      throw new Error(`Failed to read JSON file: ${filename}. ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export async function writeJsonFile(
  filename: string,
  data: unknown
): Promise<void> {
  const isWorker = isWorkerEnvironment();

  if (isWorker) {
    // Em Workers, escrita não é suportada diretamente
    // Em produção, considere usar KV ou R2 Storage
    // Por enquanto, apenas atualiza o cache
    jsonCache.set(filename, data);
    throw new Error(`Write operations are not supported in Cloudflare Workers. Consider using KV or R2 Storage for: ${filename}`);
  } else {
    // Em Node.js, usa fs
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
