/// <reference path="./env.d.ts" />
/// <reference types="@cloudflare/workers-types" />

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import { corsMiddleware, createCorsMiddleware } from './middleware/cors.middleware.js';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware.js';
import routes from './routes/index.js';
import { createEnv, env, setGlobalEnv } from './config/env.js';
import { logInfo } from './lib/logger.js';
import { API_BASE_PATH } from './config/constants.js';

// Importação condicional para Node.js (desenvolvimento local)
// Em Workers, isso será ignorado
let serve: any = null;
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  import('@hono/node-server').then((nodeServer) => {
    serve = nodeServer.serve;
  }).catch(() => {
    // Ignora se não estiver disponível (Workers)
  });
}

// App base (será usado em Node.js)
const app = new Hono();

app.use('*', logger());
app.use('*', corsMiddleware);
app.use('*', errorHandlerMiddleware);

// Swagger UI - Documentação pública da API
app.get('/docs', swaggerUI({ url: '/api-docs.json' }));

// OpenAPI JSON Schema
app.get('/api-docs.json', (c) => {
  return c.json({
    openapi: '3.0.0',
    info: {
      title: 'Fortes Certezas API',
      version: '1.0.0',
      description: 'API para gestão de conteúdo do site Fortes Certezas',
    },
    servers: [
      {
        url: `http://localhost:${typeof process !== 'undefined' && process.env ? env.PORT : 8787}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
    paths: {
      '/health': {
        get: {
          summary: 'Health Check',
          description: 'Verifica se a API está funcionando',
          tags: ['Health'],
          responses: {
            '200': {
              description: 'API está funcionando',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'ok' },
                      timestamp: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      [`${API_BASE_PATH}/content/{section}`]: {
        get: {
          summary: 'Obter conteúdo por seção',
          description: 'Retorna o conteúdo de uma seção específica',
          tags: ['Content'],
          parameters: [
            {
              name: 'section',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'Nome da seção de conteúdo',
            },
          ],
          responses: {
            '200': {
              description: 'Conteúdo encontrado',
            },
            '404': {
              description: 'Seção não encontrada',
            },
          },
        },
      },
      [`${API_BASE_PATH}/services`]: {
        get: {
          summary: 'Listar todos os serviços',
          description: 'Retorna uma lista de todos os serviços disponíveis',
          tags: ['Services'],
          responses: {
            '200': {
              description: 'Lista de serviços',
            },
          },
        },
      },
      [`${API_BASE_PATH}/services/{id}`]: {
        get: {
          summary: 'Obter serviço por ID',
          description: 'Retorna detalhes de um serviço específico',
          tags: ['Services'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID do serviço',
            },
          ],
          responses: {
            '200': {
              description: 'Serviço encontrado',
            },
            '404': {
              description: 'Serviço não encontrado',
            },
          },
        },
      },
      [`${API_BASE_PATH}/jobs`]: {
        get: {
          summary: 'Listar todas as vagas',
          description: 'Retorna uma lista de todas as vagas disponíveis',
          tags: ['Jobs'],
          responses: {
            '200': {
              description: 'Lista de vagas',
            },
          },
        },
      },
      [`${API_BASE_PATH}/jobs/{id}`]: {
        get: {
          summary: 'Obter vaga por ID',
          description: 'Retorna detalhes de uma vaga específica',
          tags: ['Jobs'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID da vaga',
            },
          ],
          responses: {
            '200': {
              description: 'Vaga encontrada',
            },
            '404': {
              description: 'Vaga não encontrada',
            },
          },
        },
      },
      [`${API_BASE_PATH}/contacts`]: {
        post: {
          summary: 'Criar novo contato',
          description: 'Envia uma mensagem de contato',
          tags: ['Contacts'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    message: { type: 'string' },
                  },
                  required: ['name', 'email', 'message'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Contato criado com sucesso',
            },
            '400': {
              description: 'Dados inválidos',
            },
          },
        },
      },
      [`${API_BASE_PATH}/applications`]: {
        post: {
          summary: 'Criar nova candidatura',
          description: 'Envia uma candidatura para uma vaga',
          tags: ['Applications'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    jobId: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    phone: { type: 'string' },
                    resume: { type: 'string', format: 'base64' },
                  },
                  required: ['jobId', 'name', 'email'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Candidatura criada com sucesso',
            },
            '400': {
              description: 'Dados inválidos',
            },
          },
        },
      },
    },
  });
});

app.route('/', routes);

// Sitemap e RSS também disponíveis na raiz para facilitar indexação
app.get('/sitemap.xml', async (c) => {
  const { handleGetSitemap } = await import('./controllers/feeds.controller.js');
  return handleGetSitemap(c);
});

app.get('/feed/rss', async (c) => {
  const { handleGetRSSFeed } = await import('./controllers/feeds.controller.js');
  return handleGetRSSFeed(c);
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handler para Cloudflare Workers
export default {
  async fetch(request: Request, workerEnv: Env, ctx: ExecutionContext): Promise<Response> {
    // Cria env a partir do workerEnv (necessário para criar o CORS middleware)
    const envConfig = createEnv(workerEnv);
    
    // Define o envConfig global para que os repositórios possam acessá-lo
    setGlobalEnv(envConfig);
    
    // Cria app com CORS configurado corretamente para Workers
    const workerApp = new Hono();
    workerApp.use('*', logger());
    workerApp.use('*', createCorsMiddleware(envConfig));
    workerApp.use('*', errorHandlerMiddleware);
    
    // Replica todas as rotas do app principal
    workerApp.get('/docs', swaggerUI({ url: '/api-docs.json' }));
    workerApp.get('/api-docs.json', app.routes.find(r => r.path === '/api-docs.json')?.handler || (() => new Response('Not Found', { status: 404 })));
    workerApp.route('/', routes);
    workerApp.get('/sitemap.xml', async (c) => {
      const { handleGetSitemap } = await import('./controllers/feeds.controller.js');
      return handleGetSitemap(c);
    });
    workerApp.get('/feed/rss', async (c) => {
      const { handleGetRSSFeed } = await import('./controllers/feeds.controller.js');
      return handleGetRSSFeed(c);
    });
    workerApp.get('/health', (c) => {
      return c.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    
    return workerApp.fetch(request, workerEnv, ctx);
  },
};

// Para desenvolvimento local com Node.js
// Só executa se realmente estiver em Node.js (não durante deploy do Worker)
// Verifica se está em ambiente de desenvolvimento Node.js (não Workers)
const isNodeDev = typeof process !== 'undefined' && 
                  process.env && 
                  process.env.NODE_ENV !== 'production' && 
                  process.env.JWT_SECRET &&
                  !process.env.CF_PAGES && // Cloudflare Pages/Workers não tem isso
                  !process.env.WRANGLER_SEND_METRICS; // Wrangler não define isso em dev local

if (isNodeDev) {
  // Aguarda um pouco para garantir que env foi inicializado
  setTimeout(() => {
    try {
      const port = env.PORT;

      // Captura erros não tratados e rejeições de promessas
      process.on('uncaughtException', (error) => {
        console.error('❌ Uncaught Exception:', error);
        process.exit(1);
      });

      process.on('unhandledRejection', (reason, promise) => {
        console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      });

      logInfo(`Server starting on port ${port}`, { port, nodeEnv: env.NODE_ENV });

      // Aguarda um pouco para garantir que serve foi carregado
      if (serve) {
        // Inicia o servidor HTTP
        serve({
          fetch: app.fetch,
          port,
        }, (info: { port: number; address: string }) => {
          logInfo(`🚀 Server is running on http://localhost:${info.port}`, { 
            port: info.port,
            address: info.address 
          });
          console.log(`📚 Swagger UI available at http://localhost:${info.port}/docs`);
          console.log(`❤️  Health check at http://localhost:${info.port}/health`);
        });
      }
    } catch (error) {
      // Ignora erros durante inicialização (pode ser Workers)
      // Não faz nada - isso é esperado durante deploy do Worker
    }
  }, 100);
}
