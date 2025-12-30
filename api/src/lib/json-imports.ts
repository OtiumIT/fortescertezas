// Imports estáticos dos arquivos JSON para uso em Cloudflare Workers
// Estes imports são resolvidos em tempo de build e incluídos no bundle

// Tenta importar os arquivos JSON de api/dados/
// Usa imports dinâmicos com fallback para diferentes caminhos
async function loadJsonFile(filename: string): Promise<any> {
  const paths = [
    `../../dados/${filename}`,  // De api/src/lib/ para api/dados/
    `../dados/${filename}`,     // Alternativa
    `../../../dados/${filename}`, // De api/src/ para api/dados/
    `../../dados/${filename}?raw`, // Com sufixo ?raw para alguns bundlers
  ];

  const errors: string[] = [];

  for (const path of paths) {
    try {
      const module = await import(path);
      const data = module.default || module;
      if (data && typeof data === 'object') {
        return data;
      }
      // Se retornou string, tenta fazer parse
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch (parseError) {
          errors.push(`Failed to parse JSON from ${path}: ${parseError instanceof Error ? parseError.message : 'Unknown'}`);
          continue;
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      errors.push(`${path}: ${errorMsg}`);
      continue;
    }
  }
  
  // Se nenhum caminho funcionou, loga os erros para debug
  console.error(`[json-imports] Failed to load ${filename}. Errors:`, errors);
  return null;
}

// Cache para os dados carregados
const dataCache = new Map<string, any>();

// Carrega um arquivo JSON específico
export async function getJsonData(filename: string): Promise<any> {
  if (dataCache.has(filename)) {
    console.log(`[json-imports] Using cached data for ${filename}`);
    return dataCache.get(filename);
  }

  console.log(`[json-imports] Loading ${filename}...`);
  const data = await loadJsonFile(filename);
  if (data) {
    console.log(`[json-imports] Successfully loaded ${filename}, type:`, typeof data, Array.isArray(data) ? 'array' : 'object');
    dataCache.set(filename, data);
  } else {
    console.warn(`[json-imports] Failed to load ${filename}, returned null`);
  }
  return data;
}

// Funções específicas para cada arquivo (para facilitar o uso)
export async function getPostsData(): Promise<any> {
  return getJsonData('posts.json');
}

export async function getServicesData(): Promise<any> {
  return getJsonData('services.json');
}

export async function getJobsData(): Promise<any> {
  return getJsonData('jobs.json');
}

export async function getSiteContentData(): Promise<any> {
  return getJsonData('site-content.json');
}

export async function getContactsData(): Promise<any> {
  return getJsonData('contacts.json');
}

export async function getApplicationsData(): Promise<any> {
  return getJsonData('applications.json');
}

export async function getTeamData(): Promise<any> {
  return getJsonData('team.json');
}

export async function getTestimonialsData(): Promise<any> {
  return getJsonData('testimonials.json');
}
