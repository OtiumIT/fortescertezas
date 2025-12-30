// Tipos para Cloudflare Workers
// Este arquivo define tipos globais para o projeto

// Importa tipos do Cloudflare Workers
/// <reference types="@cloudflare/workers-types" />

declare global {
  interface Env {
    // Variáveis de ambiente (secrets e vars do wrangler.toml)
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    CORS_ORIGIN?: string;
    NODE_ENV?: string;
    DATA_DIR?: string;
    UPLOADS_DIR?: string;
    ADMIN_USERNAME?: string;
    ADMIN_PASSWORD?: string;
    PORT?: string;
  }
}

export {};
