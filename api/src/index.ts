import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import { corsMiddleware } from './middleware/cors.middleware.js';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware.js';
import routes from './routes/index.js';
import { createEnv, env } from './config/env.js';
import { logInfo } from './lib/logger.js';
import { API_BASE_PATH } from './config/constants.js';

// Importação condicional para Node.js (desenvolvimento local)
// Em Workers, isso será ignorado
let serve: typeof import('@hono/node-server').serve | null = null;
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  import('@hono/node-server').then((nodeServer) => {
    serve = nodeServer.serve;
  }).catch(() => {
    // Ignora se não estiver disponível (Workers)
  });
}

const app = new Hono();

app.use('*', logger());
// CORS será aplicado no handler quando tivermos acesso ao workerEnv
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
    // Cria env a partir do workerEnv e injeta no contexto do Hono
    const envConfig = createEnv(workerEnv);
    
    // Injeta envConfig no request para uso nos handlers
    // (pode ser acessado via c.env se necessário)
    return app.fetch(request, workerEnv, ctx);
  },
};

// Para desenvolvimento local com Node.js
if (typeof process !== 'undefined' && serve && process.env.NODE_ENV !== 'production') {
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

  // Inicia o servidor HTTP
  serve({
    fetch: app.fetch,
    port,
  }, (info) => {
    logInfo(`🚀 Server is running on http://localhost:${info.port}`, { 
      port: info.port,
      address: info.address 
    });
    console.log(`📚 Swagger UI available at http://localhost:${info.port}/docs`);
    console.log(`❤️  Health check at http://localhost:${info.port}/health`);
  });
}
