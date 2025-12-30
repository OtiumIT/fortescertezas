// Script para copiar arquivos JSON da pasta dados/ para api/dados/
// Isso permite que os arquivos sejam incluídos no bundle do Cloudflare Worker

import { readdir, copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '../../dados');
const targetDir = join(__dirname, '../dados');

async function copyDataFiles() {
  try {
    // Cria o diretório de destino se não existir
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
      console.log(`✅ Criado diretório: ${targetDir}`);
    }

    // Lista todos os arquivos JSON na pasta origem
    const files = await readdir(sourceDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    console.log(`📋 Encontrados ${jsonFiles.length} arquivos JSON para copiar...`);

    // Copia cada arquivo
    for (const file of jsonFiles) {
      const sourcePath = join(sourceDir, file);
      const targetPath = join(targetDir, file);
      
      await copyFile(sourcePath, targetPath);
      console.log(`✅ Copiado: ${file}`);
    }

    console.log(`✨ Todos os arquivos foram copiados com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao copiar arquivos:', error);
    process.exit(1);
  }
}

copyDataFiles();
