// Mapeamento direto dos arquivos JSON para uso em Cloudflare Workers
// Os arquivos devem estar acessíveis no bundle (copiados para api/dados/ pelo script)

// Tenta importar os JSONs de diferentes caminhos possíveis
async function loadJsonData(filename: string): Promise<any> {
  const paths = [
    // Caminho relativo a partir de api/src/lib/ para api/dados/
    '../dados/' + filename,
    // Caminho relativo a partir de api/src/ para api/dados/
    '../../dados/' + filename,
    // Caminho relativo a partir de api/ para api/dados/
    '../../../dados/' + filename,
    // Caminho para dados/ na raiz do projeto
    '../../../../dados/' + filename,
  ];

  for (const path of paths) {
    try {
      // Tenta importar como módulo JSON
      const module = await import(path);
      return module.default || module;
    } catch {
      // Tenta próximo caminho
      continue;
    }
  }

  // Se nenhum import funcionou, retorna null
  return null;
}

// Cache para os dados carregados
const dataCache = new Map<string, any>();

export async function getJsonData<T>(filename: string): Promise<T | null> {
  if (dataCache.has(filename)) {
    return dataCache.get(filename) as T;
  }

  const data = await loadJsonData(filename);
  if (data) {
    dataCache.set(filename, data);
  }
  return data as T | null;
}
